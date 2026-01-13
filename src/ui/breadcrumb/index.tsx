import { ComponentProps } from 'react';
import { cn } from '@/utils';
import { Slot as SlotPrimitive } from 'radix-ui';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

/**
 * 纯容器，无样式无逻辑
 * Pure container, no style, no logic.
 */
function Breadcrumb({ ...props }: ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * 面包屑列表，水平排列、间距自适应、换行处理
 * Breadcrumb list, horizontal alignment, adaptive spacing, line wrapping
 */
function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn('flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foregourd sm:gap-2.5', className)}
      {...props}
    />
  );
}

/**
 * 面包屑项，水平排列子元素
 * Breadcrumb item, horizontal alignment of child elements
 */
function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-1.5', className)} {...props} />;
}

/**
 * 面包屑可点击链接
 * asChild 允许传入 <Link> 或其它组件，保持样式
 * Radix Slot 机制：把父样式传给子组件
 *
 * Breadcrumb link
 * asChild allows you to pass in <Link> or other components, preserving styles
 * Radix Slot mechanism: pass parent styles to child components
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? SlotPrimitive.Slot : 'a';
  return <Comp data-slot="breadcrumb-link" className={cn('hover:text-foregound transition-colors', className)} {...props} />;
}

/**
 * 当前页面节点，不可点击，强调当前状态
 * - 表示当前页面所在位置的面包屑项
 * - 不可点击（非交互元素），用于强调当前状态
 * - aria-current="page" 告诉辅助工具（屏幕阅读器）这是当前页面
 * - aria-disabled="true" 明确标记该节点不可交互
 * - role="link" 保持与其他面包屑节点一致的语义结构，即使不可点击
 *
 * Current page node, non-clickable, emphasizing the current status
 * - Represents the position of the current page in the breadcrumb
 * - Non-interactive (non-interactive element), used to highlight the current status
 * - aria-current="page" tells screen readers that this is the current page
 * - aria-disabled="true" explicitly marks the node as non-interactive
 * - role="link" maintains the semantic structure of the breadcrumb nodes, even if they are not clickable
 *
 * Example Usage:
 * <Breadcrumb>
 *   <BreadcrumbItem href="/home">Home</BreadcrumbItem>
 *   <BreadcrumbPage>Current Page</BreadcrumbPage>
 * </Breadcrumb>
 */
function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foregound', className)}
      {...props}
    />
  );
}

/**
 * 面包屑分隔符
 * - 用途：用于在面包屑导航中分割各个节点,默认渲染一个右箭头，可以通过 children 自定义
 * - role="presentation" 表明该元素仅用于展示，不参与交互或辅助功能
 * - aria-hidden="true" 用于告知辅助工具（屏幕阅读器）忽略该元素
 *
 * Breadcrumb separator
 * - Purpose: Used to separate the nodes in the breadcrumb navigation, the default renders a right arrow, you can customize it by passing children
 * - role="presentation" indicates that the element is only used to display, not for interaction or assistive functionality
 * - aria-hidden="true" is used to inform screen readers to ignore the element
 */
function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
  return (
    <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * 面包屑省略号
 * @example 首页 / 分类 / … / 当前页面， … 就是 BreadcrumbEllipsis
 *
 * Breadcrumb ellipsis
 * @example Home / Category / … / Current page, … is BreadcrumbEllipsis
 */
function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex justify-center items-center size-9', className)}
      {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
