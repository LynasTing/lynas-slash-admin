import Logo from '@/components/logo';
import SettingPanel from './setting-panel';

export default function HeaderSimple() {
  return (
    <header className="flex justify-between items-center  w-full h-16   px-6">
      <Logo size={30} />
      <SettingPanel />
    </header>
  );
}
