import { Icon } from '@/components/icon';
import Button from '@/ui/button';
import { Input } from '@/ui/input';
import { ScrollArea, ScrollBar } from '@/ui/scroll-area';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import useLocale from '@/locales/use-locale';
import KanbanColumn from './kanban-column';
import KanbanTask from './kanban-task';
import { DRAG_ITEM_TYPE_MAP } from './types';
import { useKanbanBoard } from './use-kanban-board';

/**
 * 看板页面。
 * 页面只负责组合列、任务拖拽预览和新增列入口；数据变更与拖拽状态流转由 useKanbanBoard 统一管理。
 *
 * Kanban page.
 * The page only composes columns, task drag previews, and the new-column entry; useKanbanBoard owns data mutations and drag state transitions.
 */
export default function KanbanPage() {
  const { t } = useLocale();
  const {
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
  } = useKanbanBoard();

  return (
    <ScrollArea type="hover">
      <div className="flex w-full">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={resetDragState}>
          <div className="flex h-full items-start gap-6 p-1">
            <SortableContext items={kanbanData.columnOrder} strategy={horizontalListSortingStrategy}>
              {/**
               * columnOrder 只保存展示顺序，渲染时需要从 columns 和 tasks 字典还原每列的完整数据。
               * 这种规范化结构让列排序只移动 ID，避免复制完整列和任务对象。
               *
               * columnOrder stores display order only, so rendering resolves complete column data from the columns and tasks dictionaries.
               * This normalized shape lets column sorting move IDs without copying complete column and task objects.
               */}
              {kanbanData.columnOrder.map(columnId => {
                const column = kanbanData.columns[columnId];
                const tasks = column.taskIds.map(taskId => kanbanData.tasks[taskId]);

                return (
                  <KanbanColumn
                    key={columnId}
                    id={columnId}
                    column={column}
                    tasks={tasks}
                    onCreateTask={createTask}
                    onRenameColumn={renameColumn}
                    onClearColumn={clearColumn}
                    onRemoveColumn={removeColumn}
                  />
                );
              })}
            </SortableContext>

            <DragOverlay>
              {/**
               * 拖拽预览根据共享类型协议选择列或任务组件，并复用当前看板数据保证预览内容一致。
               *
               * The drag preview selects a column or task component from the shared type protocol and reuses current board data for consistent content.
               */}
              {activeDragId && activeDragType === DRAG_ITEM_TYPE_MAP.COLUMN ? (
                <KanbanColumn
                  isDragging
                  id={activeDragId}
                  column={kanbanData.columns[activeDragId]}
                  tasks={kanbanData.columns[activeDragId].taskIds.map(taskId => kanbanData.tasks[taskId])}
                  onCreateTask={createTask}
                  onRenameColumn={renameColumn}
                  onClearColumn={clearColumn}
                  onRemoveColumn={removeColumn}
                />
              ) : null}
              {activeDragId && activeDragType === DRAG_ITEM_TYPE_MAP.TASK ? (
                <KanbanTask isDragging id={activeDragId} task={kanbanData.tasks[activeDragId]} />
              ) : null}
            </DragOverlay>
          </div>
        </DndContext>

        <div className="mt-1 ml-6 min-w-72">
          {/**
           * 新增列使用非受控输入框，Hook 会在用户点击输入框外部时读取并提交标题。
           *
           * Column creation uses an uncontrolled input, and the Hook reads and commits its title when the user clicks outside.
           */}
          {isAddingColumn ? (
            <Input ref={addColumnInputRef} placeholder={t('pages.others.kanban.placeholders.columnName')} autoFocus />
          ) : (
            <Button
              variant="outline"
              className="inline-flex! w-full! items-center justify-center text-xs! font-semibold!"
              onClick={event => {
                event.stopPropagation();
                setIsAddingColumn(true);
              }}>
              <Icon icon="carbon:add" size={20} />
              <div>{t('pages.others.kanban.actions.addColumn')}</div>
            </Button>
          )}
        </div>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
