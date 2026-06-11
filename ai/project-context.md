# Project Context

## 项目来源

当前项目用于学习和改造开源项目 `slash-admin`。

- 原始项目GitHub 仓库：https://github.com/d3george/slash-admin
- 本地原始项目路径：`/Users/LynasTing/Documents/project/Ting/slash-admin_source`

- 当前项目 GitHub 仓库：https://github.com/LynasTing/lynas-slash-admin.git
- 当前改造项目路径：`/Users/LynasTing/Documents/project/Ting/lynas-slash-admin`

## 使用方式

在分析、重构或实现功能时，可以把 `slash-admin_source` 作为原始实现参考，但不能直接假设原始实现就是正确设计。

对比两个项目时，应优先关注：

- 原始项目的功能意图和交互边界；
- 当前项目已经改造过的组件 API、代码风格和目录结构；
- 当前项目 `ai/rules` 和 `ai/workflow` 下的规范；
- 是否存在从原始项目继承来的设计缺陷、命名问题或资源管理问题。

如果当前项目实现与原始项目实现冲突，默认以当前项目的设计目标和本地规范为准。
