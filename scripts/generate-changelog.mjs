#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const args = new Map();

for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (!arg.startsWith("--")) continue;
  const next = process.argv[i + 1];
  if (next && !next.startsWith("--")) {
    args.set(arg, next);
    i += 1;
  } else {
    args.set(arg, "true");
  }
}

function git(gitArgs, options = {}) {
  const result = spawnSync("git", gitArgs, {
    cwd: root,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    if (options.allowFailure) return "";
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result.stdout.trim();
}

function hasRef(ref) {
  return spawnSync("git", ["rev-parse", "--verify", "--quiet", ref], {
    cwd: root,
  }).status === 0;
}

function normalizeTag(input) {
  const value = (input || "").trim() || `v${pkg.version}`;
  return value.startsWith("v") ? value : `v${value}`;
}

function releaseDate() {
  return new Date().toISOString().slice(0, 10);
}

function parseCommit(line) {
  const [hash, subject, author, date] = line.split("\u001f");
  const match = subject.match(/^([a-zA-Z]+)(?:\([^)]+\))?:\s*(.+)$/);
  const type = match ? match[1].toLowerCase() : "other";
  const title = match ? match[2] : subject;
  return {
    hash,
    shortHash: hash.slice(0, 7),
    subject,
    title,
    type,
    author,
    date,
  };
}

const typeLabels = [
  ["feat", "新增"],
  ["fix", "修复"],
  ["perf", "性能"],
  ["refactor", "重构"],
  ["docs", "文档"],
  ["test", "测试"],
  ["build", "构建"],
  ["ci", "工作流"],
  ["chore", "维护"],
  ["style", "样式"],
  ["other", "其他"],
];

function groupCommits(commits) {
  const groups = new Map(typeLabels.map(([type]) => [type, []]));
  for (const commit of commits) {
    const key = groups.has(commit.type) ? commit.type : "other";
    groups.get(key).push(commit);
  }
  return groups;
}

function renderCommitGroups(commits) {
  if (commits.length === 0) {
    return "- No commit changes found for this range.\n";
  }

  const groups = groupCommits(commits);
  const sections = [];

  for (const [type, label] of typeLabels) {
    const items = groups.get(type);
    if (!items || items.length === 0) continue;
    sections.push(`### ${label}`);
    sections.push("");
    for (const commit of items) {
      sections.push(`- ${commit.title} (${commit.shortHash})`);
    }
    sections.push("");
  }

  return sections.join("\n").trimEnd() + "\n";
}

function readCommits(rangeArgs) {
  const format = "%H%x1f%s%x1f%an%x1f%ad";
  const output = git(["log", "--date=short", `--pretty=format:${format}`, ...rangeArgs], {
    allowFailure: true,
  });
  return output ? output.split("\n").map(parseCommit) : [];
}

const tag = normalizeTag(args.get("--version") || process.env.GITHUB_REF_NAME);
const version = tag.replace(/^v/, "");
const toRef = args.get("--to") || (hasRef(tag) ? tag : "HEAD");
const fromRef =
  args.get("--from") ||
  git(["describe", "--tags", "--abbrev=0", `${toRef}^`], { allowFailure: true });
const rangeArgs = fromRef ? [`${fromRef}..${toRef}`] : [toRef];
const commits = readCommits(rangeArgs);
const date = releaseDate();
const rangeLabel = fromRef ? `${fromRef}..${toRef}` : `initial history..${toRef}`;

const releaseNotes = [
  `## ${tag} - ${date}`,
  "",
  `Range: \`${rangeLabel}\``,
  "",
  renderCommitGroups(commits),
].join("\n").trimEnd() + "\n";

const changelog = [
  "# Changelog",
  "",
  "All notable changes are generated from git commit history.",
  "",
  releaseNotes,
].join("\n").trimEnd() + "\n";

function writeOutput(filePath, content) {
  if (!filePath) return;
  const absolute = path.resolve(root, filePath);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, content);
  console.log(`Wrote ${path.relative(root, absolute)}`);
}

writeOutput(args.get("--release-notes"), releaseNotes);
writeOutput(args.get("--changelog"), changelog);

const docsDir = args.get("--docs-dir");
if (docsDir) {
  const absoluteDocs = path.resolve(root, docsDir);
  mkdirSync(absoluteDocs, { recursive: true });

  writeFileSync(
    path.join(absoluteDocs, "index.md"),
    [
      `# ${pkg.name}`,
      "",
      pkg.description,
      "",
      `Latest release: **${tag}**`,
      "",
      "## Install",
      "",
      "```bash",
      `npx skills add trry-hub/${pkg.name} --global --yes`,
      "```",
      "",
      "## Changelog",
      "",
      "- [Full changelog](./CHANGELOG.md)",
      "- [GitHub repository](https://github.com/trry-hub/full-spectrum-test)",
      "",
    ].join("\n"),
  );

  writeFileSync(path.join(absoluteDocs, "CHANGELOG.md"), changelog);
  writeFileSync(path.join(absoluteDocs, ".nojekyll"), "");
  console.log(`Wrote ${path.relative(root, absoluteDocs)}`);
}
