import type { VariantsType } from '../types';
import { varTranEnter, varTranExit } from './transition';

/**
 * 基础淡入淡出动画 Variants
 * Basic fade in/out animation variants
 *
 * 提供入场（in）和出场（out）动画，以及上下左右方向
 * Provides both enter (in) and exit (out) animations, including directions up, down, left, right
 *
 * @param props 可选动画配置 / Optional animation config (distance, durationIn, durationOut, easeIn, easeOut)
 * @returns 返回包含所有方向动画的对象 / Returns an object containing all direction animations
 */
export const varFade = (props?: VariantsType) => {
  /**
   * 位移动画距离
   * Translate distance for directional animation
   */
  const distance = props?.distance || 120;

  /**
   * 入场动画持续时间
   * Enter animation duration
   */
  const durationIn = props?.durationIn;

  /**
   * 出场动画持续时间
   * Exit animation duration
   */
  const durationOut = props?.durationOut;

  /**
   * 入场动画缓动曲线
   * Enter animation easing
   */
  const easeIn = props?.easeIn;

  /**
   * 出场动画缓动曲线
   * Exit animation easing
   */
  const easeOut = props?.easeOut;

  return {
    // ---------------- 入场动画 / ENTER ANIMATIONS ----------------

    /**
     * 无位移淡入
     * Fade in without translation
     */
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: varTranEnter },
      exit: { opacity: 0, transition: varTranExit }
    },

    /**
     * 向上淡入
     * Fade in from bottom to top
     */
    inUp: {
      initial: { y: distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: distance, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向下淡入
     * Fade in from top to bottom
     */
    inDown: {
      initial: { y: -distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: -distance, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向左淡入
     * Fade in from right to left
     */
    inLeft: {
      initial: { x: -distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: -distance, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向右淡入
     * Fade in from left to right
     */
    inRight: {
      initial: { x: distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: distance, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    // ---------------- 出场动画 / EXIT ANIMATIONS ----------------

    /**
     * 无位移淡出
     * Fade out without translation
     */
    out: {
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { opacity: 1, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向上淡出
     * Fade out from top to bottom
     */
    outUp: {
      initial: { y: 0, opacity: 1 },
      animate: { y: -distance, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: 0, opacity: 1, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向下淡出
     * Fade out from bottom to top
     */
    outDown: {
      initial: { y: 0, opacity: 1 },
      animate: { y: distance, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: 0, opacity: 1, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向左淡出
     * Fade out from left to right
     */
    outLeft: {
      initial: { x: 0, opacity: 1 },
      animate: { x: -distance, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: 0, opacity: 1, transition: varTranExit({ durationOut, easeOut }) }
    },

    /**
     * 向右淡出
     * Fade out from right to left
     */
    outRight: {
      initial: { x: 0, opacity: 1 },
      animate: { x: distance, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: 0, opacity: 1, transition: varTranExit({ durationOut, easeOut }) }
    }
  };
};
