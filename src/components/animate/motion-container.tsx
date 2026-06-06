import { m, type MotionProps } from 'motion/react';
import { varContainer } from './variants';

interface Props extends MotionProps {
  className?: string;
}

/**
 * MotionContainer - 动画容器组件 / Animation container component
 *
 * 这是一个基于 Framer Motion 的通用动画容器组件，用于管理子组件的动画状态和过渡效果。
 * A reusable animation container built on Framer Motion, used to manage animation states and transitions for child components.
 *
 * 主要功能 / Key Features：
 * 1. 提供统一的动画状态管理（initial、animate、exit）
 *    Provides unified animation state management (initial, animate, exit)
 *
 * 2. 支持子组件的级联动画效果
 *    Supports staggered (cascading) animations for children
 *
 * 3. 可自定义容器样式
 *    Allows custom container styling
 *
 * 动画变体（Variants）说明 / Variants Explanation：
 * - initial: 初始状态 / Initial state
 * - animate: 动画状态 / Animate state
 * - exit: 退出状态 / Exit state
 *
 * 子组件动画控制 / Child Animation Control：
 * - 当父容器设置 variants 后，子组件可以继承这些动画属性
 *   When the parent container defines variants, children can inherit them
 *
 * - 子组件可以通过 variants 属性指定自己的动画效果
 *   Children can define their own animation via the variants prop
 *
 * - 支持多种预设动画效果：fade、slide、zoom、bounce、flip、scale、rotate 等
 *   Supports multiple preset animations: fade, slide, zoom, bounce, flip, scale, rotate, etc.
 *
 * 使用示例 / Usage Example：
 * ```tsx
 * <MotionContainer>
 *   <motion.div variants={varFade().in}>
 *     <h1>Animated Content</h1>
 *   </motion.div>
 * </MotionContainer>
 * ```
 *
 * 自定义动画参数 / Custom Animation Options：
 * 可以通过 varContainer 函数传入以下参数来自定义动画效果：
 * You can customize animation behavior via the varContainer function:
 *
 * - staggerIn: 子元素进入动画的延迟时间（默认：0.05s）
 *   Delay between child enter animations (default: 0.05s)
 *
 * - delayIn: 整体进入动画的延迟时间（默认：0.05s）
 *   Delay before the container animation starts (default: 0.05s)
 *
 * - staggerOut: 子元素退出动画的延迟时间（默认：0.05s）
 *   Delay between child exit animations (default: 0.05s)
 */
export default function MotionContainer({ className, children, variants }: Props) {
  return (
    <m.div
      /**
       * 指定 initial、animate 和 exit 后，子组件无需重复声明
       * Once initial/animate/exit are defined here, children don't need to redefine them
       */
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      variants={variants ?? varContainer()}>
      {children}
    </m.div>
  );
}
