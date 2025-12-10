import { Dialog as SheetPrimitive } from 'radix-ui';
import { ComponentProps, ComponentRef, ComponentPropsWithoutRef, forwardRef } from 'react';
import { overlayVariants, contentVariants, closeVariantse } from './style';
import { cn } from '@/utils';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * 根组件 管理打开、关闭、聚焦、键盘导航等状态
 * Root component that manages opening, closing, focusing, and keyboard navigation
 */
function Sheet({ ...props }: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * 触发器 打开弹窗的按钮开关
 * Trigger button to open the dialog
 */
function SheetTrigger({ ...props }: ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * 关闭按钮 关闭弹窗
 * Close button to close the dialog
 */
function SheetClose({ ...props }: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * 将弹窗内容渲染到 body 下，避免 overflow 裁切，兼容无障碍焦点锁
 * Render the dialog content into the body to avoid being clipped, compatible with screen readers
 */
function SheetPortal({ ...props }: ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * 遮罩层
 * Overlay
 */
const SheetOverlay = forwardRef<ComponentRef<typeof SheetPrimitive.Overlay>, ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay ref={ref} data-slot="sheet-overlay" className={cn(overlayVariants(), className)} {...props} />
  )
);

/**
 * 弹窗内容
 * Dialog content
 */
function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  const { t } = useTranslation();
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content data-slot="sheet-content" className={cn(contentVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close className={cn(closeVariantse())}>
          <XIcon className="size-4" />
          <span className="sr-only">{t('common.close')}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * 弹窗头部
 * Dialog header
 */
function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />;
}

/**
 * 弹窗底部
 * Dialog footer
 */
function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />;
}

/**
 * 弹窗标题
 * Dialog title
 */
function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
  return <div data-slot="sheet-title" className={cn('text-foreground font-semibold', className)} {...props} />;
}

/**
 * 弹窗描述
 * Dialog description
 */
function SheetDescription({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) {
  return <div data-slot="sheet-description" className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

export { Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
