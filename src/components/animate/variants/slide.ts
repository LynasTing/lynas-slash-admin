import type { VariantsType } from '../types';
import { varTranEnter, varTranExit } from './transition';

/**
 * 滑动动画 Variants
 * Slide animation variants
 *
 * 用于创建元素沿 X 或 Y 轴的滑动进入和离开动画。
 * Used to create slide-in and slide-out animations along X or Y axis.
 */
export const varSlide = (props?: VariantsType) => {
  /**
   * 动画参数及距离
   * Animation parameters and distance
   */
  const distance = props?.distance || 160;
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  return {
    /**
     * 向上滑动进入
     * Slide-in from bottom
     */
    inUp: {
      initial: { y: distance },
      animate: { y: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向下滑动进入
     * Slide-in from top
     */
    inDown: {
      initial: { y: -distance },
      animate: { y: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: -distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向左滑动进入
     * Slide-in from right
     */
    inLeft: {
      initial: { x: -distance },
      animate: { x: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: -distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向右滑动进入
     * Slide-in from left
     */
    inRight: {
      initial: { x: distance },
      animate: { x: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向上滑动离开
     * Slide-out upwards
     */
    outUp: {
      initial: { y: 0 },
      animate: { y: -distance, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向下滑动离开
     * Slide-out downwards
     */
    outDown: {
      initial: { y: 0 },
      animate: { y: distance, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向左滑动离开
     * Slide-out to left
     */
    outLeft: {
      initial: { x: 0 },
      animate: { x: -distance, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向右滑动离开
     * Slide-out to right
     */
    outRight: {
      initial: { x: 0 },
      animate: { x: distance, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: 0, transition: varTranExit({ durationOut, easeOut }) }
    }
  };
};
