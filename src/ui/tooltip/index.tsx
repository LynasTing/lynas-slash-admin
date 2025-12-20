/**
 * Tooltip 组件封装（基于 Radix UI）
 *
 * 统一了：
 * - Provider 的使用方式
 * - 默认延迟策略
 * - Content / Arrow 的样式与动画
 * - data-slot 标记，便于调试和样式定位
 *
 * This file wraps Radix Tooltip primitives to provide:
 * - A consistent provider setup
 * - Unified delay behavior
 * - Centralized styles and animations
 * - data-slot attributes for debugging and styling
 *
 */

import { ComponentProps } from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { contentVariants, arrowVariants } from './style';
import { cn } from '@/utils';

/**
 * TooltipProvider
 *
 * 用于提供 Tooltip 的全局上下文配置（如延迟时间）
 * 通常不需要单独使用，而是由 Tooltip 组件内部自动包裹。
 *
 * - delayDuration 默认设置为 0，保证即时响应
 * - data-slot 用于调试或样式定位
 *
 * TooltipProvider supplies global configuration for tooltips,
 * such as delay duration before showing.
 * It is automatically injected by the Tooltip component.
 */
function TooltipProvider({ delayDuration = 0, ...props }: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

/**
 * Tooltip
 *
 * Tooltip 的根组件（Root）
 * 负责：
 * - 创建 Tooltip 上下文
 * - 自动包裹 TooltipProvider
 *
 *
 * Tooltip root component.
 * It automatically wraps Radix Tooltip Root
 * with a TooltipProvider to ensure consistent behavior.
 */
function Tooltip({ ...props }: ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * TooltipTrigger
 *
 * Tooltip 的触发元素：
 * - hover
 * - focus
 * - keyboard interaction
 *
 * 该组件本身不包含任何样式，
 * 只负责行为绑定。
 *
 * TooltipTrigger defines the element
 * that triggers the tooltip.
 * Styling should be applied by the consumer.
 */
function TooltipTrigger({ ...props }: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/**
 * TooltipContent
 *
 * Tooltip 的实际展示内容区域：
 * - 使用 Portal 渲染，避免被父级 overflow / z-index 影响
 * - 内置动画、主题样式、方向感知
 * - 自动渲染 Tooltip Arrow
 *
 * Tooltip content component:
 * - Rendered inside a Portal
 * - Applies shared animation and theme styles
 * - Includes a styled arrow by default
 */
function TooltipContent({ className, sideOffset = 0, children, ...props }: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content data-slot="tooltip-content" sideOffset={sideOffset} className={cn(contentVariants, className)} {...props}>
        {children}
        <TooltipPrimitive.Arrow className={cn(arrowVariants)} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
