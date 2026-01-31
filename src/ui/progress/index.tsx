import { ComponentProps } from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cn } from '@/utils';

export default function Progress({ className, value, ...props }: ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(' relative h-2 w-full bg-primary/20 overflow-hidden rounded-full', className)}
      {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="flex-1 w-full h-full bg-primary transition-all"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`
        }}
      />
    </ProgressPrimitive.Root>
  );
}
