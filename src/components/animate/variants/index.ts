import { varBgColor, varBgKenburns, varBgPan } from './background';
import { varBounce } from './bounce';
import { varFade } from './fade';
import { varFlip } from './flip';
import { varRotate } from './rotate';
import { varScale } from './scale';
import { varSlide } from './slide';
import { varZoom } from './zoom';

export * from './action';
export * from './background';
export * from './bounce';
export * from './container';
export * from './fade';
export * from './flip';
export * from './path';
export * from './rotate';
export * from './scale';
export * from './slide';
export * from './transition';
export * from './zoom';

/**
 * 获取动画 Variants
 * Get animation variants
 *
 * 根据传入的 variant 字符串返回对应的动画配置对象。
 * This function returns the corresponding animation configuration object
 * based on the given variant string.
 *
 * @param variant - 动画类型名称 / The name of the animation variant
 * @returns 对应的动画配置 / Corresponding animation variant object
 */
export function getVariant(variant = 'slideInUp') {
  return {
    // ------------------------------
    // Slide 动画
    // Slide animations
    // ------------------------------
    slideInUp: varSlide().inUp,
    slideInDown: varSlide().inDown,
    slideInLeft: varSlide().inLeft,
    slideInRight: varSlide().inRight,
    slideOutUp: varSlide().outUp,
    slideOutDown: varSlide().outDown,
    slideOutLeft: varSlide().outLeft,
    slideOutRight: varSlide().outRight,

    // ------------------------------
    // Fade 动画
    // Fade animations
    // ------------------------------
    fadeIn: varFade().in,
    fadeInUp: varFade().inUp,
    fadeInDown: varFade().inDown,
    fadeInLeft: varFade().inLeft,
    fadeInRight: varFade().inRight,
    fadeOut: varFade().out,
    fadeOutUp: varFade().outUp,
    fadeOutDown: varFade().outDown,
    fadeOutLeft: varFade().outLeft,
    fadeOutRight: varFade().outRight,

    // ------------------------------
    // Zoom 动画
    // Zoom animations
    // ------------------------------
    zoomIn: varZoom({ distance: 80 }).in,
    zoomInUp: varZoom({ distance: 80 }).inUp,
    zoomInDown: varZoom({ distance: 80 }).inDown,
    zoomInLeft: varZoom({ distance: 240 }).inLeft,
    zoomInRight: varZoom({ distance: 240 }).inRight,
    zoomOut: varZoom().out,
    zoomOutLeft: varZoom().outLeft,
    zoomOutRight: varZoom().outRight,
    zoomOutUp: varZoom().outUp,
    zoomOutDown: varZoom().outDown,

    // ------------------------------
    // Bounce 动画
    // Bounce animations
    // ------------------------------
    bounceIn: varBounce().in,
    bounceInUp: varBounce().inUp,
    bounceInDown: varBounce().inDown,
    bounceInLeft: varBounce().inLeft,
    bounceInRight: varBounce().inRight,
    bounceOut: varBounce().out,
    bounceOutUp: varBounce().outUp,
    bounceOutDown: varBounce().outDown,
    bounceOutLeft: varBounce().outLeft,
    bounceOutRight: varBounce().outRight,

    // ------------------------------
    // Flip 动画
    // Flip animations
    // ------------------------------
    flipInX: varFlip().inX,
    flipInY: varFlip().inY,
    flipOutX: varFlip().outX,
    flipOutY: varFlip().outY,

    // ------------------------------
    // Scale 动画
    // Scale animations
    // ------------------------------
    scaleInX: varScale().inX,
    scaleInY: varScale().inY,
    scaleOutX: varScale().outX,
    scaleOutY: varScale().outY,

    // ------------------------------
    // Rotate 动画
    // Rotate animations
    // ------------------------------
    rotateIn: varRotate().in,
    rotateOut: varRotate().out,

    // ------------------------------
    // Background 动画
    // Background animations
    // ------------------------------
    kenburnsTop: varBgKenburns().top,
    kenburnsBottom: varBgKenburns().bottom,
    kenburnsLeft: varBgKenburns().left,
    kenburnsRight: varBgKenburns().right,
    panTop: varBgPan().top,
    panBottom: varBgPan().bottom,
    panLeft: varBgPan().left,
    panRight: varBgPan().right,
    color2x: varBgColor(),
    color3x: varBgColor({ colors: ['#19dcea', '#b22cff', '#ea2222'] }),
    color4x: varBgColor({
      colors: ['#19dcea', '#b22cff', '#ea2222', '#f5be10']
    }),
    color5x: varBgColor({
      colors: ['#19dcea', '#b22cff', '#ea2222', '#f5be10', '#3bd80d']
    })
  }[variant];
}
