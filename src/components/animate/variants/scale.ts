import type { VariantsType } from '../types';
import { varTranEnter, varTranExit } from './transition';

/**
 * 缩放动画 Variants
 * Scale animation variants
 *
 * 用于创建元素沿 X 或 Y 轴缩放的进入与离开动画。
 * Used to create scale-in and scale-out animations along X or Y axis.
 */
export const varScale = (props?: VariantsType) => {
  /**
   * 解构动画参数
   * Destructure animation parameters
   */
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  return {
    /**
     * X 轴缩放进入动画
     * Scale-in animation along X axis
     */
    inX: {
      /**
       * 初始状态
       * Initial state
       *
       * 从 X 轴缩放为 0 且透明开始
       * Start with scaleX 0 and invisible
       */
      initial: { scaleX: 0, opacity: 0 },

      /**
       * 动画状态
       * Animate state
       *
       * 缩放到 1 并显示
       * Scale to 1 and visible
       */
      animate: {
        scaleX: 1,
        opacity: 1,
        transition: varTranEnter({ durationIn, easeIn })
      },

      /**
       * 退出状态
       * Exit state
       *
       * 再次缩放为 0 并消失
       * Scale back to 0 and fade out
       */
      exit: {
        scaleX: 0,
        opacity: 0,
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /**
     * Y 轴缩放进入动画
     * Scale-in animation along Y axis
     */
    inY: {
      initial: { scaleY: 0, opacity: 0 },
      animate: {
        scaleY: 1,
        opacity: 1,
        transition: varTranEnter({ durationIn, easeIn })
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /**
     * X 轴缩放离开动画
     * Scale-out animation along X axis
     */
    outX: {
      initial: { scaleX: 1, opacity: 1 },
      animate: {
        scaleX: 0,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn })
      }
    },

    /**
     * Y 轴缩放离开动画
     * Scale-out animation along Y axis
     */
    outY: {
      initial: { scaleY: 1, opacity: 1 },
      animate: {
        scaleY: 0,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn })
      }
    }
  };
};
