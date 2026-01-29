/** 通知文件类型 / Notification file types */
export type FileType = 'ppt' | 'excel' | 'word' | 'figma';

/** 标签类型 / Notification tag type */
export type NoticeTag = 'Client-Request' | 'Figma' | 'Redesign' | 'Improvement' | 'Bug';

/**
 * 单条通知的数据结构 / Notification item structure
 */
export interface NotificationItemProps {
  /** 唯一标识 / Unique identifier */
  id: number;

  /** 通知类型 / Type of notification */
  type:
    | 'mention'
    | 'tags'
    | 'access'
    | 'file'
    | 'article'
    | 'project'
    | 'user_request'
    | 'success'
    | 'task'
    | 'upgrade'
    | 'meeting'
    | 'upload'
    | 'comment'
    | 'invitation'
    | 'edit_request';

  /** 发起通知的用户 / User who triggered the notification */
  user?: string;

  /** 动作描述 / Action text */
  action?: string;

  /** 目标对象 / Target of the action */
  target?: string;

  /** 目标类型 / Type of target (e.g., project, topic) */
  targetType?: string;

  /** 目标日期（可选） / Target date */
  targetDate?: string;

  /** 消息内容 / Optional message content */
  message?: string;

  /** 消息时间 / message time */
  time?: string;

  /** 文件名 / File name */
  fileName?: string;

  /** 文件大小 / File size */
  fileSize?: string;

  /** 文件类型 / File type (ppt, excel, word, figma) */
  fileType?: FileType;

  /** 编辑时间 / Edited time */
  editedTime?: string;

  /** 标签列表 / Array of tags */
  tags?: NoticeTag[];

  /** 任务标题 / Task title */
  taskTitle?: string;

  /** 任务截止日期 / Task due date */
  dueDate?: string;

  /** 任务负责人数量 / Number of assignees */
  assignees?: number;

  /** 部门 / Department */
  department?: string;

  /** 是否成功通知 / Success notification flag */
  isSuccess?: boolean;

  /** 会议标题 / Meeting title */
  meetingTitle?: string;

  /** 会议时间 / Meeting time string */
  meetingTime?: string;

  /** 会议日期 / Meeting date string */
  meetingDate?: string;

  /** 会议参与者数量 / Number of attendees */
  attendees?: number;

  /** 附件文件列表 / Multiple files */
  files?: Array<{
    /** 文件名 / File name */
    name: string;
    /** 文件大小 / File size */
    size: string;
    /** 文件类型 / File type */
    type: FileType;
  }>;

  /** 艺术作品列表 / Artworks */
  artworks?: Array<{
    /** 艺术作品唯一ID / Artwork ID */
    id: string | number;
    /** 艺术作品标题 / Artwork title */
    title: string;
  }>;

  /** 是否显示头像 / Show avatar */
  hasAvatar?: boolean;

  /** 是否显示操作按钮 / Show action buttons (Accept/Decline) */
  hasActions?: boolean;

  /** 是否显示回复框 / Show reply input */
  hasReply?: boolean;

  /** 是否显示个人资料操作 / Show profile action */
  hasProfileAction?: boolean;
}

/**
 * 通知数据
 * Notification data
 */
export interface NotificationData {
  all: NotificationItemProps[];
  inbox: NotificationItemProps[];
  team: NotificationItemProps[];
}
