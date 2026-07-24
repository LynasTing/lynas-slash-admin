import Main from './main';
import { useFilteredNavData, NavMobileLayout } from './nav';
import Header from '../app/header';
import Logo from '@/components/logo';
import { NavHorizontalLayout, NavVerticalLayout } from './nav';
import { useSettingStoreState } from '@/store/setting';
import { ThemeLayoutEnum } from '#/enum';
import { down, useMediaQuery } from '@/hooks';

/**
 * PC端布局 - 水平导航方式
 * PC Layout - Horizontal Navigation
 */
function PCHorizontalLayout() {
  const navData = useFilteredNavData();

  return (
    <>
      {/* 粘性 Header，左侧显示 Logo / Sticky Header, Logo displayed on the left */}
      <Header leftSlot={<Logo />} />
      {/* 粘性顶部导航条 / Sticky horizontal navigation bar */}
      <NavHorizontalLayout data={navData} />
      {/* 内容区域 / Content area */}
      <Main />
    </>
  );
}

/**
 * PC端布局 - 垂直导航方式
 * PC Layout - Vertical Navigation
 */
function PCVerticalLayout() {
  const navData = useFilteredNavData();
  const { themeLayout } = useSettingStoreState();

  /**
   * 根据导航宽度设置主内容区的左侧 padding
   * --layout-nav-width 正常导航宽度
   * --layout-nav-width-mini 折叠导航宽度
   *
   * Set left padding of main content area based on nav width
   * --layout-nav-width Normal nav width
   * --layout-nav-width-mini Folded nav width
   */
  const mainPaddingLeft = themeLayout === ThemeLayoutEnum.Vertical ? 'var(--layout-nav-width)' : 'var(--layout-nav-width-mini)';

  return (
    <>
      {/* 左侧固定导航 / Fixed navigation on the left */}
      <NavVerticalLayout data={navData} />

      {/* 右侧主内容区域 / Right-side main content area */}
      <div
        className="relative flex min-h-screen w-full flex-col transition-[padding] duration-300 ease-in-out"
        style={{
          paddingLeft: mainPaddingLeft
        }}>
        <Header />
        <Main />
      </div>
    </>
  );
}

/**
 * PC端设备布局
 * PC Device Layout Selector
 */
function PCLayout() {
  const { themeLayout } = useSettingStoreState();
  return themeLayout === ThemeLayoutEnum.Horizontal ? <PCHorizontalLayout /> : <PCVerticalLayout />;
}

/**
 * 移动端设备布局
 * Mobile Device Layout
 */
function MobileLayout() {
  const navData = useFilteredNavData();

  return (
    <>
      {/* 顶部 Header，左侧显示移动端导航 / Top Header, left slot shows mobile navigation */}
      <Header leftSlot={<NavMobileLayout data={navData} />} />
      {/* 内容区域 / Content area */}
      <Main />
    </>
  );
}

/**
 * 应用整体布局入口
 * App Layout Entry
 */
export default function AppLayout() {
  const isMobile = useMediaQuery(down('md'));

  return (
    <div data-slot="lynas-slash-layout-root" className="min-h-screen w-full bg-background">
      {isMobile ? <MobileLayout /> : <PCLayout />}
    </div>
  );
}
