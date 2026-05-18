import type { ComponentProps } from 'react';
import { cn } from '@/utils';
import { textareaVariants } from './style';

function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(textareaVariants(), className)} {...props} />;
}

export { Textarea };
