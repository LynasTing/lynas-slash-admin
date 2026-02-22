import styled from 'styled-components';
import { Tabs } from 'antd';
import { useMultiTabsContext } from './providers/multi-tabs.hook';
import SortableContainer from './components/sortable-container';
import { CSSProperties, useEffect, useRef } from 'react';
import { rgbAlpha } from '@/utils';
import { themeVars } from '@/theme/theme.css';
import MultiTabItem from './components/tab-item';
import MultiTabSortableItem from './components/sortable-items';
import { KeepAliveTab } from './types';
import { useNavigate } from 'react-router';

/**
 * Styled 组件，限制 MultiTabs 的样式作用域
 * limit the scope of MultiTabs styles
 */
const StyledMultiTabs = styled.div`
  height: 100%;
  margin-top: 2px;
  .actiion {
    margin: 0px !important;
  }
  .ant-tabs {
    height: 100%;
    .ant-tabs-content {
      height: 100%;
    }
    .ant-tabs-tabpane {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
  }
  .hide-scrollbar {
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    will-change: transform;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

/**
 * Tabs 外层样式，用 JS 动态计算背景和固定定位
 * calculate the background and fixed position of Tabs using JS
 */
const tabsStyle: CSSProperties = {
  position: 'fixed',
  right: 0,
  width: '100%',
  backgroundColor: rgbAlpha(themeVars.colors.background.default, 0.9),
  transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
};

export default function MultiTabs() {
  const { tabs, activeTabRoutePath, setTabs } = useMultiTabsContext();

  /**
   * 拖拽排序结束处理
   * Handle drag-and-drop sorting end
   */
  const handleDragEnd = (oldIdx: number, newIdx: number) => {
    /** 复制 tabs / copy tabs */
    const newTabs = Array.from(tabs);
    /** 删除旧位置的 tab，splice 返回的是数组，解构取单个元素 / remove tab from old position, splice returns an array, destructuring a single element */
    const [removedTab] = newTabs.splice(oldIdx, 1);
    /** 在新位置添加旧位置的 tab / add tab to new position */
    newTabs.splice(newIdx, 0, removedTab);
    /** 更新 tabs / update tabs */
    setTabs(newTabs);
  };

  /**
   * 拖拽 overlay 渲染
   * Render overlay during drag
   */
  const handleRenderOverlay = (id: string | number) => {
    const tab = tabs.find(i => i.key === id);
    if (!tab) return null;

    return <MultiTabItem tab={tab} />;
  };

  /** 滚动容器 ref / ref for scroll container */
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  /**
   * 处理滚动区域的横向滚动
   */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    /**
     * 鼠标滚动时，让滚动容器滚动
     * When the mouse scrolls, let the scroll container scroll
     */
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    /**
     * 添加滚动事件
     * Add scroll event
     *
     * passive - 不阻止默认行为
     * passive - Do not prevent default behavior
     */
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  /**
   * 滚动到当前激活的 tab
   * Scroll to the current active tab
   */
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const tab = tabs.find(i => i.key === activeTabRoutePath);
    if (!tab) return;

    const currentTabEl = scrollContainerRef.current.querySelector(`#tabs${tab.key.split('/').join('-')}`);
    if (currentTabEl) {
      currentTabEl.scrollIntoView({
        /** 滚动到最近的元素 / scroll to the nearest element */
        block: 'nearest',
        /** 平滑滚动 / smooth scroll */
        behavior: 'smooth'
      });
    }
  }, [tabs, activeTabRoutePath]);

  const navigate = useNavigate();

  /**
   * 点击 tab 时，切换路由
   * Click the tab to switch the route
   */
  const handleSortableItemClick = ({ key }: KeepAliveTab) => {
    navigate(key);
  };

  return (
    <StyledMultiTabs>
      <Tabs
        size="small"
        type="card"
        tabBarGutter={4}
        activeKey={activeTabRoutePath}
        items={tabs.map(i => ({
          ...i,
          children: <div key={i.timeStamp}>{i.children}</div>
        }))}
        renderTabBar={() => (
          <div style={tabsStyle}>
            <SortableContainer items={tabs} onSortEnd={handleDragEnd} renderOverlay={handleRenderOverlay}>
              <ul ref={scrollContainerRef} className="flex w-full h-[32px] px-2 overflow-x-auto hide-scroll-bar">
                {tabs.map(i => (
                  <MultiTabSortableItem key={i.key} tab={i} onClick={() => handleSortableItemClick(i)} />
                ))}
              </ul>
            </SortableContainer>
          </div>
        )}
      />
    </StyledMultiTabs>
  );
}
