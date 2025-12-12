import { forwardRef, ComponentRef, ComponentPropsWithoutRef } from 'react';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import { cn } from '@/utils';

const ScrollBar = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 p-px',
      orientation === 'horizontal' && 'h-2.5 flex-col p-px',
      className
    )}
    {...props}>
    {/**
     * 滚动条的滑块
     * The scroll thumb.
     */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-500/border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

/**
 * 根组件，整个滚动区域的外层容器，管理 逻辑、坐标、事件、状态
 * Root component, the outer container that manages the logic, coordinates, events, and state for the scroll area.
 */
const ScrollArea = forwardRef<ComponentRef<typeof ScrollAreaPrimitive.Root>, ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>>(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
      {/**
       * Viewport 内容可以滚动的区域
       * The content that can be scrolled.
       */}
      <ScrollAreaPrimitive.Viewport className="w-full h-full rounded-[inherit] block!" asChild>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar className="z-scrollbar " />
      {/**
       * 当既有横向滚动又有纵向滚动时，左下角或右下角通常会出现一个小空白角落
       * Corner 自动为这个角落补一个可控样式的小方块
       *
       * Corner automatically adds a small square to fill in the corner where both horizontal and vertical scrolling are present
       */}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);

ScrollBar.displayName = ScrollAreaPrimitive.Root.displayName;
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export { ScrollBar, ScrollArea };
