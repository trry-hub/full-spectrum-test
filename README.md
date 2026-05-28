# Full-Spectrum Test 🧪

> **全维度质量保障 Skill** — 目标无关的完整测试工作流

适用于 **Web 应用、移动 App、API 服务、桌面应用** 等任何数字产品。

## 功能

| 阶段 | 内容 |
|------|------|
| 📋 **测试规划** | 分析目标 → 输出结构化测试计划（7 维度 + P0/P1/P2） |
| 🤖 **自动执行** | 根据目标类型自适应选择工具执行测试并记录证据；Release QA 必须至少执行 1 条真实用户端到端闭环，无法执行时记录为 P0/P1 blocked 并说明缺账号、数据或接口 |
| 📊 **报告生成** | 汇总多维度测试报告（含问题分级、阻塞项、复测建议） |

### 7 大测试维度

```
1️⃣ 功能正确性 — 业务流程、边界条件、异常场景
2️⃣ 产品合理性 — 功能必要性、默认值、控件层级、用户心智
3️⃣ UI/视觉    — 样式、色彩、字体、布局、品牌一致性
4️⃣ 交互体验   — 响应反馈、动画、状态变化
5️⃣ 易用性     — 导航清晰度、错误提示、无障碍
6️⃣ 接口/数据  — API 请求响应、鉴权、数据流
7️⃣ 稳定性/性能 — 加载速度、并发、异常恢复
```

## 安装

### 方式一：oh-my-openagent（推荐）

确保你安装了 [oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) 插件：

```bash
# 在 opencode 中直接安装
npx oh-my-openagent plugin add trry-hub/full-spectrum-test
```

### 方式二：手动安装

```bash
# 克隆仓库
git clone https://github.com/trry-hub/full-spectrum-test.git ~/.config/opencode/plugins/full-spectrum-test

# 或复制 SKILL.md 到技能目录
cp -r skills/full-spectrum-test ~/.config/opencode/skills/
```

然后在 `oh-my-openagent.json` 中添加：

```json
{
  "skills": {
    "sources": [
      { "path": "~/.config/opencode/skills", "glob": "*/SKILL.md" }
    ]
  }
}
```

### 方式三：直接加载 SKILL.md

把 `skills/full-spectrum-test/SKILL.md` 放到你的项目 `.opencode/skills/` 目录下即可自动加载。

## 使用

```python
# 加载 Skill
skill(name="full-spectrum-test")
```

### 示例

```
> 测试 https://example.com 的登录注册流程，重点覆盖功能和易用性
```

```
> 测试 /api/v1/users 这个接口，覆盖增删改查和鉴权场景
```

```
> 分析这个 App 的 API 文档，规划后端接口测试方案
```

## 工作流程

```
Step 1: 范围识别 → 明确环境、风险、工具、假设
Step 2: 规划 → 输出覆盖功能/产品合理性/UI/交互/易用性/API/性能的用例矩阵
Step 3: 执行 → 逐用例测试，记录实际结果与证据
Step 4: 报告 → 汇总问题分级、阻塞项、发布建议和复测清单
```

## 工具适配

| 目标类型 | 主要工具 |
|---------|---------|
| Web 应用 | Playwright 浏览器自动化 |
| API 服务 | HTTP 请求工具 (fetch/webfetch) |
| 移动 App | API 测试 + 可用工具 |
| 混合型 | 组合多种工具 |

## 发布与变更日志

本仓库通过 git tag 发布版本：

```bash
npm run changelog -- --version v1.1.0 --changelog CHANGELOG.md --release-notes dist/release-notes.md --docs-dir dist/docs
npm run package
git tag v1.1.0
git push origin main v1.1.0
```

推送 `v*` tag 后，`.github/workflows/release.yml` 会自动：

- 根据历史 git commit 生成 release notes。
- 打包 `dist/full-spectrum-test-<version>.zip`。
- 创建或更新 GitHub Release 并上传 zip。
- 将变更日志发布到 `docs` 分支。

`CHANGELOG.md` 是主分支的变更日志入口，`docs` 分支用于承接自动生成的发布文档。

## License

MIT
