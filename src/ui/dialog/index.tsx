import { ComponentProps } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { dialogContentVriants, dialogOverlayVriants, dialogCloseVriants } from './style';
import { cn } from '@/utils';
import { XIcon } from 'lucide-react';

/**
 * Dialog 根组件
 * - 用途：Dialog 的状态容器，负责 open / close 状态管理
 * - 本身不渲染任何 DOM，仅作为上下文提供者
 *
 * Dialog root component
 * - Purpose: Acts as the state container for the dialog, managing open / close state
 * - Does not render any DOM element itself, only provides context
 *
 * @example
 * <Dialog>
 *   <DialogTrigger />
 *   <DialogContent />
 * </Dialog>
 */
function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * Dialog 触发器
 * - 用途：用于打开 Dialog 的触发元素
 * - 通常包裹按钮或可点击元素
 *
 * Dialog trigger
 * - Purpose: Used as the trigger element to open the dialog
 * - Usually wraps a button or clickable element
 *
 * @example
 * <DialogTrigger asChild>
 *   <Button>Open</Button>
 * </DialogTrigger>
 */
function DialogTrigger({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * Dialog Portal
 * - 用途：将 Dialog 内容渲染到 document.body（或指定容器）
 * - 避免被父级 overflow / z-index 影响
 *
 * Dialog portal
 * - Purpose: Renders dialog content into a portal (usually document.body)
 * - Prevents issues with parent overflow or z-index
 */
function DialogPortal({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * Dialog 关闭组件（对外）
 * - 用途：提供给使用者手动关闭 Dialog
 * - 常用于 footer 的“取消 / 关闭”按钮
 *
 * Dialog close (public)
 * - Purpose: Exposed close component for consumers
 * - Commonly used in footer actions like Cancel / Close
 *
 * @example
 * <DialogClose asChild>
 *   <Button variant="ghost">Cancel</Button>
 * </DialogClose>
 */
function DialogClose({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * Dialog 遮罩层
 * - 用途：覆盖页面背景，阻止与页面其他内容交互
 * - 通常伴随淡入淡出动画
 *
 * Dialog overlay
 * - Purpose: Covers the background and blocks interaction with the page
 * - Usually includes fade-in / fade-out animations
 */
function DialogOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cn(dialogOverlayVriants(), className)} {...props} />;
}

/**
 * Dialog 内容区域
 * - 用途：Dialog 的主体容器
 * - 内部自动包含 Overlay 和右上角关闭按钮
 *
 * Dialog content
 * - Purpose: Main container of the dialog
 * - Automatically includes overlay and a built-in close button
 *
 * @example
 * <DialogContent>
 *   <DialogHeader />
 *   <DialogFooter />
 * </DialogContent>
 */
function DialogContent({ className, children, ...props }: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content data-slot="dialog-content" className={cn(dialogContentVriants(), className)} {...props}>
        {children}

        {/* 内置关闭按钮，仅供 DialogContent 内部使用 */}
        <DialogPrimitive.Close className={cn(dialogCloseVriants(), className)}>
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * Dialog 头部区域
 * - 用途：用于放置标题和描述
 * - 默认纵向排列，在小屏下居中显示
 *
 * Dialog header
 * - Purpose: Container for title and description
 * - Stacks vertically and centers content on small screens
 */
function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />;
}

/**
 * Dialog 底部区域
 * - 用途：用于放置操作按钮（确认 / 取消等）
 * - 小屏下反向排列，大屏下右对齐
 *
 * Dialog footer
 * - Purpose: Container for action buttons (Confirm / Cancel)
 * - Reversed order on small screens, right-aligned on larger screens
 *
 * @example
 * <DialogFooter>
 *   <Button variant="ghost">Cancel</Button>
 *   <Button>Confirm</Button>
 * </DialogFooter>
 */
function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />;
}

/**
 * Dialog 标题
 * - 用途：Dialog 的主标题
 * - 语义化标签，提升可访问性
 *
 * Dialog title
 * - Purpose: Main title of the dialog
 * - Semantic element for better accessibility
 */
function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn('text-lg leading-none font-semibold', className)} {...props} />;
}

/**
 * Dialog 描述文本
 * - 用途：补充说明 Dialog 的内容或用途
 * - 通常位于标题下方
 *
 * Dialog description
 * - Purpose: Provides additional explanation for the dialog
 * - Usually displayed below the title
 */
function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description data-slot="dialog-descrition" className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
};
