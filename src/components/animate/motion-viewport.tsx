import { m, type MotionProps } from 'framer-motion';
import { varContainer } from './variants';

interface Props extends MotionProps {
  className?: string;
}

/**
 * MotionViewport - 用于创建基于窗口滚动的动画效果
 * MotionViewport - Scroll-triggered animation container based on viewport
 *
 * 主要特性 / Key Features：
 * - 当元素进入视口时触发动画
 *   Triggers animation when element enters the viewport
 *
 * - 支持自定义动画
 *   Supports custom animation variants
 *
 * - 可配置视口触发条件
 *   Configurable viewport trigger conditions
 *
 * 视口配置说明 / Viewport Options：
 * - once: 只触发一次动画
 *   Whether the animation should run only once
 *
 * - amount: 元素进入视口的比例阈值（0-1）
 *   The percentage of the element that must be visible (0–1) before triggering
 *
 * 动画状态 / Animation States：
 * - initial: 初始状态
 *   Initial state before entering viewport
 *
 * - animate: 进入视口后的动画状态
 *   State when element is in view
 *
 * 使用场景 / Use Cases：
 * - 页面滚动渐入效果
 *   Fade-in on scroll
 *
 * - 列表逐项出现动画
 *   Staggered list animations
 *
 * - 首屏以下内容懒触发动画
 *   Lazy-trigger animations below the fold
 *
 * @see https://www.framer.com/motion/scroll-animations/#scroll-triggered-animations
 */
export default function MotionViewport({ children, className, ...rest }: Props) {
  return (
    <m.div
      /**
       * initial：初始动画状态
       * initial: initial animation state
       */
      initial="initial"
      /**
       * whileInView：进入视口时触发 animate
       * whileInView: triggers "animate" when element enters viewport
       */
      whileInView="animate"
      /**
       * viewport 配置：
       * viewport configuration:
       * - once: 只执行一次 / run only once
       * - amount: 触发比例 / visibility threshold
       */
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      className={className}
      {...rest}>
      {children}
    </m.div>
  );
}
