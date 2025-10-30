import * as React from 'react';
import { cn } from '@/utils';
import { inputVariants } from './style';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(inputVariants, className)} {...props} />;
}

export { Input };
