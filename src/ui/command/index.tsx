/**
 * Command Palette Component (基于 cmdk 的命令面板封装)
 *
 * 作用说明：
 * 这是一个“键盘优先（Keyboard-first）”的全局命令面板组件，用于在应用中
 * 提供快速搜索、页面跳转和命令执行能力，交互体验类似 VS Code / Raycast 的命令面板。
 *
 * 该组件以 `cmdk` 作为底层逻辑核心，负责：
 * - 输入即过滤（fuzzy search）
 * - 键盘上下导航
 * - 回车触发选中项
 * - 分组、空状态等行为
 *
 * 在此基础上：
 * - 使用 Dialog 作为弹窗容器，控制显示/隐藏
 * - 对 cmdk 的原始组件进行语义化封装（CommandInput / CommandItem / CommandGroup 等）
 * - 统一样式规范，避免在业务层重复写样式
 *
 * 典型使用场景：
 * - 全局搜索（页面 / 功能 / 数据）
 * - 快速路由跳转
 * - 执行应用级操作（如新建、删除、退出登录、切换主题）
 * - 管理后台的快捷操作入口
 *
 * 使用方式：
 * - 通过 <CommandDialog /> 作为入口组件
 * - 在内部组合 CommandInput / CommandList / CommandItem
 * - 配合快捷键（如 Cmd/Ctrl + K）触发打开
 *
 * 设计目标：
 * - 将“高频操作”从复杂 UI 中解放出来
 * - 提升重度键盘用户的操作效率
 * - 作为全局能力存在，而非页面私有组件
 *
 * --------------------------------------------------------------------
 *
 * Command Palette Component (Built on top of cmdk)
 *
 * Purpose:
 * This component provides a keyboard-first command palette for fast
 * searching, navigation, and command execution across the application,
 * similar to the command palette in VS Code or Raycast.
 *
 * It uses `cmdk` as the core engine to handle:
 * - Real-time filtering based on input
 * - Keyboard navigation (↑ ↓ Enter)
 * - Item grouping and empty states
 *
 * On top of that, this layer:
 * - Wraps the palette in a Dialog for modal behavior
 * - Exposes semantic components (CommandInput, CommandItem, etc.)
 * - Centralizes styling to keep usage consistent across the project
 *
 * Common use cases:
 * - Global search
 * - Quick route navigation
 * - App-level actions (logout, create, toggle theme)
 * - Admin dashboard shortcuts
 *
 * Usage:
 * - Use <CommandDialog /> as the main entry
 * - Compose it with CommandInput / CommandList / CommandItem
 * - Typically triggered via a keyboard shortcut (e.g. Cmd/Ctrl + K)
 *
 * Design goal:
 * - Surface high-frequency actions efficiently
 * - Reduce UI navigation friction
 * - Act as a global capability rather than a page-level component
 */
import { ComponentProps } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/utils';
import { commandVriants, commandDialogVriants, commandInputVriants, commandGroupVriants, commandItemVriants } from './style';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from '../dialog';
import { SearchIcon } from 'lucide-react';

/**
 * Command 根组件
 * - 基于 cmdk 的 Command Primitive
 * - 提供命令面板的基础容器与整体样式
 * - 负责包裹所有 Command 子组件（Input / List / Item 等）
 *
 * Command root component
 * - Built on top of cmdk Command primitive
 * - Provides the base container and global styles
 * - Wraps all Command subcomponents (Input / List / Item, etc.)
 */
function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-slot="command" className={cn(commandVriants(), className)} {...props} />;
}

/**
 * Command 弹窗容器
 * - 将 Command 包裹在 Dialog 中，形成命令面板弹窗
 * - 支持自定义 title / description
 * - 适用于全局快捷键唤起（如 ⌘K）
 *
 * Command dialog container
 * - Wraps Command inside a Dialog
 * - Supports custom title / description
 * - Commonly used for global command palettes (e.g. ⌘K)
 */
function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  ...props
}: ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command className={cn(commandDialogVriants())}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Command 搜索输入框
 * - 基于 cmdk Input
 * - 内置搜索图标
 * - 输入内容用于过滤 CommandItem
 *
 * Command search input
 * - Built on top of cmdk Input
 * - Includes a search icon
 * - Input value is used to filter CommandItem results
 */
function CommandInput({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input data-slot="command-input" className={cn(commandInputVriants(), className)} {...props} />
    </div>
  );
}

/**
 * Command 列表容器
 * - 包裹所有 CommandItem / CommandGroup
 * - 控制最大高度与滚动行为
 *
 * Command list container
 * - Wraps CommandItem / CommandGroup components
 * - Controls max height and scroll behavior
 */
function CommandList({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
      {...props}
    />
  );
}

/**
 * 空状态提示
 * - 当没有匹配的命令时显示
 * - 通常用于提示 “No results found”
 *
 * Empty state indicator
 * - Displayed when no command matches the search
 * - Commonly shows messages like "No results found"
 */
function CommandEmpty({ ...props }: ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />;
}

/**
 * Command 分组容器
 * - 用于对命令进行逻辑分组
 * - 支持分组标题（heading）
 *
 * Command group container
 * - Used to logically group commands
 * - Supports group headings
 */
function CommandGroup({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group data-slot="command-group" className={cn(commandGroupVriants(), className)} {...props} />;
}

/**
 * Command 分隔线
 * - 用于分隔不同命令区域
 * - 提升命令列表的可读性
 *
 * Command separator
 * - Visually separates different command sections
 * - Improves readability of the command list
 */
function CommandSeparator({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn('bg-border -mx-1 h-px', className)} {...props} />;
}

/**
 * Command 单条命令项
 * - 表示一个可执行命令
 * - 支持选中、高亮、禁用状态
 * - 可通过 onSelect 触发具体行为
 *
 * Command item
 * - Represents an executable command
 * - Supports selected, highlighted and disabled states
 * - Executes logic via onSelect handler
 */
function CommandItem({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item data-slot="command-item" className={cn(commandItemVriants(), className)} {...props} />;
}

/**
 * Command 快捷键提示
 * - 显示在 CommandItem 右侧
 * - 用于提示对应的键盘快捷键
 *
 * Command shortcut hint
 * - Displayed on the right side of CommandItem
 * - Used to hint associated keyboard shortcuts
 */
function CommandShortcut({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span data-slot="command-shortcut" className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)} {...props} />
  );
}

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem, CommandShortcut };
