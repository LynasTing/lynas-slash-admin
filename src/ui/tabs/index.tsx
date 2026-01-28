import { ComponentProps } from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { cn } from '@/utils';
import { TabsListVariants, TabsTriggerVariants } from './style';

/**
 * Tabs 根组件
 * 管理 Tabs 的整体状态：当前激活项、焦点控制、键盘导航等
 *
 * Tabs root component
 * Manages overall tab state: active tab, focus handling, and keyboard navigation
 */
function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

/**
 * Tabs 列表容器
 * 用于包裹所有 TabsTrigger，负责布局与整体外观
 *
 * Tabs list container
 * Wraps all TabsTrigger elements and controls layout and appearance
 */
function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn(TabsListVariants(), className)} {...props} />;
}

/**
 * Tabs 触发项
 * 单个标签按钮，用于切换当前激活的内容区域
 *
 * Tabs trigger item
 * A single tab button that switches the active content panel
 */
function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return <TabsPrimitive.Trigger data-slot="tabs-trigger" className={cn(TabsTriggerVariants(), className)} {...props} />;
}

/**
 * Tabs 内容区域
 * 与 TabsTrigger 对应的内容面板，仅在激活时显示
 *
 * Tabs content panel
 * Content area associated with a TabsTrigger, rendered when active
 */
function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
