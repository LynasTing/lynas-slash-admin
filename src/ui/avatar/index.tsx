import { ComponentProps } from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { cn } from '@/utils';

/**
 * Avatar 根组件
 * Avatar root container
 *
 * - 负责整体尺寸、圆角、裁剪
 * - Controls size, shape, and clipping
 */
function Avatar({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn('relative flex shrink-0 size-8 rounded-full overflow-hidden', className)}
      {...props}
    />
  );
}

/**
 * Avatar 图片组件
 * Avatar image component
 *
 * - 实际展示头像图片
 * - Renders the actual avatar image
 */
function AvatarImage({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn('aspect-square size-full', className)} {...props} />;
}

/**
 * Avatar 兜底组件
 * Avatar fallback component
 *
 * - 图片加载失败或未提供时显示
 * - Displayed when image fails or is missing
 */
function AvatarFallback({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn('flex justify-center items-center size-full bg-muted rounded-full', className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
