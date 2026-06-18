import { type ComponentProps } from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';
import { cn } from '@/utils';
import { popoverContentVariants } from './popover.style';

/**
 * Popover 根组件
 * - 负责管理浮层的打开与关闭状态
 * - 本身不渲染具体 UI，只提供 Radix Popover 上下文
 *
 * Popover root component
 * - Manages the open and closed state of the floating layer
 * - Does not render visible UI by itself, only provides the Radix Popover context
 */
function Popover({ ...props }: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/**
 * Popover 触发器
 * - 用于绑定打开浮层的触发元素
 * - 通常通过 asChild 包裹按钮、图标或其它可交互元素
 *
 * Popover trigger
 * - Binds the element that opens the floating layer
 * - Usually wraps a button, icon, or other interactive element through asChild
 */
function PopoverTrigger({ ...props }: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/**
 * Popover 内容区域
 * - 使用 Portal 渲染，避免被父级 overflow 或 z-index 影响
 * - 集中应用浮层尺寸、主题、阴影和方向感知动画
 *
 * Popover content
 * - Rendered in a portal to avoid parent overflow or z-index issues
 * - Applies shared size, theme, shadow, and side-aware animation styles
 */
function PopoverContent({ className, align = 'center', sideOffset = 4, ...props }: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(popoverContentVariants(), className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/**
 * Popover 锚点
 * - 用于指定浮层定位参考元素
 * - 当触发器和定位目标不是同一个元素时使用
 *
 * Popover anchor
 * - Defines the reference element used for floating layer positioning
 * - Useful when the trigger and positioning target are different elements
 */
function PopoverAnchor({ ...props }: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
