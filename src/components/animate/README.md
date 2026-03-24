# Animate Component Library / 动画组件库

A collection of animation components and utilities based on Framer Motion, designed to provide easy-to-use animation solutions.  
基于 Framer Motion 的动画组件库，提供简单易用的动画解决方案。

## Directory Structure / 目录结构

```
animate/
├── motion-container.tsx    # General animation container component / 通用动画容器组件
├── motion-lazy.tsx        # Lazy loading animation component / 懒加载动画组件
├── motion-viewport.tsx    # Viewport animation component / 视口动画组件
├── types.ts              # Type definitions / 类型定义
├── variants/            # Animation variants / 动画变量
└── scroll-progress/     # Scroll progress components / 滚动进度组件
```

## Component Documentation / 组件文档

### MotionContainer / 动画容器

A general animation container component that can be used to wrap other components to provide animation capabilities.  
通用动画容器组件，可用于包裹其他组件以提供动画能力

```tsx
import MotionContainer from '@/components/animate/motion-container';

// Usage example
<MotionContainer>
  <YourComponent />
</MotionContainer>;
```

Features:

- Automatically applies initial, animate, and exit states / 自动应用初始、动画和退出状态
- Supports custom className for styling / 支持自定义样式类名
- Implements animation using the variants system / 使用 variants 系统实现动画
- Inherits animation properties to child components / 继承动画属性到子组件
- Provides consistent animation behavior across the application / 在应用程序中提供一致的动画行为

Props:

- `children`: React nodes to be animated / 需要动画的 React 节点
- `className`: Optional CSS class name / CSS 类名
- `...MotionProps`: All Framer Motion props are supported / 支持所有 Framer Motion 的属性

### MotionLazy / 懒加载动画

A component for lazy loading animation features to reduce bundle size.  
懒加载动画组件，减少 bundle 大小

```tsx
import { MotionLazy } from '@/components/animate/motion-lazy';

// Usage example
<MotionLazy>
  <YourComponent />
</MotionLazy>;
```

Features:

- Dynamically loads animation features on demand / 动态加载动画特性
- Reduces initial bundle size / 减少初始 bundle 大小
- Supports strict mode for better development experience / 支持严格模式，提供更好的开发体验
- Wraps content in a full-height container / 将内容包裹在全高容器中
- Uses domMax features for optimal performance / 使用 domMax 特性，提供最佳性能

Props:

- `children`: React nodes to be wrapped in lazy loading context / 需要包裹在懒加载上下文中的 React 节点

### MotionViewport / 视口动画

A component for implementing scroll-triggered animations.  
视口动画组件，实现滚动触发动画

```tsx
import MotionViewport from '@/components/animate/motion-viewport';

// Usage example
<MotionViewport>
  <YourComponent />
</MotionViewport>;
```

Features:

- Triggers animations when elements enter the viewport / 当元素进入视口时触发动画
- Configurable trigger threshold (default: 0.3) / 可配置触发阈值（默认：0.3）
- Supports one-time animation triggers / 支持一次性动画触发
- Inherits animation variants from container / 继承容器的动画变量
- Optimized for scroll performance / 适用于滚动性能优化

Props:

- `children`: React nodes to be animated / 需要动画的 React 节点
- `className`: Optional CSS class name / CSS 类名
- `viewport`: Viewport configuration object / 视口配置对象
  - `once`: Boolean to trigger animation only once / 只触发一次动画
  - `amount`: Number (0-1) for trigger threshold / 触发阈值的数字（0-1）
- `...MotionProps`: All Framer Motion props are supported / 支持所有 Framer Motion 的属性

## Animation Variants / 动画变量

The `variants` directory contains predefined animation variants that can be used with these components. These variants provide consistent animation patterns across the application.  
`variants` 目录包含预定义的动画变量，可以与这些组件一起使用。这些变量提供了一致的动画模式，适用于整个应用程序。

Common variants include:

- Fade in/out / 淡入/淡出
- Slide in/out / 滑入/滑出
- Scale / 缩放
- Stagger children animations / 分散子元素动画

To use custom variants / 使用自定义变量 :

```tsx
import { varContainer } from './variants';

const customVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

<MotionContainer variants={customVariants}>
  <YourComponent />
</MotionContainer>;
```
