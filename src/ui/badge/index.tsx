import { Slot as SlotPrimitive } from 'radix-ui';
import { cn } from '@/utils';
import { badgeVariants } from './style';
import { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';

/**
 * 徽标
 * Badge
 */
function Badge({
  className,
  asChild,
  variant,
  shape,
  ...props
}: ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'span';
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, shape }), className)} {...props} />;
}

export { Badge };
