import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { faker } from '@faker-js/faker';
import { useRef, useState } from 'react';
import { useEvent } from 'react-use';
import useLocale from '@/locales/use-locale';
import { getInitialKanbanData } from './task-mock';
import { DRAG_ITEM_TYPE_MAP, type Column, type ColumnMap, type DndDataType, type DragItemType, type Task, type TaskMap } from './types';

type MoveItemParams = {
  /**
   * 当前被拖拽元素的唯一标识。
   *
   * Unique identifier of the active draggable item.
   */
  activeId: string;

  /**
   * 当前放置目标的唯一标识。
   *
   * Unique identifier of the current drop target.
   */
  overId: string;
};

type MoveTaskParams = MoveItemParams & {
  /**
   * 放置目标类型，用于区分插入任务位置和追加到列末尾两种行为。
   *
   * Drop target type used to distinguish inserting before a task from appending to a column.
   */
  overType: DragItemType;
};

/**
 * 校验 dnd-kit 事件携带的拖拽类型，避免未知数据进入看板状态流转。
 * @param value - 待校验的拖拽类型。
 * @returns 是否为看板支持的拖拽类型。
 *
 * Validates the drag type carried by a dnd-kit event so unknown data cannot enter board state transitions.
 * @param value - Drag type to validate.
 * @returns Whether the value is a supported board drag type.
 */
function isDragItemType(value: unknown): value is DragItemType {
  return value === DRAG_ITEM_TYPE_MAP.COLUMN || value === DRAG_ITEM_TYPE_MAP.TASK;
}

/**
 * 管理看板数据、快捷新增列交互以及拖拽状态流转。
 * 页面组件只负责组合视图，所有会改变任务归属或列顺序的操作都集中在这里。
 *
 * Manages board data, quick column creation, and drag state transitions.
 * The page only composes the view, while operations that change task ownership or column order stay here.
 */
export function useKanbanBoard() {
  const { t } = useLocale();
  const [kanbanData, setKanbanData] = useState<DndDataType>(() => getInitialKanbanData(t));
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [activeDragType, setActiveDragType] = useState<DragItemType | null>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const addColumnInputRef = useRef<HTMLInputElement>(null);

  /**
   * 看板使用 PointerSensor 统一处理鼠标和触控笔输入。
   * 只有指针移动超过 8 像素后才进入拖拽态，避免点击任务卡片或列菜单时误触排序。
   *
   * The board uses PointerSensor for both mouse and pen input.
   * Dragging starts only after an 8-pixel movement, preventing card clicks and column menu actions from accidentally triggering sorting.
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );

  /**
   * 将新任务写入全局任务字典，并把任务 ID 追加到目标列。
   * 两处数据必须在同一次状态更新中完成，避免任务记录与列引用不同步。
   * @param columnId - 接收新任务的列 ID。
   * @param task - 待创建的完整任务数据。
   *
   * Adds a task to the global task dictionary and appends its ID to the target column.
   * Both changes happen in one state update so the task record and column reference cannot diverge.
   * @param columnId - ID of the column receiving the new task.
   * @param task - Complete task record to create.
   */
  const createTask = (columnId: string, task: Task) => {
    setKanbanData(previousData => {
      const column = previousData.columns[columnId];

      /*
       * 目标列可能已被其它操作删除；此时保持原状态比创建孤立任务更安全。
       *
       * The target column may have been removed by another action; preserving state is safer than creating an orphaned task.
       */
      if (!column) return previousData;

      return {
        ...previousData,
        tasks: { ...previousData.tasks, [task.id]: task },
        columns: {
          ...previousData.columns,
          [columnId]: { ...column, taskIds: [...column.taskIds, task.id] }
        }
      };
    });
  };

  /**
   * 更新列标题，同时保留列中的任务顺序和其它字段。
   * @param column - 包含目标列 ID 和新标题的列数据。
   *
   * Updates a column title while preserving its task order and other fields.
   * @param column - Column data containing the target ID and new title.
   */
  const renameColumn = (column: Column) => {
    setKanbanData(previousData => {
      const currentColumn = previousData.columns[column.id];

      /*
       * 只允许更新仍存在的列，避免用过期菜单操作重新创建已删除列。
       *
       * Only existing columns can be updated, preventing a stale menu action from recreating a removed column.
       */
      if (!currentColumn) return previousData;

      return {
        ...previousData,
        columns: {
          ...previousData.columns,
          [column.id]: { ...currentColumn, title: column.title }
        }
      };
    });
  };

  /**
   * 清空指定列，并删除该列任务在全局任务字典中的记录。
   * @param columnId - 待清空的列 ID。
   *
   * Clears a column and removes its task records from the global task dictionary.
   * @param columnId - ID of the column to clear.
   */
  const clearColumn = (columnId: string) => {
    setKanbanData(previousData => {
      const column = previousData.columns[columnId];

      /*
       * 如果列已不存在，清空操作没有合法目标，应保持规范化状态不变。
       *
       * If the column no longer exists, the clear action has no valid target and the normalized state must remain unchanged.
       */
      if (!column) return previousData;

      /**
       * 清空列时同步删除全局任务字典中的记录，避免留下无法访问的孤立数据。
       *
       * Clearing a column also removes its records from the global task dictionary to avoid orphaned data.
       */
      const remainingTasks = Object.fromEntries(
        Object.entries(previousData.tasks).filter(([taskId]) => !column.taskIds.includes(taskId))
      ) as TaskMap;

      return {
        ...previousData,
        tasks: remainingTasks,
        columns: {
          ...previousData.columns,
          [columnId]: { ...column, taskIds: [] }
        }
      };
    });
  };

  /**
   * 删除指定列及其全部任务，并同步维护列显示顺序。
   * @param columnId - 待删除的列 ID。
   *
   * Removes a column and all of its tasks while keeping the column display order synchronized.
   * @param columnId - ID of the column to remove.
   */
  const removeColumn = (columnId: string) => {
    setKanbanData(previousData => {
      const column = previousData.columns[columnId];

      /*
       * 重复删除或过期操作不应该继续改写任务字典和列顺序。
       *
       * Duplicate removals and stale actions must not continue rewriting the task dictionary or column order.
       */
      if (!column) return previousData;

      /**
       * 删除列时同时维护任务字典、列字典和列顺序，保证规范化数据引用一致。
       *
       * Removing a column updates tasks, columns, and column order together to keep normalized references consistent.
       */
      const remainingTasks = Object.fromEntries(
        Object.entries(previousData.tasks).filter(([taskId]) => !column.taskIds.includes(taskId))
      ) as TaskMap;
      const remainingColumns = Object.fromEntries(
        Object.entries(previousData.columns).filter(([currentColumnId]) => currentColumnId !== columnId)
      ) as ColumnMap;

      return {
        ...previousData,
        tasks: remainingTasks,
        columns: remainingColumns,
        columnOrder: previousData.columnOrder.filter(currentColumnId => currentColumnId !== columnId)
      };
    });
  };

  /**
   * 将新列写入列字典并追加到看板末尾。
   * @param column - 待创建的完整列数据。
   *
   * Adds a column to the column dictionary and appends it to the end of the board.
   * @param column - Complete column record to create.
   */
  const createColumn = (column: Column) => {
    setKanbanData(previousData => ({
      ...previousData,
      columns: { ...previousData.columns, [column.id]: column },
      columnOrder: [...previousData.columnOrder, column.id]
    }));
  };

  /**
   * 清理当前拖拽项，用于拖拽完成、取消或无有效目标时关闭 DragOverlay。
   *
   * Clears the active drag item so DragOverlay closes after a completed, cancelled, or invalid drop.
   */
  const resetDragState = () => {
    setActiveDragId(null);
    setActiveDragType(null);
  };

  /**
   * 在 columnOrder 中交换列位置。
   * 实际列数据保留在 columns 字典中，因此排序只需要移动 ID。
   * @param params - 当前列 ID 和目标列 ID。
   *
   * Reorders columns inside columnOrder.
   * Column records remain in the columns dictionary, so sorting only needs to move IDs.
   * @param params - Active column ID and target column ID.
   */
  const moveColumn = ({ activeId, overId }: MoveItemParams) => {
    setKanbanData(previousData => {
      const oldIndex = previousData.columnOrder.indexOf(activeId);
      const newIndex = previousData.columnOrder.indexOf(overId);

      /**
       * 嵌套任务也可能成为碰撞目标，索引校验用于阻止非法目标破坏列顺序。
       *
       * Nested tasks may become collision targets, so index validation prevents invalid targets from corrupting column order.
       */
      if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return previousData;

      return {
        ...previousData,
        columnOrder: arrayMove(previousData.columnOrder, oldIndex, newIndex)
      };
    });
  };

  /**
   * 根据来源列、目标列和目标类型移动任务。
   * 同列操作只调整任务 ID 顺序，跨列操作同时更新两个列的任务引用。
   * @param params - 当前任务 ID、放置目标 ID 和目标类型。
   *
   * Moves a task according to its source column, target column, and target type.
   * Same-column moves only reorder task IDs, while cross-column moves update references in both columns.
   * @param params - Active task ID, drop target ID, and drop target type.
   */
  const moveTask = ({ activeId, overId, overType }: MoveTaskParams) => {
    setKanbanData(previousData => {
      const activeColumn = Object.values(previousData.columns).find(column => column.taskIds.includes(activeId));
      const overColumn = Object.values(previousData.columns).find(column => column.id === overId || column.taskIds.includes(overId));

      /*
       * 来源或目标无法解析时说明拖拽上下文已经失效，保留原状态可以避免任务丢失。
       *
       * If the source or target cannot be resolved, the drag context is stale; preserving state prevents task loss.
       */
      if (!activeColumn || !overColumn) return previousData;

      if (activeColumn.id === overColumn.id) {
        const oldIndex = activeColumn.taskIds.indexOf(activeId);
        const newIndex = overType === DRAG_ITEM_TYPE_MAP.COLUMN ? activeColumn.taskIds.length - 1 : activeColumn.taskIds.indexOf(overId);

        /**
         * 落到同列容器表示移动到末尾；落到任务卡片才使用目标任务索引。
         *
         * Dropping on the current column appends to the end; dropping on a task uses the target task index.
         */
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return previousData;

        return {
          ...previousData,
          columns: {
            ...previousData.columns,
            [activeColumn.id]: {
              ...activeColumn,
              taskIds: arrayMove(activeColumn.taskIds, oldIndex, newIndex)
            }
          }
        };
      }

      const overTaskIndex = overColumn.taskIds.indexOf(overId);
      if (overType === DRAG_ITEM_TYPE_MAP.TASK && overTaskIndex < 0) return previousData;

      /**
       * 跨列移动先解除来源列引用；落到任务时按索引插入，落到列容器时追加到末尾。
       *
       * Cross-column movement removes the source reference first, then inserts by task index or appends to the target column.
       */
      const sourceTaskIds = activeColumn.taskIds.filter(taskId => taskId !== activeId);
      const targetTaskIds = [...overColumn.taskIds];
      const targetIndex = overType === DRAG_ITEM_TYPE_MAP.COLUMN ? targetTaskIds.length : overTaskIndex;
      targetTaskIds.splice(targetIndex, 0, activeId);

      return {
        ...previousData,
        columns: {
          ...previousData.columns,
          [activeColumn.id]: { ...activeColumn, taskIds: sourceTaskIds },
          [overColumn.id]: { ...overColumn, taskIds: targetTaskIds }
        }
      };
    });
  };

  /**
   * 记录拖拽项的 ID 和类型，为 DragOverlay 提供正确的预览组件。
   * 类型读取自 sortable data，因此不依赖任务或列的 ID 格式。
   * @param event - dnd-kit 拖拽开始事件。
   *
   * Records the active item ID and type so DragOverlay can render the correct preview.
   * The type comes from sortable data and does not depend on task or column ID formats.
   * @param event - dnd-kit drag start event.
   */
  const handleDragStart = ({ active }: DragStartEvent) => {
    const dragType = active.data.current?.dragType;

    /*
     * 只接收看板注册的列和任务类型，忽略来自嵌套组件或错误配置的未知拖拽数据。
     *
     * Only registered board column and task types are accepted; unknown drag data from nested components or configuration errors is ignored.
     */
    if (!isDragItemType(dragType)) return;

    setActiveDragId(String(active.id));
    setActiveDragType(dragType);
  };

  /**
   * 校验拖拽双方类型，并把有效的放置操作分发给列排序或任务移动逻辑。
   * 无效组合不会修改看板数据，拖拽状态始终会在流程结束时清理。
   * @param event - dnd-kit 拖拽结束事件。
   *
   * Validates both drag item types and dispatches a valid drop to column sorting or task movement.
   * Invalid combinations leave board data unchanged, and drag state is always cleared when the flow ends.
   * @param event - dnd-kit drag end event.
   */
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    /*
     * 指针在所有可放置区域之外释放时没有有效目标，只需要结束预览而不能修改看板数据。
     *
     * Releasing outside every droppable area produces no valid target, so only the preview is cleared and board data remains unchanged.
     */
    if (!over) {
      resetDragState();
      return;
    }

    const activeType = active.data.current?.dragType;
    const overType = over.data.current?.dragType;
    const activeId = String(active.id);
    const overId = String(over.id);

    /**
     * 类型来自 sortable data，因此 UUID 任务不依赖 ID 前缀也能正确识别。
     * 列只允许与列交换；任务可以落到任务卡片或列容器。
     *
     * Types come from sortable data, so UUID tasks are classified without ID prefixes.
     * Columns may only swap with columns, while tasks may target task cards or column containers.
     */
    if (activeId !== overId && isDragItemType(activeType) && isDragItemType(overType)) {
      if (activeType === DRAG_ITEM_TYPE_MAP.COLUMN && overType === DRAG_ITEM_TYPE_MAP.COLUMN) {
        moveColumn({ activeId, overId });
      }

      if (activeType === DRAG_ITEM_TYPE_MAP.TASK) {
        moveTask({ activeId, overId, overType });
      }
    }

    resetDragState();
  };

  /**
   * 点击新增列输入框外部时提交非空标题，并退出输入状态。
   * 使用 trim 处理标题，避免创建只包含空白字符的列。
   * @param event - 全局鼠标点击事件。
   *
   * Commits a non-empty title when clicking outside the new-column input and then exits input mode.
   * The title is trimmed to prevent columns containing only whitespace.
   * @param event - Global mouse click event.
   */
  const handleOutsideClick = (event: MouseEvent) => {
    /*
     * 输入框尚未挂载或点击仍发生在输入框内部时，不应提交或关闭新增列流程。
     *
     * The create-column flow must stay open when the input is not mounted yet or the click still occurs inside it.
     */
    if (!addColumnInputRef.current || addColumnInputRef.current.contains(event.target as Node)) return;

    const title = addColumnInputRef.current.value.trim();

    /*
     * 空标题只退出输入状态，不创建无法识别的看板列。
     *
     * An empty title only exits input mode and does not create an unidentifiable board column.
     */
    if (title) {
      createColumn({ id: faker.string.uuid(), title, taskIds: [] });
    }

    setIsAddingColumn(false);
  };

  /**
   * 全局 click 监听负责捕获输入框之外的提交动作，react-use 会随 Hook 生命周期自动注册和清理监听器。
   *
   * The global click listener captures submissions outside the input, while react-use registers and cleans it up with the Hook lifecycle.
   */
  useEvent('click', handleOutsideClick);

  return {
    activeDragId,
    activeDragType,
    addColumnInputRef,
    clearColumn,
    createTask,
    handleDragEnd,
    handleDragStart,
    isAddingColumn,
    kanbanData,
    removeColumn,
    renameColumn,
    resetDragState,
    sensors,
    setIsAddingColumn
  };
}
