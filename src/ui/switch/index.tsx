import { Switch as SwitchPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';
import { switchRootVariants, switchThumbVariants } from './style';
import { cn } from '@/utils';

function Swtich({ className, ...props }: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn(switchRootVariants(), className)} {...props}>
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={cn(switchThumbVariants())} />
    </SwitchPrimitive.Root>
  );
}

export { Swtich };
