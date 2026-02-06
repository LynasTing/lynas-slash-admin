import { useState, type CSSProperties } from 'react';
import CyanBlurIMG from '@/assets/images/background/cyan_blur.png';
import RedBlurIMG from '@/assets/images/background/red_blur.png';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import { Badge } from '@/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/ui/sheet';
import useLocale from '@/locales/use-locale';
import NoticeTabs from './notice-tabs';

export default function NoticePanel() {
  /** 控制弹窗是否打开 */
  const [drawerOpen, setDrawerOpen] = useState(false);
  /** 未读数量 */
  const [count, setCount] = useState(999);

  const { t } = useLocale();

  const sheetContentStyle: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlurIMG}"), url("${RedBlurIMG}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50%, 50%'
  };

  return (
    <>
      <div className="relative" onClick={() => setDrawerOpen(true)}>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setDrawerOpen(true)}>
          <Icon icon="solar:bell-bing-bold-duotone" size={24} />
        </Button>
        <Badge variant="destructive" shape="circle" className="absolute -right-2 -top-2">
          {count}
        </Badge>
      </div>
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="right" className="flex flex-col p-0 sm:max-w-md [&>button]:hidden" style={sheetContentStyle}>
          <SheetHeader className="flex justify-between items-center shrink-0  h-16 p-4 ">
            <SheetTitle>{t('sys.settings.notifications')}</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary"
              onClick={() => {
                setCount(0);
                setDrawerOpen(false);
              }}>
              <Icon icon="solar:check-read-broken" size={20} />
            </Button>
          </SheetHeader>
          <div className="flex-1 px-4 overflow-hidden">
            <NoticeTabs />
          </div>
          <SheetFooter className="flex justify-between items-center shrink-0 w-full h-16 p-4 ">
            <Button variant="outline" className="flex-1 mr-2">
              {t('sys.settings.archiveAll')}
            </Button>
            <Button className="flex-1 ml-2">{t('sys.settings.markAllAsRead')}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
