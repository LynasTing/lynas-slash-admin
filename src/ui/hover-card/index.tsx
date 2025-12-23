import { ComponentProps } from 'react';
import { HoverCard as HoverCardPrimitive } from 'radix-ui';
import { contentVariants } from './style';
import { cn } from '@/utils';

/**
 * HoverCard 根组件
 * HoverCard root component
 *
 * - 负责管理 HoverCard 的整体状态（打开 / 关闭）
 * - Does not render UI, only controls state
 */
function HoverCard({ ...props }: ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

/**
 * HoverCard 触发器
 * HoverCard trigger
 *
 * - 用户 hover 的目标元素
 * - The element that triggers the hover card
 * - 支持任意子元素（文本、图标等）
 */
function HoverCardTrigger({ ...props }: ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

/**
 * HoverCard 内容区
 * HoverCard content
 *
 * - 实际显示的浮层内容
 * - The floating panel content
 * - 使用 Portal 渲染，避免被父级 overflow / z-index 影响
 * - Rendered in a portal to avoid layout clipping
 *
 */
function HoverCardContent({ className, sideOffset = 4, align = 'center', ...props }: ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(contentVariants, className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
