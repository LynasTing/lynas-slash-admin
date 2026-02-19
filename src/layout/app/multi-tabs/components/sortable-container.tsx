import { ReactNode, useState } from 'react';
import type { KeepAliveTab } from '../types';
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  MeasuringStrategy,
  defaultDropAnimationSideEffects,
  type DragStartEvent,
  type DragEndEvent
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

interface SortableContainerProps {
  /**
   * 需要排序的元素列表，数组中的每个元素都应包含唯一 key（这里是 KeepAliveTab）
   * Array of sortable items, each item should have a unique key (KeepAliveTab)
   */
  items: Array<KeepAliveTab>;

  /**
   * 容器内部的渲染内容，通常是 Tab 列表元素
   * Children nodes inside the container, usually tab elements
   */
  children: ReactNode;

  /**
   * 排序完成后的回调，提供旧索引和新索引
   * Callback triggered after sorting ends, with old and new index
   */
  onSortEnd?: (oldIdx: number, newIdx: number) => void;

  /**
   * 拖拽悬浮时的自定义渲染函数
   * Function to render a custom overlay during drag
   */
  renderOverlay?: (activeId: string | number) => ReactNode;
}

export default function SortableContainer({ items, children, onSortEnd, renderOverlay }: SortableContainerProps) {
  /** 当前被拖拽元素的 id / ID of the currently dragged item */
  const [activeId, setActiveId] = useState<string | number | null>(null);

  /**
   * 配置拖拽传感器
   *
   * PointerSensor - 鼠标拖拽
   * TouchSensor - 触屏拖拽
   * KeyboardSensor - 键盘拖拽
   * activationConstraint: 鼠标拖动距离大于 8px 才触发拖拽
   *
   * Configure drag sensors
   * PointerSensor for mouse, TouchSensor for touch, KeyboardSensor for keyboard
   * activationConstraint: drag starts after moving 8px
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  /**
   * 开始拖拽时的处理
   */
  const handleDragStart = (event: DragStartEvent) => {
    /** 保存当前激活的拖拽元素 id / Save the currently active dragged item id  */
    setActiveId(event.active.id);
  };

  /**
   * 结束拖拽时的处理
   */
  const handleDragEnd = (event: DragEndEvent) => {
    /**
     * active 当前正在被拖拽的元素的信息 / The item currently being dragged
     * over 拖拽结束时，当前拖拽元素悬停的目标元素 / The item that the dragged element is "over" when drag ends
     */
    const { active, over } = event;

    /** 清空 activeId / Reset activeId */
    setActiveId(null);

    /** 判断拖拽到了其他元素上（需要交换顺序）/ Check if the dragged item is over another item */
    if (over && active.id !== over.id) {
      const oldIdx = items.findIndex(i => i.key === active.id);
      const newIdx = items.findIndex(i => i.key === over.id);

      /** 到原始索引和新索引，触发 onSortEnd / Find old and new index, trigger onSortEnd callback */
      if (oldIdx !== -1 && newIdx !== -1) {
        onSortEnd?.(oldIdx, newIdx);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}>
      <SortableContext items={items.map(i => i.key)} strategy={horizontalListSortingStrategy}>
        {children}
      </SortableContext>
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5'
              }
            }
          })
        }}>
        {activeId && renderOverlay ? renderOverlay(activeId) : null}
      </DragOverlay>
    </DndContext>
  );
}
