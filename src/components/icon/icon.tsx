import { cn } from '@/utils';
import { Icon as IconifyIcon } from '@iconify/react';
import type { IconProps as IconifyIconProps } from '@iconify/react';
import type { CSSProperties } from 'react';

interface IconProps extends IconifyIconProps {
  icon: string;
  size?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export default function Icon({ icon, size = '1em', style, color = 'currentColor', className, ...props }: IconProps) {
  // URL图标支持
  // Handle URL SVG
  if (icon.startsWith('url:')) {
    const url = icon.replace('url:', '');
    return <img src={url} style={{ width: size, height: size, color, ...style }} className={cn('inline-block', className)} />;
  }

  // 本地SVG、第三方iconify图标库支持
  // Handle local and third-party icon libraries
  return (
    <IconifyIcon
      icon={icon}
      width={size}
      height={size}
      style={{ width: size, height: size, color, ...style }}
      className={cn('inline-block', className)}
      {...props}
    />
  );
}
