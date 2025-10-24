# `tsconfig.node.json`

- **负责编译Node 环境下运行的脚本或配置文件**： `vite.config.ts` 、 `postcss.config.ts` 、 `scripts/` 下的构建工具代码等。

## 支持 Node.js 环境类型

## 使用 CommonJS 或 ESM 模块规范

## 不包含浏览器的 DOM 类型

### types: ["node"] —— 让 TS 知道 process、\_\_dirname 之类的变量。

### moduleResolution: "node" —— 使用 Node 模块解析方式。

### include —— 只编译构建相关脚本，不掺和前端代码。

### exclude: ["src"] —— 排除文件，避免和前端重复编译。
