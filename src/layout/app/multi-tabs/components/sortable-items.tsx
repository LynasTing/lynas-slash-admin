import type { KeepAliveTab } from '../types';
import { useMultiTabsContext } from '../providers/multi-tabs.hook';
import MultiTabItem from './tab-item';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils';
import { CSSProperties } from 'react';

type Props = {
  // 当前 Tab 数据 / Current Tab data
  tab: KeepAliveTab;
  // 点击 Tab 回调 / Callback when tab is clicked
  onClick: () => void;
};

/**
 * MultiTabSortableItem
 * 用途：渲染单个可拖拽 Tab 项
 * 功能：支持点击切换、关闭 Tab，以及拖拽排序
 *
 * MultiTabSortableItem component
 * Purpose: renders a single draggable Tab item
 * Features: click to activate, close tab, and drag to reorder
 */
export default function MultiTabSortableItem({ tab, onClick }: Props) {
  const { activeTabRoutePath, closeTab } = useMultiTabsContext();
  // 判断当前 Tab 是否被激活 / Check if current tab is active
  const isActive = tab.key === activeTabRoutePath;

  // useSortable 提供拖拽功能 / useSortable provides drag-and-drop functionality
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: tab.key,
    data: { type: 'tab', tab }
  });

  // 设置拖拽样式 / Set drag-and-drop styles
  const style: CSSProperties = {
    transition
  };

  if (transform) {
    // transform 转字符串 / Convert transform object to string
    style.transform = CSS.Translate.toString(transform);
  }

  return (
    <li
      ref={setNodeRef}
      id={`tab${tab.key.split('/').join('-')}`}
      className={cn('shrink-0 rounded-t-lg border', isActive && 'text-primary')}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}>
      <MultiTabItem tab={tab} onClose={() => closeTab(tab.key)} />
    </li>
  );
}
