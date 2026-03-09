import type { ReactNode } from 'react';
import { useSettingStoreState } from '@/store/setting';
import { cn } from '@/utils';
import BreadCrumb from '../components/breadcrumb';
import SearchBar from '../components/search-bar';
import LocalePicker from '@/components/locale-picker';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import NoticePanel from '../components/notice';
import SettingPanel from '../components/setting-panel';
import AccountDropdown from '../components/account-dropdown';

export default function Header({ leftSlot }: { leftSlot?: ReactNode }) {
  const { breadcrumb } = useSettingStoreState();

  return (
    <header
      data-slot="lynas-slash-layout-header"
      className={cn(
        'sticky top-0 left-0 right-0 z-app-bar',
        'flex justify-between items-center px-2 shrink-0 grow-0',
        'bg-background/60 backdrop-blur-xl',
        'h-[--layout-header-height]'
      )}>
      <div className="flex items-center">
        {leftSlot}
        <div className="hidden md:block ml-4">{breadcrumb && <BreadCrumb />}</div>
      </div>
      <div className="flex items-center gap-1">
        <SearchBar />
        <LocalePicker />
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => window.open('https://discord.gg/fXemAXVNDa')}>
          <Icon icon="carbon:logo-discord" size={24} />
        </Button>
        <NoticePanel />
        <SettingPanel />
        <AccountDropdown />
      </div>
    </header>
  );
}
