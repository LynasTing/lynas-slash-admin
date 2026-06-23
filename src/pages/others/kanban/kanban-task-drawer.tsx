import { type Task, TASK_PRIORITY_MAP } from './types';
import { Title, Text } from '@/ui/typography';
import { themeVars } from '@/theme/theme.css';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { type ReactNode } from 'react';
import { Badge } from '@/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import Button from '@/ui/button';
import dayjs from 'dayjs';
import { Calendar } from '@/ui/calendar';
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';
import { Icon } from '@/components/icon';
import { Textarea } from '@/ui/textarea';

type TaskDrawerFieldProps = {
  /**
   * 左侧字段标签。
   * 任务详情中的 Reporter、Assignee、Tag 等字段需要稳定对齐，所以左侧标签列使用固定宽度。
   *
   * Field label rendered on the left.
   * Detail fields such as Reporter, Assignee, and Tag need stable alignment, so the left label column uses a fixed width.
   */
  label: string;

  /**
   * 右侧字段内容。
   * 不同字段会渲染头像、标签、日期选择器、优先级切换组、文本域或附件缩略图，因此这里只抽统一布局，不限制具体内容类型。
   *
   * Field content rendered on the right.
   * Different fields render avatars, badges, a date picker, a priority toggle group, a text area, or attachment thumbnails, so this helper only owns layout and does not constrain the content type.
   */
  children: ReactNode;
};

/**
 * 任务详情字段行。
 * 统一详情抽屉里的字段布局，让头像、标签、日期选择器、优先级和文本域在同一套标签列后面排列。
 *
 * Task detail field row.
 * It standardizes field layout in the detail drawer so avatars, badges, date picker, priority controls, and text area align after the same label column.
 */
function TaskDrawerField({ label, children }: TaskDrawerFieldProps) {
  return (
    <div className="flex items-center">
      <div
        className="h-10 w-[100px] text-left text-xs leading-10 font-semibold"
        style={{
          color: themeVars.colors.text.secondary
        }}>
        {label}
      </div>
      {children}
    </div>
  );
}

/**
 * 详情面板中的优先级选项。
 * 详情里展示 High、Medium、Low 三个 ToggleGroupItem，并复用同一个上升箭头图标，通过颜色和旋转角度区分优先级。
 *
 * Priority options used by the detail panel.
 * The detail view renders High, Medium, and Low as ToggleGroupItem entries and reuses the same rise icon, distinguishing priorities by color and rotation.
 */
const priorityConfigs = [
  {
    priority: TASK_PRIORITY_MAP.HIGH,
    color: themeVars.colors.palette.warning.default,
    classname: ''
  },
  {
    priority: TASK_PRIORITY_MAP.MEDIUM,
    color: themeVars.colors.palette.success.default,
    classname: 'rotate-90'
  },
  {
    priority: TASK_PRIORITY_MAP.LOW,
    color: themeVars.colors.palette.info.default,
    classname: 'rotate-180'
  }
];

type KanbanTaskDrawerProps = {
  /**
   * 当前抽屉展示的任务数据。
   * 抽屉展示任务的完整信息：标题、报告人、负责人、标签、截止日期、优先级、描述、附件和评论。
   *
   * Task data displayed by the drawer.
   * The drawer displays the full task information: title, reporter, assignees, tags, due date, priority, description, attachments, and comments.
   */
  task: Task;
};

/**
 * 看板任务详情抽屉内容。
 * 只负责把任务完整信息铺到右侧 Sheet 中；它没有把日期、优先级、描述等控件的变更写回任务数据。
 *
 * Kanban task detail drawer content.
 * It only lays out the full task information inside the right-side Sheet; it does not persist changes from the date picker, priority toggle, or description field back to task data.
 */
export default function KanbanTaskDrawer({ task }: KanbanTaskDrawerProps) {
  const { title, reporter, assignee = [], tags = [], date, priority, description, attachments, comments = [] } = task;

  return (
    <>
      <div className="flex flex-col gap-6 px-6 py-0">
        <div className="flex items-center">
          <Title as="h4">{title}</Title>
        </div>
        <TaskDrawerField label="Reporter">
          <Avatar>
            <AvatarImage src={reporter} alt="reporter" />
          </Avatar>
        </TaskDrawerField>
        <TaskDrawerField label="Assignee">
          <div className="flex gap-2">
            {/**
             * 详情抽屉展示全部负责人，不复用任务卡片的前三位截断规则。
             *
             * The detail drawer renders every assignee instead of reusing the card's three-person limit.
             */}
            {assignee.map(item => (
              <Avatar key={item}>
                <AvatarImage src={item} alt="assignee" />
              </Avatar>
            ))}
          </div>
        </TaskDrawerField>
        <TaskDrawerField label="Tag">
          <div className="flex flex-wrap gap-2">
            {/**
             * 每个任务标签转换为独立徽章，换行布局用于容纳数量不固定的分类。
             *
             * Each task tag becomes an individual badge, and wrapping accommodates a variable number of categories.
             */}
            {tags.map(item => (
              <Badge key={item} variant="info">
                {item}
              </Badge>
            ))}
          </div>
        </TaskDrawerField>
        <TaskDrawerField label="Due Date">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{date ? dayjs(date).format('DD/MM/YYYY') : <span>Pick a date</span>}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} initialFocus />
            </PopoverContent>
          </Popover>
        </TaskDrawerField>
        <TaskDrawerField label="Priority">
          <ToggleGroup type="single" defaultValue={priority}>
            {/**
             * 配置数组统一生成三个优先级选项，避免图标颜色和旋转规则散落在 JSX 分支中。
             * 当前 ToggleGroup 只提供本地选择反馈，不会写回任务数据。
             *
             * The config array generates all three priority options so icon color and rotation rules do not spread across JSX branches.
             * The current ToggleGroup provides local selection feedback only and does not persist task data.
             */}
            {priorityConfigs.map(item => (
              <ToggleGroupItem key={item.priority} value={item.priority}>
                <Icon icon="local:ic-rise" size={20} color={item.color} className={item.classname} />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </TaskDrawerField>
        <TaskDrawerField label="Description">
          <Textarea defaultValue={description} />
        </TaskDrawerField>
        <TaskDrawerField label="Attachments">
          <div className="flex flex-wrap gap-2">
            {/**
             * 详情抽屉展示全部附件，区别于任务卡片只使用第一张图片作为封面。
             *
             * The detail drawer renders every attachment, while the task card uses only the first image as its cover.
             */}
            {attachments?.map((item, index) => (
              <img src={item} key={index} alt={item} className="size-16 rounded-lg" />
            ))}
          </div>
        </TaskDrawerField>
      </div>
      <div className="flex flex-col gap-4 px-5 pt-6 pb-10">
        {/**
         * 评论数据转换为按时间信息展示的协作记录；当前模块只展示已有评论，不提供新增或编辑入口。
         *
         * Comment data becomes collaboration records with timestamps; the current module displays existing comments without create or edit actions.
         */}
        {comments.map(({ avatar, username, content, time }) => (
          <div className="flex gap-4" key={username}>
            <Avatar>
              <AvatarImage src={avatar} alt={username} />
            </Avatar>
            <div className="text-gray flex grow flex-col flex-wrap gap-1">
              <div className="flex justify-between">
                <Text variant="caption" color="secondary">
                  {username}
                </Text>
                <Text variant="caption" color="secondary">
                  {dayjs(time).format('DD/MM/YYYY HH:mm')}
                </Text>
              </div>
              <p>{content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
