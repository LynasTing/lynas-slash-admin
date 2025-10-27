import { cn } from '@/utils';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
// lucide-react React 图标库
import { CheckIcon } from 'lucide-react';
import { checkboxVariants } from './style';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root data-slot="checkbox" className={cn(checkboxVariants(), className)} {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex justify-center items-center text-current transition-none ">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
