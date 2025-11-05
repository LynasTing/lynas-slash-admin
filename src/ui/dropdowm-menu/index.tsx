import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import * as React from 'react';
import { dropdownMenuContentVariants, dropdownMenuItemVariants } from './style';
import { cn } from '@/utils';

/**
 * 下拉菜单根组件，负责整体状态控制（打开、关闭、聚焦、键盘导航等）
 * DropdownMenu Root Component
 */
function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu " {...props} />;
}

/**
 * 菜单内容区域（即弹出的下拉部分），包含菜单项。
 * DropdownMenuContent Component
 *
 * @param className - 自定义样式类
 * @param sideOffset - 弹出位置与触发器的间距，默认 4px
 * @description
 * 使用 Radix 的 Portal 将内容挂载到 body 下，避免被父元素 overflow 裁切。
 * 应用 dropdownMenuContentVariants 定义的外观与动画。
 */
function DropdownMenuContent({ className, sideOffset = 4, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(dropdownMenuContentVariants, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * DropdownMenuItem Component
 * 菜单项组件，可用于执行操作（如编辑、删除等）。
 *
 * @param className - 自定义样式类
 * @param inset - 是否缩进（通常用于带图标的项）
 * @param variant - 菜单项样式类型（"default" | "destructive"）
 * @description
 * 基于 Radix UI 的 Item 组件封装，支持键盘导航、焦点、禁用、ARIA 可访问性。
 * 应用 dropdownMenuItemVariants 以统一样式。
 */
function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(dropdownMenuItemVariants, className)}
      {...props}
    />
  );
}

/**
 * 菜单触发器组件（按钮、图标等），用于打开或关闭菜单。
 * DropdownMenuTrigger Component
 *
 * @param props - 继承自 Radix UI DropdownMenu.Trigger 的所有属性
 * @description
 * 点击或聚焦触发时会打开对应的 DropdownMenuContent。
 */
function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger };
