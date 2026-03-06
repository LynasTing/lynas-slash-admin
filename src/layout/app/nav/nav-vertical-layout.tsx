import Logo from '@/components/logo';
import { GLOBAL_CONFIG } from '@/config/global';
import { useSettingStoreState, useSettingStoreActions } from '@/store/setting';
import { ThemeLayoutEnum } from '#/enum';
import { cn } from '@/utils';
import type { NavProps } from '@/components/nav';
import type { CSSProperties } from 'react';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import { ScrollArea } from '@/ui/scroll-area';
import { NavMini, NavVertical } from '@/components/nav';

type Props = {
  data: NavProps['data'];
  className?: string;
};

/**
 * 垂直导航栏布局组件，支持完整垂直模式和迷你图标模式切换
 * Vertical navigation layout component, supports toggle between full vertical mode and mini icon mode
 *
 * 主要功能：
 * - 根据 themeLayout 动态调整宽度和内容
 * - 提供一键切换按钮（带图标）
 * - 顶部显示 Logo + 应用名（Mini 模式隐藏名）
 * - 下方渲染 NavVertical 或 NavMini
 *
 * Main features:
 * - Dynamically adjust width and content based on themeLayout
 * - One-click toggle button with icon
 * - Header shows Logo + app name (name hidden in Mini)
 * - Renders NavVertical or NavMini below
 */
export function NavVerticalLayout({ data, className }: Props) {
  // 获取全部设置 / Get full settings
  const settings = useSettingStoreState();

  // 当前布局模式 / Current layout mode
  const { themeLayout } = settings;

  // 获取更新方法 / Get update action
  const { setSettings } = useSettingStoreActions();

  // 导航宽度（CSS变量） / Nav width (CSS var)
  const navWidth = themeLayout === ThemeLayoutEnum.Vertical ? 'var(--layout-nav-width)' : 'var(--layout-nav-width-mini)';

  // 切换 Vertical ↔ Mini / Toggle Vertical ↔ Mini
  const handleToggle = () => {
    setSettings({
      ...settings,
      themeLayout: themeLayout === ThemeLayoutEnum.Vertical ? ThemeLayoutEnum.Mini : ThemeLayoutEnum.Vertical
    });
  };

  // 应用名动态样式（Mini时隐藏） / App name style (hide in Mini)
  const appNameStyle: CSSProperties = {
    opacity: themeLayout === ThemeLayoutEnum.Mini ? 0 : 1,
    maxWidth: themeLayout === ThemeLayoutEnum.Mini ? 0 : 'auto',
    whiteSpace: 'nowrap',
    marginLeft: themeLayout === ThemeLayoutEnum.Mini ? 0 : '8px'
  };

  return (
    <nav
      data-slot="lynas-slash-nav-layout-horizontal"
      className={cn(
        'fixed left-0 inset-y-0 flex-col h-full bg-background border-r border-dashed z-nav transition-[width] duration-300 ease-in-out',
        className
      )}
      style={{ width: navWidth }}>
      {/* 
        头部区域：包含 Logo、应用名、切换按钮
        Header section: contains Logo, app name, toggle button
      */}
      <div
        className={cn('relative flex items-center px-2 py-4 h-[--layout-header-height]', {
          'justify-center': themeLayout === ThemeLayoutEnum.Mini
        })}>
        <div className="flex justify-center items-center">
          <Logo />
          {/* 
            应用名称 - Mini 模式下完全隐藏（opacity + maxWidth 双重控制）
            App name - completely hidden in Mini mode (opacity + maxWidth)
          */}
          <span className="text-xl font-bold transition-all duration-300 ease-in-out" style={appNameStyle}>
            {GLOBAL_CONFIG.appName}
          </span>
        </div>

        {/* 
          模式切换按钮 - 永远半露在右侧边缘外，点击切换布局
          Mode toggle button - always half-exposed outside right edge, click to switch layout
        */}
        <Button variant="outline" size="icon" className="absolute right-0 w-7 h-7 translate-x-1/2" onClick={handleToggle}>
          {themeLayout === ThemeLayoutEnum.Mini ? (
            <Icon icon="lucide:arrow-right-to-line" size={12} />
          ) : (
            <Icon icon="lucide:arrow-left-to-line" size={12} />
          )}
        </Button>
      </div>

      {/* 
        可滚动导航内容区 - 高度占满剩余视口
        Scrollable navigation content area - fills remaining viewport height
      */}
      <ScrollArea className={cn('h-[calc(100vh-var(--layout-header-height))] px-2 bg-background')}>
        {/* 
          根据当前模式渲染对应导航组件
          Render corresponding nav component based on current mode
        */}
        {themeLayout === ThemeLayoutEnum.Mini ? <NavMini data={data} /> : <NavVertical data={data} />}
      </ScrollArea>
    </nav>
  );
}
