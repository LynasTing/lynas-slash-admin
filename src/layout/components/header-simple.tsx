import Logo from '@/components/logo';
import SettingPanel from './setting-panel';

export default function HeaderSimple() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-6">
      <Logo size={30} />
      <SettingPanel />
    </header>
  );
}
