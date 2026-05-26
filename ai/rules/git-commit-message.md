# Git Commit Message 输出规范

## 目标

根据当前代码改动内容，生成规范、准确、可读的 Git commit message。

AI 必须先理解改动文件和实际变更内容，再生成 commit message，不允许只根据文件名瞎猜。

## 项目前置规范优先级

生成 commit message 前，必须优先遵循当前项目已有的 Git 提交前置规范。

检查顺序：

1. `.husky`
2. `commitlint.config.js` / `commitlint.config.ts`
3. `.commitlintrc` / `.commitlintrc.*`
4. `package.json` 中的 `commitlint`、`commitizen`、`lint-staged`、`scripts` 配置

如果项目配置与本文档冲突，优先遵循项目配置。

当前项目使用 `@commitlint/config-conventional`，因此 commit header 必须符合 Conventional Commits 格式：

```txt
<type>(<scope>): <subject>
```

## 输出语言

commit message 默认尽量使用中英双语，但必须保证 commit header 可以通过项目 commitlint 校验。

后续新增 commit message 应优先使用双语说明，除非改动非常小且一行英文 header 已经足够表达完整含义。

如果 commit message 只有一行，可以只使用英文：

```txt
fix(audio): normalize websocket URL for production
```

如果需要输出正文，必须先输出完整英文部分，再空一行输出完整中文部分，不允许中英文穿插：

```txt
<type>(<scope>): <English summary>

<English body summary>

<中文摘要>
```

## Commit Type 规则

优先使用以下类型：

- feat: 新功能
- fix: 修复问题
- refactor: 重构代码，不改变功能
- style: 样式、格式调整
- chore: 构建、依赖、配置、脚本等杂项
- docs: 文档修改
- test: 测试相关
- perf: 性能优化
- ci: CI/CD 配置修改
- revert: 回滚提交

## Scope 规则

scope 应该来自改动模块，而不是随便编。

示例：

```txt
feat(audio): add websocket URL fallback
fix(auth): handle token timeout
refactor(upload): simplify file validation
chore(config): update tailwind theme tokens
docs(readme): clarify project origin
```

## 多改动点规则

如果改动点超过 2 个，正文必须用列表列出。

列表格式必须先输出完整英文列表，再空一行输出完整中文列表。不要在同一个列表项内混写中英文。

示例：

```txt
refactor(upload): improve avatar upload flow

- Extract file validation constants and helper methods
- Improve image type and size checking
- Simplify component state handling

- 抽离文件校验常量和工具方法
- 优化图片类型和大小校验逻辑
- 简化组件状态处理
```

## 禁止事项

不要输出空泛内容，例如：

```txt
update code
fix bug
modify files
优化代码
修复问题
```

不要夸大改动影响。

不要编造没有发生的功能变化。

不要把 unrelated changes 硬塞进一个 commit message。

## 输出要求

AI 最终只输出 commit message，不要解释。

输出多行 commit message 时，必须使用 `txt` 代码块包裹完整内容。禁止直接用普通 Markdown 列表输出多行 commit message，避免渲染结果吞掉或弱化空行。

如果用户明确要求只给一行 commit message，则只输出一行英文 header。

如果用户没有明确限制输出一行，且改动内容不止一个细节，优先输出包含中英双语正文的 commit message。

输出多行 commit message 时，英文部分必须完整连续，中文部分必须完整连续，两部分之间必须有且只有一个空白行。该空白行必须出现在 `txt` 代码块的原始内容中，确保复制后仍然保留。
