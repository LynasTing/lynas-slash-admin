/** 文件类型 / Notification file types */
export type FileType = 'ppt' | 'excel' | 'word' | 'figma' | 'svg';

/** 标签类型 / Notification tag type */
export type NoticeTag = 'Client-Request' | 'Figma' | 'Redesign' | 'Improvement' | 'Bug';

/** 通知类型 / Notification type enum */
export type NoticeType =
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
  | 'view_allowed'
  | 'invitation'
  | 'edit_request';

/**
 * 文件结构
 * file structure
 */
export interface NoticeFile {
  /** 文件名 / File name */
  name: string;

  /** 文件大小 / File size */
  size: string;

  /** 文件类型 / File type */
  type: FileType;
}

/**
 * 作品列表
 * Artworks
 */
export interface NoticeArtwork {
  /** 作品唯一ID / Artwork ID */
  id: string | number;

  /** 作品标题 / Artwork title */
  title: string;
}

/**
 * 会议结构
 * meeting
 */
export interface NoticeMeeting {
  /** 会议标题 / Meeting title */
  title: string;

  /** 会议时间 / Meeting time */
  time: string;

  /** 会议日期 / Meeting date */
  date: string;

  /** 参会人数 / Number of attendees */
  attendees: number;
}

/**
 * 任务
 * task
 */
export interface NoticeTask {
  /** 任务标题 / Task title */
  title: string;

  /** 任务截止日期 / Task due date */
  dueDate?: string;

  /** 任务负责人数量 / Number of assignees */
  assignees?: number;
}

/**
 * 单条通知的数据结构
 * Notification item structure
 */
export interface NotificationProps {
  /** 唯一标识 / Unique identifier */
  id: string | number;

  /** 通知类型 / Type of notification */
  type: NoticeType;

  /** 发起通知的用户 / User who triggered the notification */
  user?: string;

  /** 动作描述 / Action text */
  action?: string;

  /** 目标对象 / Target of the action */
  target?: string;

  /** 目标类型 / Type of target (e.g., project, topic) */
  targetType?: string;

  /** 消息时间 / Message time */
  time: string;

  /** 部门 / Department */
  department?: string;

  /** 消息内容 / Optional message content */
  message?: string;

  /** 是否显示回复框 / Show reply input */
  hasReply?: boolean;

  /** 是否显示头像 / Show avatar */
  hasAvatar?: boolean;

  /** 标签列表 / Array of tags */
  tags?: NoticeTag[];

  /** 文件 / file */
  file?: NoticeFile;

  /** 文件名 / File name */
  fileName?: string;

  /** 文件大小 / File size */
  fileSize?: string;

  /** 文件类型 / File type */
  fileType?: FileType;

  /** 编辑时间 / Edited time */
  editedTime?: string;

  /** 附件文件列表 / Multiple files */
  files?: Array<NoticeFile>;

  /** 会议信息 / Meeting information */
  meeting?: NoticeMeeting;

  /** 用户名 / User name */
  userName?: string;

  /** 用户邮箱 / User email */
  userEmail?: string;

  /** 是否成功通知 / Success notification flag */
  isSuccess?: boolean;

  /** 是否显示操作按钮 / Show action buttons (Accept/Decline) */
  hasActions?: boolean;

  /** 是否显示个人资料操作 / Show profile action */
  hasProfileAction?: boolean;

  /** 目标日期（可选） / Target date */
  targetDate?: string;

  /** 艺术作品列表 / Artworks */
  artworks?: NoticeArtwork[];

  /** 任务 */
  task?: NoticeTask;
}
