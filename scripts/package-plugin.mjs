#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const pkgPath = path.join(root, "package.json");

if (!existsSync(pkgPath)) {
  console.error("package.json not found. Run this command from the repository root.");
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const outDir = path.join(root, "dist");
const outFile = path.join(outDir, `${pkg.name}-${pkg.version}.zip`);

mkdirSync(outDir, { recursive: true });

const result = spawnSync(
  "git",
  ["archive", "--format=zip", `--output=${outFile}`, "HEAD"],
  { cwd: root, stdio: "inherit" },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const size = statSync(outFile).size;
console.log(`Packaged ${path.relative(root, outFile)} (${size} bytes)`);
