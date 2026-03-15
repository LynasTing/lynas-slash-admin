import type { BackgroundType } from '../types';

/**
 * 背景颜色渐变动画 Variants 工厂函数
 * Background color transition animation variants factory
 */
export const varBgColor = (props?: BackgroundType) => {
  const { colors = ['#19dcea', '#b22cff'], duration = 5, ease = 'linear' } = props ?? {};

  return {
    animate: {
      background: colors,
      transition: {
        duration,
        ease
      }
    }
  };
};

/**
 * Ken Burns 背景动画 Variants 工厂函数
 * Ken Burns Background Animation Variants Factory
 *
 * 生成四个方向的 Ken Burns 动画配置，用于 Framer Motion
 * Generates Ken Burns animation variants for four directions, for use with Framer Motion
 *
 * @returns 四个方向的动画配置对象
 */
export const varBgKenburns = (props?: BackgroundType) => {
  const { duration = 5, ease = 'easeInOut' } = props ?? {};

  /** 放大比例 / Scale factor for the Ken Burns effect */
  const scale = [1, 1.25];

  /** transition 配置 / Transition configuration (duration + easing) */
  const transition = {
    duration,
    ease
  };

  return {
    top: {
      animate: {
        scale,
        // y 轴移动，从 0 到 -15px / Translate along Y axis from 0 to -15px
        y: [0, -15],
        /**
         * 缩放中心关键帧 / Transform origin keyframes
         * - 动画开始: '50% 16%' → 水平居中，垂直靠上 16% / Start: 50% horizontal, 16% from top
         * - 动画结束: '50% top' → 水平居中，垂直顶部 / End: 50% horizontal, top
         */
        transformOrigin: ['50% 16%', '50% top'],
        // 过渡动画 / Transition settings (duration + ease)
        transition
      }
    },

    right: {
      animate: {
        // x 轴移动，从 0 → -20px / Translate X from 0 → -20px
        x: [0, -20],
        // y 轴移动，从 0 → -15px / Translate Y from 0 → -15px
        y: [0, -15],
        /**
         * 缩放中心关键帧 / Transform origin keyframes
         * - 动画开始: '84% 50%' → 靠右，垂直居中 / Start: 84% horizontal, center vertical
         * - 动画结束: '0% right' → 右边缘 / End: right edge
         */
        transformOrigin: ['84% 50%', '0% right'],
        transition
      }
    },

    bottom: {
      animate: {
        scale,
        // y 轴移动，从 0 → 15px / Translate Y from 0 → 15px
        y: [0, 15],
        /**
         * 缩放中心关键帧 / Transform origin keyframes
         * - 动画开始: '50% 84%' → 水平居中，靠下 84% / Start: 50% horizontal, 84% from top
         * - 动画结束: '50% bottom' → 水平居中，底部 / End: 50% horizontal, bottom
         */
        transformOrigin: ['50% 84%', '50% bottom'],
        transition
      }
    },

    left: {
      animate: {
        scale,
        // x 轴移动，从 0 → 20px / Translate X from 0 → 20px
        x: [0, 20],
        // y 轴移动，从 0 → 15px / Translate Y from 0 → 15px
        y: [0, 15],
        /**
         * 缩放中心关键帧 / Transform origin keyframes
         * - 动画开始: '16% 50%' → 靠左，垂直居中 / Start: 16% horizontal, center vertical
         * - 动画结束: '0% left' → 左边缘 / End: left edge
         */
        transformOrigin: ['16% 50%', '0% left'],
        transition
      }
    }
  };
};

/**
 * 背景平移动画 Variants 工厂函数
 * Background Pan Animation Variants Factory
 *
 * 生成四个方向的背景平移动画配置，用于 Framer Motion
 * Generates background pan animation variants for four directions, for use with Framer Motion
 *
 * @param props.colors 颜色数组 / Array of colors for gradient background
 * @param props.duration 动画持续时间（秒），默认 5 / Duration of animation in seconds, default 5
 * @param props.ease 缓动函数，默认 'linear' / Easing function, default 'linear'
 * @returns 四个方向的动画配置对象 / Animate object for motion component
 */
export const varBgPan = (props?: BackgroundType) => {
  const { colors = [], duration = 5, ease = 'linear' } = props ?? {};

  /** transition 配置 / Transition settings (duration + easing) */
  const transition = {
    duration,
    ease
  };

  /** 根据角度生成线性渐变 / Generate linear gradient string by degree */
  const gradient = (deg: number) => `linear-gradient(${deg}deg, ${colors})`;

  return {
    top: {
      animate: {
        // 背景颜色渐变 / Gradient background
        backgroundImage: [gradient(0), gradient(0)],
        // 从底部到顶部移动 / Move from bottom to top
        backgroundPosition: ['center 99%', 'center 1%'],
        // 背景尺寸保持纵向拉伸 / Background size stretched vertically
        backgroundSize: ['100% 600%', '100% 600%'],
        transition
      }
    },

    right: {
      animate: {
        // 背景颜色渐变 / Gradient background
        backgroundImage: [gradient(270), gradient(270)],
        // 从左到右移动 / Move from left to right
        backgroundPosition: ['1% center', '99% center'],
        // 背景尺寸保持横向拉伸 / Background size stretched horizontally
        backgroundSize: ['600% 100%', '600% 100%'],
        transition
      }
    },

    bottom: {
      animate: {
        // 背景颜色渐变 / Gradient background
        backgroundImage: [gradient(0), gradient(0)],
        // 从顶部到底部移动 / Move from top to bottom
        backgroundPosition: ['center 1%', 'center 99%'],
        // 背景尺寸保持纵向拉伸 / Background size stretched vertically
        backgroundSize: ['100% 600%', '100% 600%'],
        transition
      }
    },

    left: {
      animate: {
        // 背景颜色渐变 / Gradient background
        backgroundImage: [gradient(270), gradient(270)],
        // 从右到左移动 / Move from right to left
        backgroundPosition: ['99% center', '1% center'],
        // 背景尺寸保持横向拉伸 / Background size stretched horizontally
        backgroundSize: ['600% 100%', '600% 100%'],
        transition
      }
    }
  };
};
