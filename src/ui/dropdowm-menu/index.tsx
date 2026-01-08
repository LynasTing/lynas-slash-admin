import { ComponentProps } from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import {
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  dropdownMenuCheckboxItemVariants,
  dropdownMenuRadioItemVariants,
  dropdownMenuSubTriggerVariants,
  dropdownMenuSubContentVariants
} from './style';
import { cn } from '@/utils';
import { CheckIcon, CircleIcon, ChevronRightIcon } from 'lucide-react';

/**
 * DropdownMenu 根组件
 *
 * @description
 * 负责下拉菜单的整体状态管理，包括：
 * - 打开与关闭状态
 * - 焦点管理
 * - 键盘交互与可访问性行为
 *
 * 所有 DropdownMenu 相关子组件必须作为其后代存在，
 * 以确保状态与交互逻辑正常工作。
 *
 * 使用场景：
 * - 任意下拉菜单结构的最外层容器
 *
 * Root component for the dropdown menu.
 *
 * @description
 * Manages the overall state of the dropdown menu, including:
 * - Open and close status
 * - Focus management
 * - Keyboard interactions and accessibility behavior
 *
 * All DropdownMenu related sub-components must exist as its children,
 * to ensure the state and interaction logic work correctly.
 */
function DropdownMenu({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

/**
 * DropdownMenuContent 内容组件
 *
 * @param className - 自定义样式类
 * @param sideOffset - 内容与触发器之间的间距，默认 4px
 *
 * @description
 * 渲染下拉菜单的可见内容区域，通过 Portal 挂载至 document.body。
 * 避免被父级布局影响，如 overflow:hidden 或定位上下文。
 *
 * 样式和动画由 dropdownMenuContentVariants 管理，保证不同实例视觉统一。
 *
 * Usage scenario:
 * - Render the visible area of the dropdown menu
 * - Avoid layout restrictions by mounting via Portal
 */
function DropdownMenuContent({ className, sideOffset = 4, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(dropdownMenuContentVariants(), className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * DropdownMenuItem 菜单项组件
 *
 * @param inset - 左侧缩进，用于图标或层级对齐
 * @param variant - 菜单项类型：default | destructive
 *
 * @description
 * 表示一个可交互菜单项，用于触发操作，如编辑、删除、跳转等。
 * variant 区分普通操作和高风险操作，样式与业务逻辑解耦。
 *
 * Usage scenario:
 * - Trigger specific actions within dropdown
 */
function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & { inset?: boolean; variant?: 'default' | 'destructive' }) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(dropdownMenuItemVariants(), className)}
      {...props}
    />
  );
}

/**
 * DropdownMenuTrigger 触发器组件
 *
 * @description
 * 用于触发 DropdownMenu 显示与隐藏。
 * 可以包裹按钮、图标或任意可交互元素。
 *
 * Usage scenario:
 * - Wrap interactive elements that trigger dropdown
 */
function DropdownMenuTrigger({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

/**
 * DropdownMenuGroup 分组组件
 *
 * @description
 * 用于逻辑分组菜单项，提升结构清晰度与可访问性。
 *
 * Usage scenario:
 * - Group related menu items in complex menus
 */
function DropdownMenuGroup({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

/**
 * DropdownMenuCheckboxItem 复选菜单项组件
 *
 * @param checked - 当前选中状态
 *
 * @description
 * 可独立开关的选项，如设置开关。
 * 内部使用 ItemIndicator 渲染选中标识，键盘与可访问性由 Radix 管理。
 *
 * Usage scenario:
 * - Toggleable options inside dropdown
 */
function DropdownMenuCheckboxItem({ className, checked, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(dropdownMenuCheckboxItemVariants(), className)}
      checked={checked}
      {...props}>
      <span className="absolute left-2 flex justify-center items-center size-3.5 pointer-events-none">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/**
 * DropdownMenuRadioGroup 单选分组组件
 *
 * @description
 * 包裹 RadioItem，保证同一时间只有一个选项被选中。
 *
 * Usage scenario:
 * - Mutually exclusive selection within dropdown
 */
function DropdownMenuRadioGroup({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

/**
 * DropdownMenuRadioItem 单选菜单项组件
 *
 * @description
 * RadioGroup 的子节点，表示一个可选项。
 * 用于互斥选项选择场景，如模式、策略、排序方式。
 *
 * Usage scenario:
 * - Represent one choice in a mutually exclusive group
 */
function DropdownMenuRadioItem({ className, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(dropdownMenuRadioItemVariants(), className)}
      {...props}>
      <span className="absolute left-2 flex justify-center items-center size-3.5">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/**
 * DropdownMenuLabel 标签组件
 *
 * @param inset - 左侧缩进
 *
 * @description
 * 展示分组标题或说明文本，不具备交互行为。
 *
 * Usage scenario:
 * - Label or description for grouped menu items
 */
function DropdownMenuLabel({ className, inset, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn('px-2 py-1.5 text-sm font-medium data-inset:pl-8', className)}
      {...props}
    />
  );
}

/**
 * DropdownMenuSeparator 分隔线组件
 *
 * @description
 * 用于视觉分隔不同功能区域，提升菜单结构可读性。
 *
 * Usage scenario:
 * - Visually separate sections in dropdown
 */
function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

/**
 * DropdownMenuShortcut 快捷键提示组件
 *
 * @description
 * 在菜单项右侧展示快捷键提示，仅用于展示，不绑定逻辑。
 *
 * Usage scenario:
 * - Show keyboard shortcuts next to menu items
 */
function DropdownMenuShortcut({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
}

/**
 * DropdownMenuSub 子菜单容器组件
 *
 * @description
 * 管理子菜单展开状态，通常配合 SubTrigger 和 SubContent 使用。
 *
 * Usage scenario:
 * - Wrap sub-menu items and manage open state
 */
function DropdownMenuSub({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

/**
 * DropdownMenuSubTrigger 子菜单触发项组件
 *
 * @param inset - 左侧缩进
 *
 * @description
 * 表现形式类似普通菜单项，用于触发子菜单展开。
 * 右侧图标提示存在二级菜单。
 *
 * Usage scenario:
 * - Trigger a sub-menu inside dropdown
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(dropdownMenuSubTriggerVariants(), className)}
      {...props}>
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/**
 * DropdownMenuSubContent 子菜单内容组件
 *
 * @description
 * 渲染子菜单具体内容，Radix 内部管理定位与展开逻辑。
 *
 * Usage scenario:
 * - Display sub-menu content inside dropdown
 */
function DropdownMenuSubContent({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(dropdownMenuSubContentVariants(), className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
};
