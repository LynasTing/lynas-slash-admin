import type { NavProps } from '@/components/nav/types';
import { Sheet, SheetTrigger, SheetContent } from '@/ui/sheet';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import Logo from '@/components/logo';
import { GLOBAL_CONFIG } from '@/config/global';
import { ScrollArea } from '@/ui/scroll-area';
import { NavVertical } from '@/components/nav';

export function NavMobileLayout({ data }: NavProps) {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon icon="local:ic-menu" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="[&>button]:hidden px-2 w-[280px]">
        <div className="flex items-center gap-2 px-2 h-[var-(--layout-header-height)] ">
          <Logo />
          <span className="text-xl font-bold">{GLOBAL_CONFIG.appName}</span>
        </div>
        <ScrollArea className="h-full">
          <NavVertical data={data} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
