# `tsconfig.app.json`

- **负责编译前端代码**：通常负责编译 `src/` 目录下的代码（`Vue`、`React`、前端逻辑）。

## 启用浏览器友好的编译选项（比如 dom 库）

## 排除 Node 环境下的文件

## 生成产物给打包器（Vite / Webpack）使用

### extends 继承根配置里的公共规则

### extends —— 继承根配置里的公共规则。

### lib: ["DOM"] —— 启用浏览器 API 类型支持。

### jsx: "preserve" —— 用于 React / Vue JSX。

### types": ["vite/client"] —— 引入 Vite HMR 等类型定义。

### composite: true —— 支持 Project References。

### include —— 编译源代码（src 下的 TS/Vue 文件）。

### exclude —— 排除打包产物。
