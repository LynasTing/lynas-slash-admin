import { cn } from '@/utils';
import { Select as SelectPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';
import { selectTriggerVariants, selectContentVariants, selectViewportVariants, selectItemVariants } from './style';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from 'lucide-react';

/**
 * Select 根组件 / Select root component
 *
 * @description
 * 对 Radix Select.Root 的简单封装，
 * 主要用于统一 data-slot 标识，方便样式控制与调试。
 *
 * Thin wrapper around Radix Select.Root,
 * mainly used to attach a consistent data-slot
 * for styling and debugging purposes.
 */
function Select({ ...props }: ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

/**
 * Select 分组组件 / Select group component
 *
 * @description
 * 用于对选项进行逻辑分组，
 * 通常与 SelectLabel 配合使用。
 *
 * Groups related select items together,
 * typically used with SelectLabel.
 */
function SelectGroup({ ...props }: ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

/**
 * Select 值展示组件 / Select value display
 *
 * @description
 * 用于显示当前选中的值，
 * 通常作为 Trigger 的子节点使用。
 *
 * Displays the selected value,
 * typically used inside SelectTrigger.
 */
function SelectValue({ ...props }: ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

/**
 * Select 触发器 / Select trigger component
 *
 * @description
 * 控制下拉菜单的打开与关闭，
 * 支持多尺寸（sm / md / lg / xl）。
 *
 * Controls opening and closing of the dropdown,
 * supports multiple size variants.
 */
function SelectTrigger({
  className,
  size = 'md',
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/**
 * Select 向上滚动按钮 / Scroll up button
 *
 * @description
 * 当选项超出可视区域时，
 * 用于向上滚动列表。
 *
 * Scrolls the list upward when overflow occurs.
 */
function SelectScrollUpButton({ className, ...props }: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex justify-center items-center cursor-default py-1', className)}
      {...props}>
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * Select 向下滚动按钮 / Scroll down button
 *
 * @description
 * 当选项超出可视区域时，
 * 用于向下滚动列表。
 *
 * Scrolls the list downward when overflow occurs.
 */
function SelectScrollDownButton({ className, ...props }: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex justify-center items-center cursor-default py-1', className)}
      {...props}>
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

/**
 * Select 内容容器 / Select content container
 *
 * @description
 * 包裹下拉选项列表的核心容器，
 * 负责定位（popper）与动画控制。
 *
 * Main dropdown container responsible for
 * positioning and animation behavior.
 */
function SelectContent({ className, children, position = 'popper', ...props }: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(selectContentVariants({ position }), className)}
        position={position}
        {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={cn(selectViewportVariants({ position }))}>{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/**
 * Select 标签 / Select label
 *
 * @description
 * 用于标识分组或提示文本，
 * 通常配合 SelectGroup 使用。
 *
 * Label for grouping or descriptive text,
 * typically used with SelectGroup.
 */
function SelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label data-slot="select-label" className={cn('px-2 py-1.5 text-xs text-muted-foreground', className)} {...props} />
  );
}

/**
 * Select 选项项 / Select item
 *
 * @description
 * 单个可选项，支持选中状态指示器，
 * 使用 ItemIndicator 展示选中图标。
 *
 * Represents a selectable item,
 * includes an indicator for selected state.
 */
function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item data-slot="select-item" className={cn(selectItemVariants(), className)} {...props}>
      <span className="absolute left-2 flex justify-center items-center size-3.5">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-2 fill-current" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * Select 分隔线 / Select separator
 *
 * @description
 * 用于分隔不同选项组，
 * 提升视觉层次结构。
 *
 * Visual separator between groups of items.
 */
function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
};
