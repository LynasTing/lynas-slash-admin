import * as React from 'react';
import { cn } from '@/utils';
import { Slot as SlotPrimitive } from 'radix-ui';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './style';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * React.forwardRef
 * - 接收一个带 ref 参数的函数组件
 * - 返回一个支持 ref 的 React 组件
 *
 * <HTMLButtonElement, ButtonProps>
 * - ref 指向什么 DOM 元素
 * - props 的类型
 *
 * (props, ref) 组件函数签名, forwardRef 会自动注入 ref
 *
 * @returns <ForwardRefExoticComponent> 一个带 ref 能力的组件
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';
  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          className
        })
      )}
      ref={ref}
      {...props}
    />
  );
});

/**
 * 命名组件
 * - 用于 DevTools 调试 + 提示消息更友好，不影响功能和类型。
 */
Button.displayName = 'Button';

export { Button };
