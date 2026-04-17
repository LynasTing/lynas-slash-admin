import { useState, useMemo, useEffect } from 'react';
import { breakpointsTokens } from '@/theme/tokens/breakpoint';
import { removePx } from '@/utils';

type MediaQueryConfig = {
  /** 最小宽度 / Min width in pixels */
  minWidth?: number;

  /** 最大宽度 / Max width in pixels */
  maxWidth?: number;

  /** 最小高度 / Min height in pixels */
  minHeight?: number;

  /** 最大高度 / Max height in pixels */
  maxHeight?: number;

  /** 屏幕方向 / Screen orientation */
  orientation?: 'portrait' | 'landscape';

  /** 用户偏好的颜色模式 / User's preferred color scheme */
  prefersColorScheme?: 'dark' | 'light';

  /** 用户希望减少动画 / Whether user prefers reduced motion */
  prefersReducedMotion?: boolean;

  /** 设备像素比 / Device pixel ratio */
  devicePixelRatio?: number;

  /** 指针类型 / Primary pointer type of the device */
  pointerType?: 'coarse' | 'fine';
};

const buildMediaQuery = (config: MediaQueryConfig | string): string => {
  if (typeof config === 'string') return config;

  const conditions = [];

  if (config.minWidth) conditions.push(`(min-width: ${config.minWidth}px)`);
  if (config.maxWidth) conditions.push(`(max-width: ${config.maxWidth}px)`);
  if (config.minHeight) conditions.push(`(min-height: ${config.minHeight}px)`);
  if (config.maxHeight) conditions.push(`(max-height: ${config.maxHeight}px)`);
  if (config.orientation) conditions.push(`(orientation: ${config.orientation})`);
  if (config.prefersColorScheme) conditions.push(`(prefers-color-scheme: ${config.prefersColorScheme})`);
  if (config.prefersReducedMotion) conditions.push('(prefers-reduced-motion: reduce)');
  if (config.devicePixelRatio) conditions.push(`(-webkit-min-device-pixel-ratio: ${config.devicePixelRatio})`);
  if (config.pointerType) conditions.push(`(pointer: ${config.pointerType})`);

  return conditions.join(' and ');
};

/**
 * React hook for handling media queries
 * 处理媒体查询的 React Hook / 用于监听 CSS 媒体查询
 *
 * @param config - Media query configuration object or query string
 *                 媒体查询配置对象或者直接的查询字符串
 * @returns boolean - Returns true if the media query matches
 *                    返回 true 如果当前媒体查询匹配
 *
 * @example
 * // Basic usage - Mobile detection
 * // 基本用法 - 检测移动端
 * const isMobile = useMediaQuery({ maxWidth: 768 });
 *
 * @example
 * // Using predefined breakpoints
 * // 使用预定义断点
 * const isDesktop = useMediaQuery(up('lg'));
 *
 * @example
 * // Complex query - Tablet in landscape mode
 * // 复杂查询 - 平板横屏模式
 * const isTabletLandscape = useMediaQuery({
 *   minWidth: 768,
 *   maxWidth: 1024,
 *   orientation: 'landscape'
 * });
 *
 * @example
 * // User preferences
 * // 用户偏好
 * const isDarkMode = useMediaQuery({ prefersColorScheme: 'dark' });
 * const prefersReducedMotion = useMediaQuery({ prefersReducedMotion: true });
 *
 * @example
 * // Device capabilities
 * // 设备能力检测
 * const isTouchDevice = useMediaQuery({ pointerType: 'coarse' });
 * const isRetina = useMediaQuery({ devicePixelRatio: 2 });
 *
 * @example
 * // Range queries using helpers
 * // 使用辅助函数的范围查询
 * const isTablet = useMediaQuery(between('sm', 'md'));
 *
 * @example
 * // Raw media query string
 * // 直接传入原生媒体查询字符串
 * const isPortrait = useMediaQuery('(orientation: portrait)');
 *
 * @see {@link MediaQueryConfig} for all supported configuration options
 */
export const useMediaQuery = (config: MediaQueryConfig) => {
  // 当前匹配状态 / Current match state
  const [matches, setMatches] = useState(false);

  // 将配置对象转换为 CSS 媒体查询字符串 / Convert config object to CSS media query string
  const mediaQueryString = useMemo(() => buildMediaQuery(config), [config]);

  useEffect(() => {
    // 创建 MediaQueryList 实例 / Create a MediaQueryList instance
    const mediaQuery = window.matchMedia(mediaQueryString);

    // 初始化状态 / Initialize state
    setMatches(mediaQuery.matches);

    // 监听变化的回调 / Callback for media query changes
    const handlerMediaChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    // 兼容新旧 API 添加监听 / Add listener, compatible with old and new browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handlerMediaChange);
    } else {
      mediaQuery.addListener(handlerMediaChange);
    }

    // 清理函数 / Cleanup on unmount
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handlerMediaChange);
      } else {
        mediaQuery.removeListener(handlerMediaChange);
      }
    };
  }, [mediaQueryString]);

  // 返回当前匹配状态 / Return current match state
  return matches;
};

type BreakpointsKeys = keyof typeof breakpointsTokens;

/**
 * 生成一个最小宽度的媒体查询对象
 * Generate a media query object with a minimum width
 *
 * @param key - 断点名称 / Breakpoint key
 * @returns MediaQueryConfig - 包含 minWidth 的媒体查询对象 / Media query object with minWidth
 */
export const up = (key: BreakpointsKeys) => ({
  minWidth: removePx(breakpointsTokens[key])
});

/**
 * 生成一个最大宽度的媒体查询对象
 * Generate a media query object with a maximum width
 *
 * @param key - 断点名称 / Breakpoint key
 * @returns MediaQueryConfig - 包含 maxWidth 的媒体查询对象 / Media query object with maxWidth
 */
export const down = (key: BreakpointsKeys) => ({
  maxWidth: removePx(breakpointsTokens[key]) - 0.05 // 减去0.05px避免断点重叠 / subtract 0.05px to prevent overlapping breakpoints
});

/**
 * 生成一个区间媒体查询对象
 * Generate a media query object for a range between two breakpoints
 *
 * @param start - 起始断点名称 / Start breakpoint key
 * @param end - 结束断点名称 / End breakpoint key
 * @returns MediaQueryConfig - 包含 minWidth 和 maxWidth 的媒体查询对象 / Media query object with minWidth and maxWidth
 */
export const between = (start: BreakpointsKeys, end: BreakpointsKeys) => ({
  minWidth: removePx(breakpointsTokens[start]),
  maxWidth: removePx(breakpointsTokens[end]) - 0.05
});
