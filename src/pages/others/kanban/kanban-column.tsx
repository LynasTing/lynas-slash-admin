import { DRAG_ITEM_TYPE_MAP, type Column, type Task, TASK_PRIORITY_MAP } from './types';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ThemeMode } from '#/enum';
import { useSettingStoreState } from '@/store/setting';
import { cn } from '@/utils';
import { CSS } from '@dnd-kit/utilities';
import { useRef, useState } from 'react';
import { Input } from '@/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/ui/dropdown-menu';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import KanbanTask from './kanban-task';
import { faker } from '@faker-js/faker';
import { useEvent } from 'react-use';

type KanbanColumnProps = {
  /**
   * 当前列在 dnd-kit 排序系统中的唯一标识。
   *
   * Unique identifier used by dnd-kit to track this sortable column.
   */
  id: string;

  /**
   * 当前列的业务数据，包含列标题、列 ID 以及任务归属信息。
   *
   * Business data for the current column, including its title, id, and task ownership.
   */
  column: Column;

  /**
   * 当前列下需要渲染的任务列表。
   *
   * Tasks rendered inside this column.
   */
  tasks: Task[];

  /**
   * 当前列是否正处于拖拽态，用于在拖拽过程中降低透明度。
   *
   * Whether this column is being dragged, used to dim the column while sorting.
   */
  isDragging?: boolean;

  /**
   * 新建任务回调。
   * 第一个参数是列 ID，第二个参数是完整任务数据。
   *
   * Callback for creating a task.
   * The first argument is the column id, and the second one is the full task payload.
   */
  onCreateTask: (id: string, value: Task) => void;

  /**
   * 清空当前列任务的回调。
   *
   * Callback for clearing all tasks in the current column.
   */
  onClearColumn: (id: string) => void;

  /**
   * 删除当前列的回调。
   *
   * Callback for deleting the current column.
   */
  onRemoveColumn: (id: string) => void;

  /**
   * 重命名当前列的回调。
   * 这里传入完整列对象，避免父组件需要重新拼装列数据。
   *
   * Callback for renaming the current column.
   * The full column object is passed so the parent does not need to rebuild it.
   */
  onRenameColumn: (value: Column) => void;
};

/**
 * 看板列组件。
 * 负责渲染单个可拖拽列、列级操作菜单、任务列表以及快速新增任务入口。
 *
 * Kanban column component.
 * Renders a sortable column, column-level action menu, task list, and quick task creation entry.
 */
export default function KanbanColumn({
  id,
  column,
  tasks,
  isDragging,
  onCreateTask,
  onClearColumn,
  onRemoveColumn,
  onRenameColumn
}: KanbanColumnProps) {
  const { themeMode } = useSettingStoreState();

  /**
   * dnd-kit 的拖拽能力被绑定到列容器和列头。
   * setNodeRef 标记可排序节点，transform/transition 让拖拽排序过程保持平滑动画。
   *
   * dnd-kit sortable behavior is attached to the column container and header.
   * setNodeRef marks the sortable node, while transform/transition keep sorting animations smooth.
   */
  const { transform, transition, attributes, listeners, setNodeRef } = useSortable({
    id,
    data: {
      dragType: DRAG_ITEM_TYPE_MAP.COLUMN,
      column
    }
  });

  /**
   * 列重命名使用非受控输入框。
   * 当前组件只在提交时读取 DOM value，避免每次键入都触发父级列数据更新。
   *
   * Column renaming uses an uncontrolled input.
   * The component reads the DOM value only on commit to avoid updating parent column data on every keystroke.
   */
  const [renamingColumn, setRenamingColumn] = useState(false);
  const renameColumnInputRef = useRef<HTMLInputElement>(null);

  /**
   * 快速新增任务同样使用非受控输入框。
   * 用户点击列外区域时才创建任务，符合原看板的轻量输入交互。
   *
   * Quick task creation also uses an uncontrolled input.
   * A task is created only when the user clicks outside the input, matching the lightweight board interaction.
   */
  const [addingTask, setAddingTask] = useState(false);
  const addTaskInputRef = useRef<HTMLInputElement>(null);

  /**
   * 处理点击输入框外部后的提交逻辑。
   * 新增任务和重命名列都通过全局 click 收口，用户无需额外点击确认按钮。
   *
   * Handles commit behavior when the user clicks outside active inputs.
   * Both task creation and column renaming are finalized through the global click event, so no extra confirm button is needed.
   */
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    /**
     * 新增任务输入框存在时，点击输入框外部表示结束新增流程。
     * 空值只关闭输入态，不创建无标题任务。
     *
     * When the task input exists, clicking outside means the creation flow is finished.
     * Empty values only close the input state and do not create untitled tasks.
     */
    if (addTaskInputRef.current && !addTaskInputRef.current.contains(target)) {
      const addTaskInputValue = addTaskInputRef.current.value.trim();
      if (addTaskInputValue) {
        onCreateTask(column.id, {
          id: faker.string.uuid(),
          title: addTaskInputValue,
          reporter: faker.image.avatarGitHub(),
          priority: faker.helpers.enumValue(TASK_PRIORITY_MAP)
        });
      }
      setAddingTask(false);
    }

    /**
     * 重命名输入框存在时，点击输入框外部表示提交列标题。
     * 保留原列对象的其它字段，只替换 title，避免破坏列里的任务 ID 关系。
     *
     * When the rename input exists, clicking outside commits the column title.
     * Other column fields are preserved and only title is replaced, keeping task id ownership intact.
     */
    if (renameColumnInputRef.current && !renameColumnInputRef.current.contains(target)) {
      const renameInputValue = renameColumnInputRef.current.value.trim();
      if (renameInputValue) {
        onRenameColumn({
          ...column,
          title: renameInputValue
        });
      }
      setRenamingColumn(false);
    }
  };

  /**
   * 使用 react-use 管理全局 click 监听的注册和清理。
   * 这里需要监听组件外部点击，因此不能只依赖输入框自身事件。
   *
   * react-use manages registration and cleanup for the global click listener.
   * A global listener is needed because the component must react to clicks outside the inputs.
   */
  useEvent('click', handleClickOutside);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'h-full rounded-2xl p-4',
        themeMode === ThemeMode.Light ? 'bg-[rgb(244,244,248)]' : 'bg-[rgba(145,158,171,0.12)]',
        isDragging && 'opacity-50'
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}>
      {/**
       * 列头承担两个职责：展示/编辑列标题，以及作为列拖拽手柄。
       * 菜单按钮仍放在列头内，菜单项会阻止事件冒泡，避免列操作误触发拖拽相关逻辑。
       *
       * The header has two responsibilities: showing/editing the column title and acting as the column drag handle.
       * The menu button stays inside the header, while menu items stop propagation to avoid leaking column actions into drag logic.
       */}
      <header className="mb-4 flex items-center justify-between text-base font-semibold select-none" {...attributes} {...listeners}>
        {renamingColumn ? <Input ref={renameColumnInputRef} autoFocus /> : column.title}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon icon="dashicons:ellipsis" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={e => {
                /**
                 * 菜单项点击不应该继续冒泡到列头。
                 * 列头挂载了拖拽 listeners，阻止冒泡可以让菜单操作和拖拽手柄保持边界清晰。
                 *
                 * Menu item clicks should not bubble to the header.
                 * The header owns drag listeners, so stopping propagation keeps menu actions separate from the drag handle.
                 */
                e.stopPropagation();
                setRenamingColumn(true);
              }}>
              <Icon icon="solar:pen-bold" />
              <span>rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={e => {
                /**
                 * 清空列是列级操作，只需要通知父组件更新列下任务关系。
                 *
                 * Clearing a column is a column-level action and only asks the parent to update task ownership.
                 */
                e.stopPropagation();
                onClearColumn(column.id);
              }}>
              <Icon icon="solar:eraser-bold" />
              <span>clear</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={e => {
                /**
                 * 删除列是破坏性操作，样式和行为都放在 DropdownMenuItem 上。
                 * 这样 Radix 可以继续管理菜单项的焦点、选择和关闭行为。
                 *
                 * Deleting a column is destructive, so both semantics and behavior stay on DropdownMenuItem.
                 * This lets Radix continue handling focus, selection, and menu closing behavior.
                 */
                e.stopPropagation();
                onRemoveColumn(column.id);
              }}>
              <Icon icon="solar:trash-bin-trash-bold" />
              <span>delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/**
       * 每列都有独立的任务排序上下文。
       * SortableContext 只接收当前列任务 ID，确保任务在本列内部按垂直列表策略排序。
       *
       * Each column owns an independent task sorting context.
       * SortableContext receives only task ids in this column, so tasks are sorted vertically within this column.
       */}
      <SortableContext items={tasks.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div className="min-h-2.5">
          {tasks.map(item => (
            <KanbanTask key={item.id} id={item.id} task={item} />
          ))}
        </div>
      </SortableContext>

      {/**
       * 底部区域负责快速新增任务。
       * 按钮只负责进入输入态，真正创建任务由外部点击提交逻辑统一处理。
       *
       * The footer owns quick task creation.
       * The button only enters input mode; actual task creation is handled by the shared outside-click commit flow.
       */}
      <footer className="w-60">
        {addingTask ? (
          <Input ref={addTaskInputRef} placeholder="Task name" autoFocus />
        ) : (
          <Button
            className="flex! w-full items-center justify-center text-xs! font-medium!"
            onClick={e => {
              /**
               * 打开输入框的点击不能被全局 click 收口逻辑立即消费。
               * 否则输入框可能刚进入新增态就被同一次点击关闭。
               *
               * The click that opens the input must not be consumed by the global outside-click commit logic.
               * Otherwise the input could enter creation mode and be closed by the same click immediately.
               */
              e.stopPropagation();
              setAddingTask(true);
            }}>
            <Icon icon="carbon:add" size={20} />
            <span>Add Task</span>
          </Button>
        )}
      </footer>
    </div>
  );
}
