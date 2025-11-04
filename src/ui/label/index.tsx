import * as React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';
import { cn } from '@/utils/index';
import { labelVariants } from './style';

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cn(labelVariants(), className)} {...props} />;
}

export { Label };
