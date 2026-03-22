import { LazyMotion, domMax, m } from 'motion/react';

/**
 * MotionLazy Props 类型
 * - children: 需要被动画包裹的 React 节点
 *
 * MotionLazy Props type
 * - children: React nodes to be wrapped with animation
 */
type Props = {
  children: React.ReactNode;
};

/**
 * MotionLazy 组件
 *
 * 功能：
 * - 提供 `motion/react` 的懒加载动画上下文
 * - 包裹子元素，使其可以使用 `motion` 动画特性
 *
 * MotionLazy Component
 *
 * Purpose:
 * - Provide a lazy-loading animation context for `motion/react`
 * - Wrap children to enable motion animations
 *
 * 使用说明：
 * - 将需要使用 `motion` 动画的组件作为 children 传入
 * - 内部使用 `LazyMotion` + `domMax` 提供优化的动画特性
 *
 * LazyMotion + domMax 说明：
 * - `LazyMotion`：懒加载动画上下文，只有在渲染时才加载动画逻辑
 * - `features` 属性：
 *   - domMax：一套 DOM 优化动画特性集合
 *   - 功能：
 *     1. 提供高性能的 DOM 动画支持
 *     2. 减少初始加载体积（按需加载动画核心逻辑）
 *     3. 避免每个 motion 组件都单独导入动画特性造成重复打包
 *   - 推荐场景：大部分页面动画，包括 opacity、scale、translate、rotate 等常用动画
 *
 * LazyMotion + domMax Explanation:
 * - `LazyMotion`: lazy-loading animation context, only loads animation logic when rendered
 * - `features` prop:
 *   - domMax: a feature set optimized for DOM animations
 *   - Provides:
 *     1. high-performance DOM animation support
 *     2. smaller initial bundle size (animation logic loaded on demand)
 *     3. avoids duplicating animation features if multiple motion components exist
 *   - Recommended for: most page animations like opacity, scale, translate, rotate, etc.
 */
export function MotionLazy({ children }: Props) {
  return (
    <LazyMotion strict features={domMax}>
      {/* 动画容器始终撑满父容器 / Animation container always fills the parent container */}
      <m.div style={{ height: '100%' }}>{children}</m.div>
    </LazyMotion>
  );
}
