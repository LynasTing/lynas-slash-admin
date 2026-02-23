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
export function NavHorizaontalLayout({ data }: NavProps) {
  return (
    <nav
      data-slot="lynas-slash-layout-nav"
      className="sticky left-0 right-0 grow-0 shrink-0 top-(--layout-header-height) w-full z-app-bar bg-background">
      <ScrollArea>
        <NavHorizontal data={data} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}
