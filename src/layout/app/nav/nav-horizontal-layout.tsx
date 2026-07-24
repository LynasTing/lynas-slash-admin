import type { NavProps } from '@/components/nav/types';
import { ScrollArea, ScrollBar } from '@/ui/scroll-area';
import { NavHorizontal } from '@/components/nav/horizontal';

/**
 * 水平导航布局组件
 * 包裹 NavHorizontal 并提供横向滚动支持
 *
 * Horizontal navigation layout component
 * Wraps NavHorizontal and provides horizontal scroll
 */
export function NavHorizontalLayout({ data }: NavProps) {
  return (
    <nav
      data-slot="lynas-slash-nav-layout-vertical"
      className="sticky top-(--layout-header-height) right-0 left-0 z-app-bar w-full shrink-0 grow-0 bg-background">
      <ScrollArea>
        <NavHorizontal data={data} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}
