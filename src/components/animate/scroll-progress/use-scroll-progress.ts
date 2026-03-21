import { useMemo, useRef } from 'react';
import { useScroll } from 'motion/react';
import type { MotionValue } from 'motion/react';

/**
 * 滚动目标类型
 *
 * - `document`：监听整个文档的滚动
 * - `container`：监听指定容器的滚动
 *
 * Scroll target type
 *
 * - `document`: observe scroll on the entire document
 * - `container`: observe scroll on a specific container element
 */
export type UseScrollProgress = 'document' | 'container';

/**
 * 滚动进度状态
 * Scroll progress state
 */
export type ScrollProgressState = {
  /**
   * 水平滚动进度值（0-1）
   *
   * - 类型：`MotionValue<number>`
   * - 说明：
   *   1. 表示水平滚动的进度，值范围为 0 到 1。
   *   2. 使用 `motion/react` 提供的 `MotionValue`，可以直接用于动画绑定。
   *
   * Horizontal scroll progress (0-1)
   *
   * - Type: `MotionValue<number>`
   * - Description:
   *   1. Represents the horizontal scroll progress, range 0–1.
   *   2. Uses `MotionValue` from `motion/react` for smooth reactive animations.
   */
  scrollXProgress: MotionValue<number>;

  /**
   * 垂直滚动进度值（0-1）
   *
   * - 类型：`MotionValue<number>`
   * - 说明：
   *   1. 表示垂直滚动的进度，值范围为 0 到 1。
   *   2. 可用于绑定动画或 UI 进度指示器。
   *
   * Vertical scroll progress (0-1)
   *
   * - Type: `MotionValue<number>`
   * - Description:
   *   1. Represents vertical scroll progress, range 0–1.
   *   2. Can be used for animation or UI progress indicators.
   */
  scrollYProgress: MotionValue<number>;

  /**
   * 容器元素的引用，用于容器滚动模式
   *
   * - 类型：`React.RefObject<HTMLDivElement | null>`
   * - 说明：
   *   1. React 提供的 Ref 对象，用于访问 DOM 元素。
   *   2. `HTMLDivElement` 表示 `<div>` 元素类型。
   *   3. `| null` 表示挂载前或未绑定时，`current` 可能为空。
   *   4. `useRef` 返回对象是稳定的，不会在组件生命周期中改变。
   *
   * Container element reference for scroll container mode
   *
   * - Type: `React.RefObject<HTMLDivElement | null>`
   * - Description:
   *   1. React Ref object to access the DOM element.
   *   2. `HTMLDivElement` represents a `<div>` element type.
   *   3. `| null` means `current` can be null before mounting.
   *   4. `useRef` returns a stable object across the component lifecycle.
   */
  elementRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * 获取滚动进度 Hook
 *
 * - 参数：
 *   - target: 滚动目标类型，默认为 'container'
 * - 返回：
 *   - scrollXProgress：水平滚动进度
 *   - scrollYProgress：垂直滚动进度
 *   - elementRef：容器引用（仅 container 模式）
 *
 * Scroll progress Hook
 *
 * - Parameters:
 *   - target: scroll target type, default 'container'
 * - Returns:
 *   - scrollXProgress: horizontal scroll progress
 *   - scrollYProgress: vertical scroll progress
 *   - elementRef: container reference (only in container mode)
 */
export function useScrollProgress(target: UseScrollProgress = 'container'): ScrollProgressState {
  /** 创建一个 Ref 对象用于容器元素 / Create a Ref object for the container element */
  const elementRef = useRef<HTMLDivElement>(null);

  /** motion/react useScroll 的参数配置，仅 container 模式需要 / Options for motion/react useScroll, required for container mode */
  const options = { container: elementRef };

  /** 获取滚动进度 / Get scroll progress from motion/react */
  const { scrollXProgress, scrollYProgress } = useScroll(target === 'container' ? options : undefined);

  /**  elementRef 不会变化，不需要加入依赖 */
  const memoizedValue = useMemo(() => ({ elementRef, scrollXProgress, scrollYProgress }), [scrollXProgress, scrollYProgress]);

  return memoizedValue;
}
