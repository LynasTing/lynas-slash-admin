import type { VariantsType } from '../types';
import { varTranEnter, varTranExit } from './transition';

/**
 * 创建翻转（Flip）动画的 Variants 配置
 * Create a set of flip animation variants
 *
 * 该函数用于生成一组适用于 Framer Motion 的动画配置对象，
 * 包含 X 轴翻转、Y 轴翻转，以及对应的进入（in）和离开（out）动画。
 *
 * This function generates a collection of animation variants used by Framer Motion,
 * including flip animations on both the X-axis and Y-axis, as well as enter and exit states.
 *
 * @param props 可选动画配置参数，例如动画时长和缓动函数
 * Optional animation configuration such as duration and easing
 *
 * @returns 返回一个包含多个动画状态的对象
 * Returns an object containing multiple animation variants
 */
export const varFlip = (props?: VariantsType) => {
  /**
   * 从 props 中解构动画相关参数
   * Destructure animation parameters from props
   *
   * durationIn  - 元素进入动画持续时间
   * durationOut - 元素退出动画持续时间
   * easeIn      - 进入动画缓动函数
   * easeOut     - 退出动画缓动函数
   *
   * 若 props 未传入，则使用空对象避免解构报错
   * If props is undefined, fallback to an empty object
   */
  const { durationIn, durationOut, easeIn, easeOut } = props ?? {};

  /**
   * 返回 Framer Motion Variants 配置对象
   * Return Framer Motion variants configuration
   *
   * Variants 是 Framer Motion 中用于描述组件不同动画状态的对象结构，
   * 常见状态包括 initial、animate、exit。
   *
   * Variants define animation states such as initial, animate, and exit.
   */
  return {
    /**
     * ===============================
     * X 轴翻转进入动画
     * Flip-in animation along the X axis
     * ===============================
     *
     * 元素会从 X 轴 -180° 翻转到 0°，
     * 同时透明度从 0 渐变到 1。
     *
     * The element rotates from -180° to 0° along the X-axis
     * while opacity transitions from 0 to 1.
     */
    inX: {
      /**
       * 初始状态
       * Initial state before animation starts
       *
       * rotateX: -180 表示元素从背面开始翻转
       * opacity: 0 表示完全透明
       */
      initial: { rotateX: -180, opacity: 0 },

      /**
       * 动画执行状态
       * Animation state when the component enters
       *
       * rotateX: 0 代表翻转回正面
       * opacity: 1 表示完全可见
       */
      animate: {
        rotateX: 0,
        opacity: 1,

        /**
         * 使用进入动画过渡配置
         * Apply enter transition configuration
         */
        transition: varTranEnter({ durationIn, easeIn })
      },

      /**
       * 退出状态
       * Exit animation state
       *
       * 元素再次沿 X 轴翻转回 -180°
       * 并逐渐变透明
       */
      exit: {
        rotateX: -180,
        opacity: 0,

        /**
         * 使用退出动画过渡配置
         * Apply exit transition configuration
         */
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /**
     * ===============================
     * Y 轴翻转进入动画
     * Flip-in animation along the Y axis
     * ===============================
     *
     * 元素会从 Y 轴 -180° 翻转到 0°，
     * 同时透明度从 0 变为 1。
     *
     * The element rotates from -180° to 0° along the Y-axis
     * while opacity changes from 0 to 1.
     */
    inY: {
      /**
       * 初始状态
       * Initial state before animation starts
       */
      initial: { rotateY: -180, opacity: 0 },

      /**
       * 进入动画
       * Enter animation state
       */
      animate: {
        rotateY: 0,
        opacity: 1,

        /**
         * 使用进入动画过渡配置
         * Apply enter transition configuration
         */
        transition: varTranEnter({ durationIn, easeIn })
      },

      /**
       * 退出动画
       * Exit animation state
       */
      exit: {
        rotateY: -180,
        opacity: 0,

        /**
         * 使用退出动画过渡配置
         * Apply exit transition configuration
         */
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /**
     * ===============================
     * X 轴翻转离开动画
     * Flip-out animation along the X axis
     * ===============================
     *
     * 元素从正常角度（0°）向前翻转到 70°，
     * 同时透明度逐渐消失。
     *
     * The element rotates forward from 0° to 70°
     * while fading out.
     */
    outX: {
      /**
       * 初始状态
       * Initial visible state
       */
      initial: { rotateX: 0, opacity: 1 },

      /**
       * 离开动画
       * Exit animation
       */
      animate: {
        rotateX: 70,
        opacity: 0,

        /**
         * 使用退出动画过渡配置
         * Apply exit transition configuration
         */
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /**
     * ===============================
     * Y 轴翻转离开动画
     * Flip-out animation along the Y axis
     * ===============================
     *
     * 元素从 0° 向一侧旋转到 70°，
     * 同时透明度逐渐降低到 0。
     *
     * The element rotates from 0° to 70° on the Y-axis
     * while fading out.
     */
    outY: {
      /**
       * 初始状态
       * Initial visible state
       */
      initial: { rotateY: 0, opacity: 1 },

      /**
       * 离开动画
       * Exit animation
       */
      animate: {
        rotateY: 70,
        opacity: 0,

        /**
         * 使用退出动画过渡配置
         * Apply exit transition configuration
         */
        transition: varTranExit({ durationOut, easeOut })
      }
    }
  };
};
