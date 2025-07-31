import * as React from 'react';
import { Slot as SlotPrimitive } from 'radix-ui';
import { cn } from '@/utils';
import { buttonVariants } from './button.css';
import type { ButtonProps } from './button.types';

/**
 * React.forwardRef() 给函数组件透传 ref，允许父组件直接操作子组件里的真实DOM, 或者子组件暴露的某个实例
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      /**
       * 外部传入的类型
       * External type
       */
      className,

      /**
       * 按钮样式的变体
       * Button style variant
       */
      variant,

      /**
       * 尺寸变体
       * Size variant
       */
      size,

      /**
       * 是否启用 Slot 插槽 （会渲染成其它任意传入的标签）
       * Render Button as any custom component
       */
      asChild = false,

      /**
       * 其它属性，如 type、disabled、onClick 等
       * Other attributes, such as type, disabled, onClick, etc.
       */
      ...props
    },

    /**
     * 透传的 ref，方便父组件直接操作子组件里的真实DOM
     * Forwarded ref, so that the parent component can directly operate the real DOM of the child component
     */
    ref
  ) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

/**
 * 方便调试，不设置默认是 Anonymous
 */
Button.displayName = 'Button';

export { Button };
