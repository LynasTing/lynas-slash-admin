import { cn } from '@/utils';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';
import { radioGroupVariants, radioGroupItemVariants, radioGroupIndicatorVariants, radioGroupIconVariants } from './style';
import { CircleIcon } from 'lucide-react';

function RadioGroup({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn(radioGroupVariants, className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item data-slot="radio-group-item" className={cn(radioGroupItemVariants(), className)} {...props}>
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className={cn(radioGroupIndicatorVariants())}>
        <CircleIcon className={cn(radioGroupIconVariants())} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
