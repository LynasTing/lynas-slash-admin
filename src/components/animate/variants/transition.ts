import { Easing } from 'motion/react';
import type { TranHoverType, TranEnterType, TranExitType } from '../types';

// https://www.framer.com/motion/transition/

/** 默认缓动曲线 / Default easing curve for animations  */
const defaultEase = [0.43, 0.13, 0.23, 0.96] as unknown as Easing;

/**
 * 悬停动画
 * Hover animation
 */
export const varTranHover = (props?: TranHoverType) => ({
  duration: props?.duration || 0.32,
  ease: props?.ease || defaultEase
});

/**
 * 进入动画
 * Enter animation
 */
export const varTranEnter = (props?: TranEnterType) => ({
  duration: props?.durationIn || 0.64,
  ease: props?.easeIn || defaultEase
});

/**
 * 退出动画
 * Exit animation
 */
export const varTranExit = (props?: TranExitType) => ({
  duration: props?.durationOut || 0.48,
  ease: props?.easeOut || defaultEase
});
