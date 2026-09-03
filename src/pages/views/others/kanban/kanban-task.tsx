import { cn } from '@/utils';
import { memo, useState } from 'react';
import { DRAG_ITEM_TYPE_MAP, type Task, TASK_PRIORITY_MAP } from './types';
import { Icon } from '@/components/icon';
import { themeVars } from '@/theme/theme.css';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Sheet, SheetContent, SheetHeader } from '@/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import useLocale from '@/locales/use-locale';
import Button from '@/ui/button';
import KanbanTaskDrawer from './kanban-task-drawer';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getDefaultKanbanColumnTitles } from './task-mock';

type KanbanTaskProps = {
  /**
   * 任务在 DnD 排序系统中的唯一 id。
   * 看板列只保存 taskIds，任务详情保存在 tasks 字典里；拖拽排序时移动的是 id，而不是完整任务对象。
   *
   * Unique task id used by the DnD sorting system.
   * Board columns store taskIds only, while task details live in the tasks dictionary; dragging moves ids instead of full task objects.
   */
  id: string;

  /**
   * 当前任务的完整展示数据。
   * 任务卡片只展示标题、优先级、评论数、附件数、封面图和前几位负责人；详情抽屉继续复用同一份 task 渲染完整字段。
   *
   * Complete display data for the current task.
   * The task card only shows the title, priority, comment count, attachment count, preview image, and first assignees; the detail drawer reuses the same task to render the full fields.
   */
  task: Task;

  /**
   * 是否处于拖拽预览状态。
   * DragOverlay 渲染拖拽中的任务时会传入该状态，用轻微视觉变化区分正在拖动的任务卡片和普通任务卡片。
   *
   * Whether the task is rendered as a drag preview.
   * DragOverlay passes this when rendering the active dragged task, giving the dragged card a subtle visual difference from normal task cards.
   */
  isDragging?: boolean;
};

/**
 * 优先级图标配置。
 * 看板用同一个上升箭头图标配合颜色和旋转角度表达 High、Medium、Low，避免为三档优先级维护三套图标。
 *
 * Priority icon config.
 * The board represents High, Medium, and Low with the same rise icon plus color and rotation, avoiding three separate icon assets for the priority levels.
 */
const priorityConfigMap = {
  [TASK_PRIORITY_MAP.HIGH]: {
    color: themeVars.colors.palette.warning.default,
    classname: ''
  },
  [TASK_PRIORITY_MAP.MEDIUM]: {
    color: themeVars.colors.palette.success.default,
    classname: 'rotate-90'
  },
  [TASK_PRIORITY_MAP.LOW]: {
    color: themeVars.colors.palette.info.default,
    classname: 'rotate-180'
  }
};

/**
 * 看板任务卡片。
 * 卡片本身接入 dnd-kit 的 useSortable，负责参与任务排序；卡片内容区点击后打开右侧 Sheet，展示当前任务的完整详情。
 *
 * 当前卡片只做前置信息预览，不在这里修改任务数据。状态变更、列归属和任务详情字段仍然由外层看板数据结构提供。
 *
 * Kanban task card.
 * The card itself is wired to dnd-kit's useSortable for task sorting, and clicking the card body opens the right-side Sheet that displays the full details of the current task.
 *
 * The card only previews task summary information. Data updates, column ownership, and full task fields still come from the outer board data structure.
 */
function KanbanTask({ id, task, isDragging }: KanbanTaskProps) {
  const { t } = useLocale();
  const { attachments = [], priority, title, comments = [], assignee } = task;
  const defaultColumnTitles = getDefaultKanbanColumnTitles(t);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: {
      dragType: DRAG_ITEM_TYPE_MAP.TASK,
      task
    }
  });

  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <div
        ref={setNodeRef}
        className={cn('mb-4 w-[248px] rounded-xl bg-background p-4 text-xs font-normal hover:shadow-3xl', isDragging && 'backdrop-blur-sm')}
        {...attributes}
        {...listeners}
        style={{
          transform: CSS.Transform.toString(transform),
          transition
        }}>
        <div>
          {attachments.length > 0 && <img src={attachments[0]} alt="attachment" className="mb-4 rounded-md" />}
          <div onClick={() => setDrawerVisible(true)}>
            <div className="flex justify-end">
              <Icon
                icon="local:ic-rise"
                size={20}
                color={priorityConfigMap[priority].color}
                className={priorityConfigMap[priority].classname}
              />
            </div>
            <div>{title}</div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-base text-gray-600">
                <div className="flex space-x-1">
                  <Icon icon="uim:comment-dots" size={16} />
                  <span className="text-xs">{comments.length}</span>
                </div>
                <div className="flex space-x-1">
                  <Icon icon="iconamoon:attachment-bold" size={16} />
                  <span className="text-xs">{attachments.length}</span>
                </div>
              </div>
              {assignee && assignee.length > 0 && (
                <div className="flex gap-2 -space-x-4">
                  {/**
                   * 卡片空间有限，只展示前三位负责人；完整负责人列表仍保留在任务详情中。
                   * 索引参与 key 是为了兼容 mock 数据中可能重复的头像地址。
                   *
                   * Card space is limited, so only the first three assignees are shown; the complete list remains available in task details.
                   * The index participates in the key to tolerate duplicate avatar URLs in mock data.
                   */}
                  {assignee.slice(0, 3).map((item, index) => (
                    <Avatar key={`${item}-${index}`}>
                      <AvatarImage src={item} alt={item} />
                    </Avatar>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Sheet open={drawerVisible} modal={false} onOpenChange={setDrawerVisible}>
        <SheetContent className="pointer-events-auto w-[375px] p-0 sm:w-[420px] [&>button]:hidden">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <div>
                <Select defaultValue={defaultColumnTitles[0]}>
                  <SelectTrigger size="md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {/**
                     * 状态选项来自初始化列数据，使详情头部与看板的默认工作流阶段保持一致。
                     * 当前选择器只负责展示交互，不会修改任务所属列。
                     *
                     * Status options come from initial column data so the detail header matches the board's default workflow stages.
                     * The current selector is presentational and does not change task ownership.
                     */}
                    {defaultColumnTitles.map(item => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                <Button variant="ghost" size="icon">
                  <Icon icon="solar:like-bold" size={20} className="text-success!" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon icon="solar:trash-bin-trash-bold" size={20} className="text-error!" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon icon="fontisto:more-v-a" size={20} />
                </Button>
              </div>
            </div>
          </SheetHeader>
          <KanbanTaskDrawer task={task} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default memo(KanbanTask);
