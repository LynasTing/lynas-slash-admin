import { Transition } from 'motion/react';

/**
 * 基础动画配置
 * Base animation configuration
 */
export type AnimationConfig = {
  /**
   * 入动画持续时间（秒）
   * Duration of the animation (seconds)
   */
  duration?: Transition['duration'];

  /**
   * 缓动函数
   * Easing function for the animation
   */
  ease?: Transition['ease'];
};

/**
 * 悬停动画配置
 * Hover animation configuration
 */
export type TranHoverType = AnimationConfig;

/**
 * 进入动画配置
 * Enter animation configuration
 */
export type TranEnterType = {
  /**
   * 进入动画持续时间（秒）
   * Duration of enter animation in seconds
   */
  durationIn?: number;

  /**
   * 进入动画缓动曲线
   * Easing curve for enter animation
   */
  easeIn?: Transition['ease'];
};

/**
 * 退出动画配置
 * Exit animation configuration
 */
export type TranExitType = {
  /**
   * 退出动画持续时间（秒）
   * Duration of exit animation in seconds
   */
  durationOut?: number;

  /**
   * 退出动画缓动曲线
   * Easing curve for exit animation
   */
  easeOut?: Transition['ease'];
};

/**
 * 通用动画 Variants 配置
 * General animation variants configuration
 *
 * 同时包含 enter / exit 配置，以及位移动画距离
 * Includes enter/exit animation config and optional translate distance
 */
export type VariantsType = TranEnterType &
  TranExitType & {
    /**
     * 位移动画距离
     * Distance for translate/position animation
     */
    distance?: number;
  };

/**
 * 背景动画配置
 * Background animation configuration
 */
export type BackgroundType = AnimationConfig & {
  /**
   * 颜色数组，用于渐变或颜色过渡
   * Array of colors for gradient or color transition
   */
  colors?: string[];
};
