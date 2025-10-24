/**
 * @file icon.tsx
 * @description 渲染图标组件
 * @author LynasTing
 * @date 2025-10-24
 */
import { cn } from '@/utils';
import type { IconProps as IconifyIconProps } from '@iconify/react';
import type { CSSProperties } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';

/**
 * Icon name or path
 * 图标名称或路径
 *
 * - Local SVG: `local:icon-name`
 * - URL SVG: `https://example.com/icon.svg`
 * - Third-party icon library: iconify-icon-name
 */
interface IconProps extends IconifyIconProps {
  /**
   * Icon name or path
   * 图标源
   */
  icon: string;
  size?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 *
 * @param param color = 'currentColor',来源于css，让元素继承父元素的文字颜色
 */
export default function Icon({ icon, size = '1em', color = 'currentColor', className = '', style = {}, ...props }: IconProps) {
  /**
   * Handel URL SVG
   * 处理 URL SVG
   */
  if (icon.startsWith('url:')) {
    /**
     * delete path url: prefix
     * 删除路径 url: 前缀
     */
    const url = icon.replace('url:', '');
    return <img alt="icon" src={url} className={cn('inline-block', className)} style={{ width: size, height: size, color, ...style }} />;
  }

  /**
   * Handel local SVG and third-party icon library
   * 处理本地 SVG 和第三方图标库
   */
  return <IconifyIcon icon={icon} width={size} height={size} color={color} className={className} style={style} {...props} />;
}
