import type { VariantsType } from '../types';
import { varTranEnter, varTranExit } from './transition';

/**
 * 缩放放大/缩小动画 Variants
 * Zoom animation variants
 *
 * 用于创建元素整体缩放以及带方向的缩放进入和离开动画。
 * Used for general zoom animations and directional zoom-in/out effects.
 */
export const varZoom = (props?: VariantsType) => {
  /** 从 props 中解构动画参数 / Destructure animation parameters from props  */
  const { durationIn, durationOut, easeIn, easeOut, distance = 720 } = props ?? {};

  return {
    /**
     * 默认缩放进入
     * Default zoom-in
     */
    in: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scale: 0, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向上缩放进入
     * Zoom-in from bottom
     */
    inUp: {
      initial: { scale: 0, opacity: 0, translateY: distance },
      animate: { scale: 1, opacity: 1, translateY: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scale: 0, opacity: 0, translateY: distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向下缩放进入
     * Zoom-in from top
     */
    inDown: {
      initial: { scale: 0, opacity: 0, translateY: -distance },
      animate: { scale: 1, opacity: 1, translateY: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scale: 0, opacity: 0, translateY: -distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向左缩放进入
     * Zoom-in from left
     */
    inLeft: {
      initial: { scale: 0, opacity: 0, translateX: -distance },
      animate: { scale: 1, opacity: 1, translateX: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scale: 0, opacity: 0, translateX: -distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向右缩放进入
     * Zoom-in from right
     */
    inRight: {
      initial: { scale: 0, opacity: 0, translateX: distance },
      animate: { scale: 1, opacity: 1, translateX: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scale: 0, opacity: 0, translateX: distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 默认缩放离开
     * Default zoom-out
     */
    out: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) }
    },

    /**
     * 向上缩放离开
     * Zoom-out upwards
     */
    outUp: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateY: -distance, transition: varTranEnter({ durationIn, easeIn }) }
    },

    /**
     * 向下缩放离开
     * Zoom-out downwards
     */
    outDown: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateY: distance, transition: varTranEnter({ durationIn, easeIn }) }
    },

    /**
     * 向左缩放离开
     * Zoom-out to left
     */
    outLeft: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateX: -distance, transition: varTranEnter({ durationIn, easeIn }) }
    },

    /**
     * 向右缩放离开
     * Zoom-out to right
     */
    outRight: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateX: distance, transition: varTranEnter({ durationIn, easeIn }) }
    }
  };
};
