import { useMultiTabsContext } from './providers/multi-tabs.hook';
import SortableContainer from './components/sortable-container';
import { useEffect, useRef } from 'react';
import { rgbAlpha } from '@/utils';
import { themeVars } from '@/theme/theme.css';
import MultiTabItem from './components/tab-item';
import MultiTabSortableItem from './components/sortable-items';
import { KeepAliveTab } from './types';
import { useNavigate } from 'react-router';

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
    <div className="z-10 [&_.action]:m-0!">
      <div
        className="w-full transition-all duration-200 ease-in-out"
        style={{
          backgroundColor: rgbAlpha(themeVars.colors.background.default, 0.9)
        }}>
        <SortableContainer items={tabs} onSortEnd={handleDragEnd} renderOverlay={handleRenderOverlay}>
          <ul
            ref={scrollContainerRef}
            className="hide-scroll-bar flex h-8 w-full overflow-x-auto will-change-transform [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map(i => (
              <MultiTabSortableItem key={i.key} tab={i} onClick={() => handleSortableItemClick(i)} />
            ))}
          </ul>
        </SortableContainer>
      </div>
    </div>
  );
}
