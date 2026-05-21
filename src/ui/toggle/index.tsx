import { Toggle as TogglePrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { toggleVariants } from './style';
import { cn } from '@/utils';

type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>;

/**
 * Toggle 组件
 * - 基于 Radix Toggle 的切换按钮组件，支持不同变体与尺寸
 *
 * Toggle component
 * - Toggle button component based on Radix Toggle, supporting multiple variants and sizes
 */
export function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({
          variant,
          size
        }),
        className
      )}
      {...props}
    />
  );
}
