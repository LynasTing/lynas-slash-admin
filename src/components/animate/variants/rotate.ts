import type { VariantsType } from '../types';
import { varTranEnter, varTranExit } from './transition';

/**
 * 旋转动画 Variants
 * Rotate animation variants
 *
 * 用于创建元素旋转进入和旋转离开的动画配置。
 * Used to create rotate-in and rotate-out animation variants.
 */
export const varRotate = (props?: VariantsType) => {
  /**
   * 从 props 中解构动画参数
   * Destructure animation parameters from props
   */
  const { durationIn, durationOut, easeIn, easeOut } = props ?? {};

  return {
    /**
     * 进入动画
     * Enter animation
     */
    in: {
      /**
       * 初始状态
       * Initial state
       *
       * 元素从透明并旋转 -360° 开始。
       * Start transparent and rotated -360°.
       */
      initial: { opacity: 0, rotate: -360 },

      /**
       * 动画状态
       * Animate state
       *
       * 旋转回 0° 并显示。
       * Rotate back to 0° and become visible.
       */
      animate: {
        opacity: 1,
        rotate: 0,
        transition: varTranEnter({ durationIn, easeIn })
      },

      /**
       * 退出状态
       * Exit state
       *
       * 再次旋转 -360° 并消失。
       * Rotate -360° again and fade out.
       */
      exit: {
        opacity: 0,
        rotate: -360,
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /**
     * 离开动画
     * Leave animation
     */
    out: {
      /**
       * 初始状态
       * Initial state
       */
      initial: { opacity: 1, rotate: 0 },

      /**
       * 动画状态
       * Animate state
       *
       * 旋转 -360° 并淡出。
       * Rotate -360° while fading out.
       */
      animate: {
        opacity: 0,
        rotate: -360,
        transition: varTranExit({ durationOut, easeOut })
      }
    }
  };
};
