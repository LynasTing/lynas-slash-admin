import { Dialog as SheetPrimitive } from 'radix-ui';
import { ComponentProps, ComponentRef, ComponentPropsWithoutRef, forwardRef } from 'react';
import { overlayVariants, contentVariants, closeVariantse } from './style';
import { cn } from '@/utils';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * 根组件，管理打开、关闭、聚焦、键盘导航等状态。
 *
 * `modal` 是 Radix Dialog Root 提供的“模态模式”开关，默认值是 `true`。它控制的不是 Sheet
 * 看起来像不像弹层，而是 Sheet 打开后，页面其余部分是否仍然可以被用户和辅助技术当作可交互区域。
 *
 * 当 `modal` 为 `true` 时，Sheet 表现为标准模态弹窗：
 * - 焦点会被限制在 Sheet 内容内部，Tab 键只会在 Sheet 内循环，不会跳到页面后面的按钮、输入框或菜单；
 * - 页面其它区域会对屏幕阅读器隐藏，读屏用户只会感知当前 Sheet，避免听到背景页面内容；
 * - 外部区域的指针交互会被禁用，用户点击背景不会误触背景页面按钮；
 * - 当前封装里的 `SheetOverlay` 会正常渲染遮罩，用来表达“现在先处理这个 Sheet”；
 * - 适合表单编辑、确认操作、危险操作二次确认、登录/授权等必须先处理完弹层再回到页面的场景。
 *
 * 当 `modal` 为 `false` 时，Sheet 表现为非模态浮层：
 * - 焦点不会被锁在 Sheet 内，用户可以 Tab 到背景页面，也可以直接点击背景页面上的交互元素；
 * - 页面其它区域不会被屏幕阅读器隐藏，辅助技术仍然可以读取背景内容；
 * - Radix 的 Overlay 在非模态模式下不会渲染，所以当前封装里的 `SheetOverlay` 实际不会显示遮罩；
 * - 点击外部区域仍可能触发关闭行为，如果需要阻止关闭，应在 `SheetContent` 上处理 `onInteractOutside`
 *   或相关外部交互事件；
 * - 适合“旁边开一个辅助面板，但主页面仍可继续操作”的场景，例如属性检查器、筛选面板、帮助说明侧栏。
 *
 * 使用示例：
 *
 * ```tsx
 * <Sheet>
 *   <SheetTrigger>打开编辑表单</SheetTrigger>
 *   <SheetContent>这里是必须先处理的内容</SheetContent>
 * </Sheet>
 * ```
 *
 * 上面没有传 `modal`，等同于 `modal={true}`。用户打开 Sheet 后，注意力会被锁在 Sheet 内。
 *
 * ```tsx
 * <Sheet modal={false}>
 *   <SheetTrigger>打开筛选面板</SheetTrigger>
 *   <SheetContent>这里是辅助筛选内容</SheetContent>
 * </Sheet>
 * ```
 *
 * 上面显式传入 `modal={false}`。用户打开 Sheet 后，仍然可以操作背景页面，适合不应该打断主流程的辅助面板。
 *
 * Root component that manages open state, close state, focus behavior, and keyboard navigation.
 *
 * `modal` is the modality switch from Radix Dialog Root, and its default value is `true`. It does not
 * decide whether the Sheet visually looks like an overlay. It decides whether the rest of the page
 * remains an interactive area for users and assistive technologies while the Sheet is open.
 *
 * When `modal` is `true`, the Sheet behaves like a standard modal dialog:
 * - Focus is trapped inside the Sheet content, so Tab cycles within the Sheet instead of moving to
 *   buttons, inputs, or menus behind it;
 * - The rest of the page is hidden from screen readers, so assistive technology users only perceive
 *   the active Sheet instead of the background page;
 * - Pointer interaction outside the Sheet is disabled, which prevents accidental clicks on background
 *   controls;
 * - `SheetOverlay` renders normally in this wrapper, communicating that the user should handle the
 *   Sheet before returning to the page;
 * - This is appropriate for edit forms, confirmations, destructive actions, authentication flows, and
 *   other cases where the user should finish the dialog flow first.
 *
 * When `modal` is `false`, the Sheet behaves like a non-modal layer:
 * - Focus is not trapped inside the Sheet, so users can Tab to the background page or click controls
 *   behind the Sheet directly;
 * - The rest of the page is not hidden from screen readers, so assistive technologies can still read
 *   background content;
 * - Radix does not render Overlay in non-modal mode, so `SheetOverlay` in this wrapper effectively
 *   displays no backdrop;
 * - Interacting outside may still dismiss the Sheet. If that is not desired, handle `onInteractOutside`
 *   or the related outside interaction events on `SheetContent`;
 * - This fits auxiliary panels that should not interrupt the main workflow, such as property inspectors,
 *   filter panels, or help sidebars.
 *
 * Example:
 *
 * ```tsx
 * <Sheet>
 *   <SheetTrigger>Open edit form</SheetTrigger>
 *   <SheetContent>Content that should be handled first</SheetContent>
 * </Sheet>
 * ```
 *
 * Omitting `modal` is the same as `modal={true}`. After opening the Sheet, user attention stays inside it.
 *
 * ```tsx
 * <Sheet modal={false}>
 *   <SheetTrigger>Open filters</SheetTrigger>
 *   <SheetContent>Auxiliary filter content</SheetContent>
 * </Sheet>
 * ```
 *
 * Passing `modal={false}` keeps the background page interactive, which is useful for auxiliary panels
 * that should not block the main workflow.
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
  return <div data-slot="sheet-title" className={cn('font-semibold text-foreground', className)} {...props} />;
}

/**
 * 弹窗描述
 * Dialog description
 */
function SheetDescription({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) {
  return <div data-slot="sheet-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

export { Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
