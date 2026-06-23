/**
 * 任务优先级集合，用于任务卡片和详情面板中的优先级展示。
 * 当前业务只区分高、中、低三档，组件会根据该值渲染不同方向和颜色的优先级图标。
 *
 * Task priority values used by task cards and the detail panel.
 * The current workflow only supports high, medium, and low priorities, and components use this value to render priority icons.
 */
export const TASK_PRIORITY_MAP = {
  LOW: 'Low',

  MEDIUM: 'Medium',

  HIGH: 'High'
} as const;

/**
 * 任务优先级联合类型，确保任务数据只能使用预定义的高、中、低优先级。
 *
 * Task priority union that restricts task data to the predefined high, medium, and low values.
 */
export type TaskPriorityType = (typeof TASK_PRIORITY_MAP)[keyof typeof TASK_PRIORITY_MAP];

/**
 * 任务标签集合，用于描述任务涉及的技术方向或协作角色。
 * 标签只影响任务详情中的分类展示，不参与拖拽排序和看板状态流转。
 *
 * Task tag values used to describe the technical area or collaboration role of a task.
 * Tags are only displayed as categories in the task detail view and do not affect drag sorting or board state transitions.
 */
export const TASK_TAG_MAP = {
  FRONTEND: 'FrontEnd',
  BACKEND: 'BackEnd',
  FULLSTACK: 'FullStack',
  DEVOPS: 'DevOps',
  AI: 'AI',
  DBA: 'DBA',
  UI: 'UI',
  UE: 'UE',
  QA: 'QA'
} as const;

/**
 * 任务评论数据。
 * 评论只保存详情抽屉展示所需的作者、正文和时间信息。
 *
 * Task comment data.
 * A comment stores only the author, content, and timestamp required by the detail drawer.
 */
export type TaskComment = {
  /**
   * 评论人的头像地址，用于任务详情评论列表中的用户头像展示。
   *
   * Comment author avatar URL used by the comment list in the task detail panel.
   */
  avatar: string;

  /**
   * 评论正文内容，用于模拟任务协作中的讨论记录。
   *
   * Comment body used to simulate collaboration discussion on a task.
   */
  content: string;

  /**
   * 评论人的展示名称，用于标识评论来源。
   *
   * Comment author display name used to identify who wrote the comment.
   */
  username: string;

  /**
   * 评论创建时间，用于在任务详情中格式化展示评论时间。
   *
   * Comment creation time used for formatted timestamps in the task detail panel.
   */
  time: Date;
};

export type Task = {
  /**
   * 任务唯一标识。
   * 看板通过该字段把 columns.taskIds 中的顺序索引映射到 tasks 字典中的完整任务数据。
   *
   * Unique task identifier.
   * The board uses this field to map ordered ids from columns.taskIds to full task records in the tasks dictionary.
   */
  id: string;

  /**
   * 任务标题。
   * 任务卡片直接展示该字段，详情抽屉也把它作为任务主标题。
   *
   * Task title.
   * Task cards display this field directly, and the detail drawer uses it as the main task heading.
   */
  title: string;

  /**
   * 报告人头像地址。
   * 原始模块只保存头像 URL，不保存完整用户对象，用于详情面板中的 Reporter 区域。
   *
   * Reporter avatar URL.
   * The source module stores only the avatar URL instead of a full user object, and the detail panel uses it in the Reporter section.
   */
  reporter: string;

  /**
   * 任务优先级。
   * 任务卡片和详情面板会根据该值渲染优先级图标，模拟真实项目中任务紧急程度的提示。
   *
   * Task priority.
   * Task cards and the detail panel render priority icons from this value to simulate task urgency.
   */
  priority: TaskPriorityType;

  /**
   * 负责人头像地址列表。
   * 任务卡片只展示前几位负责人，详情面板展示完整负责人列表。
   *
   * Assignee avatar URL list.
   * Task cards show only the first few assignees, while the detail panel displays the full list.
   */
  assignee?: string[];

  /**
   * 任务标签列表。
   * 用于在详情面板中展示任务分类，例如 FrontEnd、BackEnd 或 QA。
   *
   * Task tag list.
   * The detail panel uses it to display task categories such as FrontEnd, BackEnd, or QA.
   */
  tags?: string[];

  /**
   * 任务截止日期。
   * 详情面板会把该字段格式化为日期，并作为日历组件的选中值。
   *
   * Task due date.
   * The detail panel formats this value as a date and uses it as the selected value in the calendar component.
   */
  date?: Date;

  /**
   * 任务描述。
   * 用于详情面板中的文本区域，模拟任务背景、验收标准或实现说明。
   *
   * Task description.
   * The detail panel uses it in the text area to simulate background, acceptance criteria, or implementation notes.
   */
  description?: string;

  /**
   * 任务评论列表。
   * 任务卡片展示评论数量，详情面板展示评论人、内容和时间。
   *
   * Task comment list.
   * Task cards show the comment count, and the detail panel displays author, content, and timestamp.
   */
  comments?: TaskComment[];

  /**
   * 附件图片地址列表。
   * 任务卡片使用第一张图片作为预览图，详情面板展示完整附件缩略图列表。
   *
   * Attachment image URL list.
   * Task cards use the first image as a preview, and the detail panel displays all attachment thumbnails.
   */
  attachments?: string[];
};

/**
 * 任务字典。
 * 以任务 id 作为 key 可以让拖拽排序只移动 id 数组，避免在列之间频繁复制完整任务对象。
 *
 * Task dictionary.
 * Using task ids as keys lets drag sorting move id arrays only, avoiding repeated copies of full task objects between columns.
 */
export type TaskMap = Record<string, Task>;

/**
 * 看板列数据。
 * 列只保存任务 ID 和顺序，完整任务数据由全局 tasks 字典维护。
 *
 * Kanban column data.
 * A column stores task IDs and their order, while complete task records remain in the global tasks dictionary.
 */
export type Column = {
  /**
   * 看板列唯一标识。
   * 列拖拽、重命名、清空和删除操作都依赖该字段定位目标列。
   *
   * Unique board column identifier.
   * Column dragging, renaming, clearing, and deletion all rely on this field to locate the target column.
   */
  id: string;

  /**
   * 看板列标题。
   * 用于展示当前任务阶段，例如 To do、In progress 或 Done。
   *
   * Board column title.
   * It displays the current workflow stage, such as To do, In progress, or Done.
   */
  title: string;

  /**
   * 当前列内的任务 id 顺序列表。
   * 同列排序和跨列移动只更新该数组，tasks 字典中的任务详情保持不变。
   *
   * Ordered task id list in the current column.
   * Sorting within a column and moving tasks across columns only update this array, while task details in the tasks dictionary remain unchanged.
   */
  taskIds: string[];
};

/**
 * 看板列字典。
 * 以列 id 作为 key 便于通过 columnOrder 控制列顺序，同时保留列自身数据。
 *
 * Board column dictionary.
 * Using column ids as keys allows columnOrder to control column order while preserving each column record.
 */
export type ColumnMap = Record<string, Column>;

/**
 * 看板的规范化状态结构。
 * 任务、列和列顺序相互分离，使拖拽操作只更新实际发生变化的引用。
 *
 * Normalized board state shape.
 * Tasks, columns, and column order are separated so drag operations update only the references that changed.
 */
export type DndDataType = {
  /**
   * 全量任务数据。
   * 列只保存 taskIds，页面渲染时通过该字典把 id 转换成任务卡片需要的完整数据。
   *
   * Complete task data.
   * Columns store taskIds only, and the page maps those ids through this dictionary when rendering task cards.
   */
  tasks: TaskMap;

  /**
   * 全量看板列数据。
   * 每个列对象保存自身标题和包含的任务 id，支撑列级操作和任务归属关系。
   *
   * Complete board column data.
   * Each column stores its title and contained task ids, supporting column actions and task ownership.
   */
  columns: ColumnMap;

  /**
   * 看板列的显示顺序。
   * 列拖拽时只需要重排这个数组，不需要重建 columns 字典。
   *
   * Display order of board columns.
   * Column dragging only needs to reorder this array without rebuilding the columns dictionary.
   */
  columnOrder: string[];
};

/**
 * 看板支持的拖拽元素类型。
 * 列组件、任务组件和拖拽 Hook 通过这组稳定值传递类型，避免依赖 ID 命名规则。
 *
 * Drag item types supported by the board.
 * Columns, tasks, and the drag Hook exchange these stable values instead of relying on ID naming conventions.
 */
export const DRAG_ITEM_TYPE_MAP = {
  COLUMN: 'column',
  TASK: 'task'
} as const;

/**
 * 从拖拽类型常量推导出的联合类型。
 *
 * Union type derived from the drag item type constants.
 */
export type DragItemType = (typeof DRAG_ITEM_TYPE_MAP)[keyof typeof DRAG_ITEM_TYPE_MAP];
