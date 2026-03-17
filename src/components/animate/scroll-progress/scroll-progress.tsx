import { useSpring, m, type HTMLMotionProps, type MotionValue } from 'motion/react';
import { useTheme } from '@/theme/hooks/use-theme';
import type { CSSProperties } from 'react';

interface Props extends HTMLMotionProps<'div'> {
  /**
   * 滚动进度值，范围 0 ～ 1
   * Scroll progress value, range from 0 to 1
   */
  scrollYProgress: MotionValue<number>;

  /**
   * 进度条颜色（可选）
   * Progress bar color (optional)
   */
  color?: string;

  /**
   * 进度条高度，默认 4px（可选）
   * Progress bar height, default is 4px (optional)
   */
  height?: number;
}

/**
 * 滚动条进度
 * Scroll progress bar
 *
 * @description 用于显示页面滚动进度，使用 Framer Motion 的 spring 动画创建一个平滑的进度条动画效果
 * Used to display page scroll progress, utilizing Framer Motion spring animation
 * to create a smooth progress bar animation effect
 */
export function ScrollProgress({ scrollYProgress, color, height = 4, ...rest }: Props) {
  /**
   * 使用 spring 动画使进度条变化更平滑
   * Use spring animation to make the progress bar transition smoother
   */
  const scaleX = useSpring(scrollYProgress, {
    /**
     * 弹簧刚度
     * Spring stiffness
     */
    stiffness: 100,

    /**
     * 阻尼系数
     * Damping coefficient
     */
    damping: 30,

    /**
     * 停止动画的阈值
     * Threshold to stop the animation
     */
    restDelta: 0.001
  });

  const { themeTokens } = useTheme();

  /**
   * 设置进度条颜色，优先使用传入的 color，否则使用主题主色
   * Set the progress bar color, prefer the provided color,
   * otherwise fallback to the theme primary color
   */
  const backgroundColor = color ?? themeTokens.color.palette.primary.default;

  /**
   * 配置进度条样式
   * Configure progress bar styles
   */
  const style: CSSProperties = {
    /**
     * 设置变换原点在左侧，使 scaleX 从左向右增长
     * Set transform origin to the left so scaleX grows from left to right
     */
    transformOrigin: '0%',

    /**
     * 进度条高度
     * Progress bar height
     */
    height,

    /**
     * 背景颜色
     * Background color
     */
    backgroundColor
  };

  return <m.div style={{ scaleX, ...style }} {...rest} />;
}
