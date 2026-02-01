import { ComponentProps } from 'react';
import { cn } from '@/utils';
import { Separator as SeparatorPrimitive } from 'radix-ui';
import { separatorVariants } from './style';

export default function Separator({ className, orientation, decorative = true, ...props }: ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({
          orientation
        }),
        className
      )}
      {...props}
    />
  );
}
