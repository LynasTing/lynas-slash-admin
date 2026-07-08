## 自动化预检规则设计

### 规范来源

代码风格、命名、注释、类型安全等规则以 `ai/rules/code-style-ai.md` 为准。

本文档只描述 PR 和提交阶段的自动化检查流程，不重复维护具体代码风格细则。

### 代码格式规范

1. 必须符合项目中 eslint or prettier 的格式；
2. 使用 Prettier 格式化代码;
3. 使用 ESLint 监测代码格式;
4. 集合 Husky 进行 commit 预检；

### 验证命令策略

1. 小规模改动不允许默认执行 `build` 命令验证结果，应优先使用影响范围更小的检查命令，例如 Prettier、ESLint、TypeScript 类型检查或针对性测试；
2. 小规模改动包括局部组件重构、类型调整、文案修改、样式微调、单文件逻辑整理等不涉及构建配置和产物结构的改动；
3. 大规模改动、跨模块改动、构建配置改动、资源加载改动、路由懒加载改动、依赖升级、或可能影响生产产物的改动，才需要执行 `build` 命令；
4. 如果必须执行 `build`，需要能说明它验证的是类型检查之外的构建链路、资源处理、代码分割或生产产物行为；
5. 验证命令应与改动风险匹配，避免为了小改动生成不必要的构建产物和输出噪音。

### Verification Command Strategy

1. Small changes must not use the `build` command as the default verification step. Prefer narrower checks such as Prettier, ESLint, TypeScript type checking, or targeted tests;
2. Small changes include local component refactors, type adjustments, copy changes, minor style updates, and single-file logic cleanup that do not affect build configuration or output structure;
3. Run the `build` command only for large changes, cross-module changes, build configuration changes, asset loading changes, route lazy-loading changes, dependency upgrades, or changes that may affect production output;
4. When `build` is necessary, the reason must be tied to something beyond type checking, such as the build pipeline, asset processing, code splitting, or production output behavior;
5. Verification commands should match the risk of the change and avoid unnecessary build artifacts or noisy output for small changes.

预检执行流程：

1. 本地提交阶段：
   - 使用 Husky + lint-staged 执行 ESLint、Prettier 校验
   - 不通过则阻止 commit

2. CI 阶段：
   - 执行完整 ESLint、TypeScript 检查
   - 执行重复代码检测（SonarQube）
   - 任一失败则阻止 PR 合并

- 拦截策略：
  - 允许自动修复后进行自检，且在检查通过后进行提交;

### 命名规范

1. 命名规则以 `ai/rules/code-style-ai.md` 的“命名规范 / Naming Rules”为准；
2. PR 检查只负责确认新增或修改代码没有违反项目命名规则；

- 拦截策略
  - 阻止提交；

### 注释规范

1. 注释规则以 `ai/rules/code-style-ai.md` 的“注释规范 / Comment Rules”为准；
2. PR 检查只负责确认公共方法、Hook、核心业务逻辑和复杂状态流转具备必要注释；

- 拦截策略
  - 阻止提交;

### 重复代码监测

1. 使用重复代码检测工具（SonarQube）检测重复逻辑；
2. 当重复率超过阈值（5%）时，CI 阻止合并；
3. 在新增公共函数前先确认是否已有存在的重复函数;
4. 被重复使用代码可根据具体业务逻辑选择是否抽离;

- 拦截策略
  - 阻止提交;

### 无效代码/调试代码监测

1. 禁止提交未使用的变量、函数及其它引用；
2. 禁止提交 console.log、debugger 等调试代码;

- 拦截策略
  - 阻止提交;

### 类型安全监测

1. 如果项目有使用TypeScript，在提交前进行此规则检测;
2. 在提交前进行 tsc 检测;
3. 尽可能的避免使用 any 类型;
4. 如果无法避免使用 any 类型，需要由我确认;

- 拦截策略
  - 阻止提交;
