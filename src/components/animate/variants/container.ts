export type Props = {
  /**
   * 子元素入场动画的错开时间（秒）
   * Stagger time between each child animation on enter
   */
  staggerIn?: number;

  /**
   * 整体入场动画的延迟（秒）
   * Delay before starting the container's enter animation
   */
  delayIn?: number;

  /**
   * 子元素出场动画的错开时间（秒）
   * Stagger time between each child animation on exit
   */
  staggerOut?: number;
};

/**
 * 容器动画 Variants
 * Container animation variants for Framer Motion
 *
 * 用于给子元素的入场和出场动画添加错开效果
 * Applies staggered animation to children when container animates in/out
 *
 * @param props - 可选配置 / Optional configuration
 * @returns 返回 Framer Motion Variants 对象 / Returns a Variants object
 */
export const varContainer = (props?: Props) => {
  // 给三个值设置默认值 / Set default values if not provided
  const staggerIn = props?.staggerIn || 0.05;
  const delayIn = props?.delayIn || 0.05;
  const staggerOut = props?.staggerOut || 0.05;

  return {
    /** 入场动画 / Animate in */
    animate: {
      transition: {
        staggerChildren: staggerIn, // 每个子元素入场错开时间 / Time between each child's enter animation
        delayChildren: delayIn // 整体延迟 / Delay before starting child animations
      }
    },

    /** 出场动画 / Animate out */
    exit: {
      transition: {
        staggerChildren: staggerOut, // 每个子元素出场错开时间 / Time between each child's exit animation
        staggerDirection: -1 // -1 表示倒序 / -1 means animate children in reverse order
      }
    }
  };
};
