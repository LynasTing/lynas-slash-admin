import { createContext, useContext, type ComponentProps } from 'react';
import { toggleVariants } from '@/ui/toggle/style';
import type { VariantProps } from 'class-variance-authority';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { toggleGroupVariants, toggleGroupItemVariants } from './style';
import { cn } from '@/utils';

type ToggleVariantsProps = VariantProps<typeof toggleVariants>;

// ToggleGroup 样式上下文 / ToggleGroup style context
const ToggleGroupContext = createContext<ToggleVariantsProps>({
  size: 'default',
  variant: 'default'
});

/**
 * ToggleGroup 组件
 * - 基于 Radix ToggleGroup 的切换按钮组，统一向子项传递变体和尺寸
 *
 * ToggleGroup component
 * - Toggle button group based on Radix ToggleGroup, passing variant and size to items
 */
function ToggleGroup({
  variant,
  size,
  className,
  children,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleVariantsProps) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(toggleGroupVariants(), className)}
      {...props}>
      <ToggleGroupContext.Provider
        value={{
          variant,
          size
        }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

/**
 * ToggleGroupItem 组件
 * - 基于 Radix ToggleGroup Item 的按钮组子项，优先使用自身配置，其次继承按钮组配置
 *
 * ToggleGroupItem component
 * - Toggle group item based on Radix ToggleGroup Item, preferring own props before inherited group props
 */
function ToggleGroupItem({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleVariantsProps) {
  const context = useContext(ToggleGroupContext);

  // 子项变体 / Item variant
  const itemVariant = variant || context.variant;
  // 子项尺寸 / Item size
  const itemSize = size || context.size;

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={itemVariant}
      data-size={itemSize}
      className={cn(
        toggleVariants({
          variant: itemVariant,
          size: itemSize
        }),
        toggleGroupItemVariants(),
        className
      )}
      {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
