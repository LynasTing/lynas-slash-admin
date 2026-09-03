import { TASK_TAG_MAP, type TaskComment, type DndDataType, type TaskMap, TASK_PRIORITY_MAP } from './types';
import { faker } from '@faker-js/faker';
import type { TFunction } from 'i18next';

/**
 * 生成任务评论数据。
 * @param count - 需要生成的评论数量。
 * @returns 评论列表；数量小于等于 0 时返回空数组，便于任务卡片稳定计算评论数量。
 *
 * Generates task comment data.
 * @param count - Number of comments to generate.
 * @returns Comment list; returns an empty array when count is less than or equal to 0 so task cards can calculate comment counts safely.
 */
const generateComment = (count: number): TaskComment[] => {
  /*
   * 非正数表示不需要生成评论，提前返回可以避免进入无意义的循环。
   * 随后按指定数量逐条生成，保证卡片计数和详情列表使用同一份数据。
   *
   * A non-positive count means no comments are needed, so an early return avoids an unnecessary loop.
   * The remaining flow generates the requested number of records so card counts and detail lists share the same data.
   */
  if (count <= 0) return [];

  const result: TaskComment[] = [];

  for (let i = 0; i < count; i++) {
    result.push({
      avatar: faker.image.avatarGitHub(),
      content: faker.lorem.lines({ min: 1, max: 3 }),
      username: faker.person.fullName(),
      time: faker.date.past()
    });
  }

  return result;
};

/**
 * 生成任务附件图片地址。
 * @param count - 需要生成的附件数量。
 * @returns 图片地址列表；任务卡片会使用第一张图片作为封面预览。
 *
 * Generates task attachment image URLs.
 * @param count - Number of attachments to generate.
 * @returns Image URL list; task cards use the first image as the preview cover.
 */
const generateAttachment = (count: number): string[] => {
  /*
   * 无附件时直接返回空数组，让任务卡片可以安全读取 length 和第一张预览图。
   * 有附件时按数量生成独立地址，供卡片预览和详情列表共同使用。
   *
   * An empty attachment set returns immediately so task cards can safely read length and the first preview image.
   * Otherwise, independent URLs are generated for both card previews and the detail list.
   */
  if (count <= 0) return [];

  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    result.push(faker.image.urlPicsumPhotos());
  }

  return result;
};

/**
 * 生成任务负责人头像地址。
 * @param count - 需要生成的负责人数量。
 * @returns 负责人头像地址列表；原始模块用头像数组模拟轻量用户信息。
 *
 * Generates task assignee avatar URLs.
 * @param count - Number of assignees to generate.
 * @returns Assignee avatar URL list; the source module uses avatar arrays as lightweight user data.
 */
const generateAssignee = (count: number): string[] => {
  /*
   * 无负责人时保持空数组，避免调用方为可选展示额外处理 null。
   * 有负责人时按数量生成头像地址，用于验证卡片截断和详情完整展示。
   *
   * An unassigned task keeps an empty array so consumers do not need extra null handling.
   * Otherwise, avatar URLs are generated to exercise truncated card previews and complete detail rendering.
   */
  if (count <= 0) return [];

  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    result.push(faker.image.avatarGitHub());
  }

  return result;
};

/**
 * 生成不重复的任务标签。
 * @param count - 需要生成的标签数量。
 * @returns 标签列表；当请求数量超过可用标签数量时，会自动收敛到最大标签数。
 *
 * Generates unique task tags.
 * @param count - Number of tags to generate.
 * @returns Tag list; when the requested count exceeds available tags, it is capped at the maximum tag count.
 */
const generateTag = (count: number): string[] => {
  if (count <= 0) return [];

  const allTagCount = Object.keys(TASK_TAG_MAP).length;
  if (count > allTagCount) count = allTagCount;

  const uniqueArray: string[] = [];
  const already = new Set<string>();

  /*
   * 标签会作为详情面板中的分类徽章展示，重复标签没有业务意义。
   * 随机生成时用 Set 去重，避免同一张任务卡出现重复分类。
   * 这里使用 while 是因为随机命中重复标签时不能算一次有效结果，循环条件应该由“已收集的唯一标签数量”决定，而不是由固定尝试次数决定。
   * 上面的数量收敛可以保证 count 不超过可用标签总数，避免 while 永远收集不够结果。
   *
   * Tags are displayed as category badges in the detail panel, and duplicates add no business value.
   * A Set keeps random generation unique so the same task does not show repeated categories.
   * The loop uses while because a duplicated random tag is not a valid result; the stop condition should depend on the number of collected unique tags, not a fixed attempt count.
   * The count cap above ensures count never exceeds the available tag total, preventing the while loop from waiting for impossible results.
   */
  while (uniqueArray.length < count) {
    const randomElement = faker.helpers.enumValue(TASK_TAG_MAP);
    if (!already.has(randomElement)) {
      uniqueArray.push(randomElement);
      already.add(randomElement);
    }
  }

  return uniqueArray;
};

/**
 * 生成任务字典。
 * @param count - 需要生成的任务数量。
 * @returns 以任务 id 为 key 的任务字典，匹配 DnD 看板的 tasks 数据结构。
 *
 * Generates a task dictionary.
 * @param count - Number of tasks to generate.
 * @returns Task dictionary keyed by task id, matching the DnD board tasks data shape.
 */
const generateTask = (count: number): TaskMap => {
  /*
   * 看板列只保存 taskIds，因此 mock 数据必须生成 Record<string, Task>。
   * 这样拖拽时只需要调整列中的 id 顺序，任务详情仍然从 tasks 字典读取。
   *
   * Board columns only store taskIds, so mock data must be generated as Record<string, Task>.
   * Dragging only changes id order in columns, while task details are still read from the tasks dictionary.
   */
  return Object.fromEntries(
    Array.from({ length: count }, (_, index) => {
      const id = `task-${index + 1}`;

      return [
        id,
        {
          id,
          title: faker.lorem.words(faker.number.int({ min: 3, max: 5 })),
          reporter: faker.image.avatarGitHub(),
          assignee: generateAssignee(faker.number.int({ min: 0, max: 1 })),
          date: faker.date.future(),
          priority: faker.helpers.enumValue(TASK_PRIORITY_MAP),
          tags: generateTag(faker.number.int({ min: 0, max: 5 })),
          comments: generateComment(faker.number.int({ min: 0, max: 3 })),
          attachments: generateAttachment(faker.number.int({ min: 0, max: 3 }))
        }
      ];
    })
  );
};

/**
 * 生成看板默认列标题。
 * 列标题需要跟随当前语言初始化，避免页面切到中文后仍然保留英文阶段名。
 * @param t - 国际化翻译函数。
 * @returns 默认列标题列表。
 *
 * Builds the default board column titles.
 * Column titles are initialized from the current locale so the board does not keep English stage names after switching to Chinese.
 * @param t - Translation function.
 * @returns Default column title list.
 */
export const getDefaultKanbanColumnTitles = (t: TFunction): string[] => [
  t('pages.others.kanban.columns.todo'),
  t('pages.others.kanban.columns.inProgress'),
  t('pages.others.kanban.columns.done')
];

/**
 * 生成看板初始化数据。
 * tasks 保存任务详情，columns 保存每列包含哪些任务，columnOrder 保存列的横向展示顺序。
 * 这种拆分结构来自原始 kanban 模块：拖拽列时只改 columnOrder，拖拽任务时只改对应列的 taskIds。
 * @param t - 国际化翻译函数。
 * @returns 看板初始数据。
 *
 * Generates the initial board data.
 * tasks stores task details, columns stores which tasks each column contains, and columnOrder stores horizontal column order.
 * This normalized shape comes from the source kanban module: dragging columns updates columnOrder, while dragging tasks update taskIds in affected columns.
 * @param t - Translation function.
 * @returns Initial board data.
 */
export const getInitialKanbanData = (t: TFunction): DndDataType => {
  const [todoTitle, inProgressTitle, doneTitle] = getDefaultKanbanColumnTitles(t);

  const initialData: DndDataType = {
    /*
     * 这里先放空对象，随后由 generateTask(6) 填充。
     * 这样任务数量和 columns.taskIds 中引用的 task-1 到 task-6 保持一致。
     *
     * This starts as an empty object and is populated by generateTask(6) below.
     * That keeps the generated task count aligned with task-1 through task-6 referenced by columns.taskIds.
     */
    tasks: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: todoTitle,
        taskIds: ['task-1', 'task-2', 'task-3']
      },
      'column-2': {
        id: 'column-2',
        title: inProgressTitle,
        taskIds: ['task-4', 'task-5']
      },
      'column-3': {
        id: 'column-3',
        title: doneTitle,
        taskIds: ['task-6']
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
  };

  initialData.tasks = generateTask(6);

  return initialData;
};
