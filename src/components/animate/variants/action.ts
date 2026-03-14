/**
 * 手势缩放动画封装
 * Gesture-based scale animation wrapper
 *
 * https://www.framer.com/motion/gestures/
 *
 * @param hover 鼠标悬停或手指悬停时的缩放比例，默认 1.09
 *              Scale factor on hover (default: 1.09)
 * @param tap 鼠标点击或手指按下时的缩放比例，默认 0.97
 *            Scale factor on tap/press (default: 0.97)
 * @returns 一个对象，包含 hover 和 tap 两个状态，可直接传给 Framer Motion 组件
 *          Returns an object with `hover` and `tap` states, usable directly with Framer Motion components
 */
export const varHover = (hover = 1.09, tap = 0.97) => ({
  hover: {
    scale: hover
  },
  tap: {
    scale: tap
  }
});
