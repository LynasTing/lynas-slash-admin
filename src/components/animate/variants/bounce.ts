import type { VariantsType } from '../types';
import { varTranEnter, varTranExit } from './transition';

/**
 * 弹跳动画 Variants 配置
 * Bounce animation variants configuration for Framer Motion
 *
 * 包含多种入场（in）和出场（out）动画，以及方向变化（上下左右）
 * Includes multiple enter and exit animations with directional variations (up/down/left/right)
 *
 * @param props - 可选配置 / Optional configuration (durationIn, durationOut, easeIn, easeOut)
 * @returns 返回 Variants 对象 / Returns a Variants object compatible with Framer Motion
 */
export const varBounce = (props?: VariantsType) => {
  // 解构传入的动画参数 / Destructure the optional animation parameters
  const { durationIn, durationOut, easeIn, easeOut } = props ?? {};

  return {
    // ----------------- 入场动画 / IN Animations -----------------

    /** 默认入场弹跳 / Default bounce in */
    in: {
      initial: {}, // 初始状态 / Initial state
      animate: {
        scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1], // 缩放变化 / Scale animation
        opacity: [0, 1, 1, 1, 1, 1], // 透明度变化 / Opacity animation
        transition: varTranEnter({ durationIn, easeIn }) // 过渡效果 / Transition
      },
      exit: {
        scale: [0.9, 1.1, 0.3],
        opacity: [1, 1, 0]
      }
    },

    /** 从下方入场 / Bounce in from bottom */
    inUp: {
      initial: {},
      animate: {
        y: [720, -24, 12, -4, 0], // 垂直位移变化 / Vertical position animation
        scaleY: [4, 0.9, 0.95, 0.985, 1], // Y 轴缩放 / Scale Y
        opacity: [0, 1, 1, 1, 1],
        transition: { ...varTranEnter({ durationIn, easeIn }) }
      },
      exit: {
        y: [12, -24, 720],
        scaleY: [0.985, 0.9, 3],
        opacity: [1, 1, 0],
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /** 从上方入场 / Bounce in from top */
    inDown: {
      initial: {},
      animate: {
        y: [-720, 24, -12, 4, 0],
        scaleY: [4, 0.9, 0.95, 0.985, 1],
        opacity: [0, 1, 1, 1, 1],
        transition: varTranEnter({ durationIn, easeIn })
      },
      exit: {
        y: [-12, 24, -720],
        scaleY: [0.985, 0.9, 3],
        opacity: [1, 1, 0],
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /** 从左侧入场 / Bounce in from left */
    inLeft: {
      initial: {},
      animate: {
        x: [-720, 24, -12, 4, 0],
        scaleX: [3, 1, 0.98, 0.995, 1],
        opacity: [0, 1, 1, 1, 1],
        transition: varTranEnter({ durationIn, easeIn })
      },
      exit: {
        x: [0, 24, -720],
        scaleX: [1, 0.9, 2],
        opacity: [1, 1, 0],
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    /** 从右侧入场 / Bounce in from right */
    inRight: {
      initial: {},
      animate: {
        x: [720, -24, 12, -4, 0],
        scaleX: [3, 1, 0.98, 0.995, 1],
        opacity: [0, 1, 1, 1, 1],
        transition: varTranEnter({ durationIn, easeIn })
      },
      exit: {
        x: [0, -24, 720],
        scaleX: [1, 0.9, 2],
        opacity: [1, 1, 0],
        transition: varTranExit({ durationOut, easeOut })
      }
    },

    // ----------------- 出场动画 / OUT Animations -----------------

    /** 默认出场 / Default bounce out */
    out: {
      animate: { scale: [0.9, 1.1, 0.3], opacity: [1, 1, 0] }
    },

    /** 向上出场 / Bounce out upwards */
    outUp: {
      animate: {
        y: [-12, 24, -720],
        scaleY: [0.985, 0.9, 3],
        opacity: [1, 1, 0]
      }
    },

    /** 向下出场 / Bounce out downwards */
    outDown: {
      animate: {
        y: [12, -24, 720],
        scaleY: [0.985, 0.9, 3],
        opacity: [1, 1, 0]
      }
    },

    /** 向左出场 / Bounce out to the left */
    outLeft: {
      animate: { x: [0, 24, -720], scaleX: [1, 0.9, 2], opacity: [1, 1, 0] }
    },

    /** 向右出场 / Bounce out to the right */
    outRight: {
      animate: { x: [0, -24, 720], scaleX: [1, 0.9, 2], opacity: [1, 1, 0] }
    }
  };
};
