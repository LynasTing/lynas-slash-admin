import type { FileType, NoticeTag, NotificationProps } from './types';
import { Badge } from '@/ui/badge';
import { Text } from '@/ui/typography';
import { Icon } from '@/components/icon';
import Button from '@/ui/button';
import AvatarGroup from '@/components/avatar-group';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { faker } from '@faker-js/faker';
import { Input } from '@/ui/input';

const FILE_ICON_MAP: Record<FileType, string> = {
  ppt: 'local:file-ppt',
  excel: 'local:file-excel',
  word: 'local:file-word',
  figma: 'local:file-psd'
};

const TAG_COLOR_MAP: Record<NoticeTag, string> = {
  'Client-Request': 'bg-purple-100 text-purple-700',
  Figma: 'bg-orange-100 text-orange-700',
  Redesign: 'bg-gray-100 text-gray-700',
  Improvement: 'bg-green-100 text-green-700',
  Bug: 'bg-red-100 text-red-700'
};

/**
 * 获取文件图标
 */
const getFileIcon = (file: FileType) => FILE_ICON_MAP[file] ?? 'local:file';
/**
 * 获取标签颜色
 */
const getTagColor = (tag: NoticeTag) => TAG_COLOR_MAP[tag] ?? 'bg-gray-100 text-gray-700';

/**
 * 头像通知
 * Notification Avatar
 */
function NotificationAvatar(props: Pick<NotificationProps, 'hasAvatar' | 'isSuccess'>) {
  const { hasAvatar, isSuccess } = props;

  if (hasAvatar) {
    return (
      <div className="relative">
        <div className="flex justify-center items-center w-10 h-10 text-sm font-medium rounded-full bg-bg-neutral">CH</div>
        <div className="absolute bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex justify-center items-center w-10 h-10 rounded-full bg-bg-neutral">
        <Badge shape="circle" variant="success">
          <Icon icon="solar:check-circle-bold" size={20} />
        </Badge>
      </div>
    );
  }

  return null;
}

/**
 * 通知时间与部门
 * Notification meta info
 */
function NotificationMeta(props: Pick<NotificationProps, 'time' | 'department'>) {
  const { time, department } = props;

  return (
    <div className="flex items-center space-x-2 mt-1">
      {time && (
        <Text variant="subTitle2" color="secondary">
          {time}
        </Text>
      )}
      {department && (
        <>
          <Text variant="caption" color="secondary">
            •
          </Text>
          <Text variant="caption" color="secondary">
            {department}
          </Text>
        </>
      )}
    </div>
  );
}

/**
 * 标题
 * Title
 */
function NotificationTitle(
  props: Pick<NotificationProps, 'type' | 'message' | 'user' | 'action' | 'target' | 'targetType' | 'targetDate'>
) {
  const { type, message, user, action, target, targetType, targetDate } = props;
  if (type === 'success' || type === 'view_allowed') {
    return <Text>{message}</Text>;
  }

  return (
    <>
      <Text variant="subTitle2">{user}</Text>
      <Text variant="subTitle2" color="secondary">
        {action}{' '}
      </Text>
      {target && (
        <Text variant="subTitle2" color="primary">
          {target}
        </Text>
      )}
      {targetType && (
        <Text variant="subTitle2" color="secondary">
          {targetType}
        </Text>
      )}
      {targetDate && (
        <Text variant="subTitle2" color="secondary">
          {' '}
          to {targetDate}
        </Text>
      )}
    </>
  );
}

/**
 * 信息
 * Message
 */
function NotificationMessage(props: Pick<NotificationProps, 'message' | 'type'>) {
  const { message, type } = props;

  if (message && type !== 'success') {
    return (
      <div className="mt-3 p-3 bg-bg-neutral rounded-lg">
        <Text variant="caption">{message}</Text>
      </div>
    );
  }

  return null;
}

/**
 * 用户请求
 * user request
 */
function NotificationUserRequest(props: Pick<NotificationProps, 'userName' | 'type' | 'userEmail'>) {
  const { userName, type, userEmail } = props;

  if (type === 'user_request') {
    return (
      <div className="mt-3 p-3 bg-bg-neutral rounded-lg">
        <div className="flex justify-between items-center">
          <Text variant="subTitle2">{userName}</Text>
          <Text variant="subTitle2" color="secondary">
            {userEmail}
          </Text>
        </div>
        <Button variant="outline" size="sm">
          Go to profile
        </Button>
      </div>
    );
  }

  return null;
}

/**
 * 会议
 * meeting
 */
function NotificationMeeting(props: Pick<NotificationProps, 'id' | 'type' | 'meeting'>) {
  const { id, type, meeting } = props;

  if (type === 'meeting' && typeof meeting?.attendees === 'number') {
    return (
      <div className="mt-3 p-4 bg-bg-neutral rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <Badge variant="warning">{meeting?.date.split(' ')[0]}</Badge>
              <div className="text-lg font-bold mt-1">
                <Text variant="subTitle2">{meeting?.date.split(' ')[1]}</Text>
              </div>
            </div>
            <div className="flex flex-col">
              <Text variant="subTitle2">{meeting?.title}</Text>
              <Text variant="caption" color="secondary">
                {meeting?.time}
              </Text>
            </div>
          </div>
          <AvatarGroup max={{ count: 4 }} size="small">
            {Array.from({ length: meeting?.attendees }).map((_, i) => (
              <Avatar key={`attendee-${id}-${i}`}>
                <AvatarImage src={faker.image.avatarGitHub()} />
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * 文件
 * file
 */
function NotificationFile(props: Pick<NotificationProps, 'fileName' | 'fileType' | 'fileSize' | 'editedTime'>) {
  const { fileName, fileType, fileSize, editedTime } = props;

  if (fileName) {
    return (
      <div className="flex items-center space-x-3 mt-3 p-3 bg-bg-neutral rounded-lg ">
        {fileType && <Icon icon={getFileIcon(fileType)} size={32} />}
        <div className="flex-1">
          <Text variant="subTitle2">{fileName}</Text>
          <Text variant="caption" color="secondary">
            {fileSize}
            {editedTime && ` • Edited ${editedTime}`}
          </Text>
        </div>
        <Button variant="outline" size="sm">
          <Icon icon="solar:download-linear" size={16} />
        </Button>
      </div>
    );
  }

  return null;
}

/**
 * 多文件
 * multiple files
 */
function NotificationMultipleFile(props: Pick<NotificationProps, 'files'>) {
  if (props.files && Array.isArray(props.files)) {
    return (
      <div className="mt-3 space-y-2">
        {props.files.map(item => (
          <div key={item.name} className="flex items-center space-x-4 p-3 bg-bg-neutral rounded-lg">
            <Icon icon={getFileIcon(item.type)} size={32} />
            <div className="flex-1">
              <Text variant="subTitle2">{item.name}</Text>
              <Text variant="caption" color="secondary">
                {item.size}
              </Text>
            </div>
            <Button variant="outline" size="sm">
              <Icon icon="solar:download-linear" size={16} />
            </Button>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

/**
 * 作品
 * artworks
 */
function NotificationArtworks(props: Pick<NotificationProps, 'artworks'>) {
  if (props.artworks) {
    return (
      <div className="grid grid-cols-2 gap-3 mt-3">
        {props.artworks.map(item => (
          <div key={item.id} className="relative">
            <div className="aspect-video rounded-lg bg-linear-to-br from-purple-400 to-pink-400">
              <div className="mt-2">
                <Text variant="subTitle2">{item.title}</Text>
                <Text variant="caption" color="secondary">
                  Token ID: {item.id}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/**
 * 标签
 * tag
 */
function NotificationTags(props: Pick<NotificationProps, 'tags'>) {
  if (props.tags) {
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {props.tags.map(item => (
          <Badge key={item} variant="default">
            {item}
          </Badge>
        ))}
      </div>
    );
  }
  return null;
}

/**
 * 任务
 * task
 */
function NotificationTask(props: Pick<NotificationProps, 'id' | 'task' | 'tags'>) {
  const { id, task, tags } = props;
  if (task) {
    return (
      <div className="bg-bg-neutral pt-3 mt-3 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Text variant="subTitle2">{task.title}</Text>
            <Text variant="caption" color="secondary">
              Due Date: {task.dueDate}
            </Text>
            <div className="flex items-center space-x-2 mt-2">
              {tags?.map(item => (
                <span key={item} className={`px-2 py-1 text-xs rounded-full ${getTagColor(item)}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex -space-x-2">
            {task.assignees &&
              Array.from({ length: task.assignees }).map((_, idx) => (
                <div key={`attendee-${id}-${idx}`} className="w-6 h-6 rounded-full bg-bg-neutral border-2" />
              ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
}

/**
 * 操作
 * action
 */
function NotificationActions(props: Pick<NotificationProps, 'hasActions'>) {
  if (props.hasActions) {
    return (
      <div className="flex space-x-2 mt-3">
        <Button size="sm">Accept</Button>
        <Button variant="outline" size="sm">
          Decline
        </Button>
      </div>
    );
  }
  return null;
}

/**
 * 回复
 * reply
 */
function NotificationReply(props: Pick<NotificationProps, 'hasReply'>) {
  if (props.hasReply) {
    return (
      <div className="mt-3">
        <div className="flex items-center space-x-2">
          <Input placeholder="Reply" />
          <Button variant="ghost" size="sm">
            <Icon icon="solar:gallery-linear" size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * 个人资料
 * profile
 */
function NotificationProfileAction() {
  return (
    <div className="flex items-center space-x-2 mt-3">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Icon icon="solar:check-circle-bold" size={16} className="text-green-600" />
        <span>Connected</span>
      </div>
      <Button variant="outline" size="sm">
        Go to profile
      </Button>
    </div>
  );
}

export default function NoticeItem(notice: NotificationProps) {
  return (
    <div className="flex items-start space-x-3 py-4 border-b border-border last:border-b-0">
      <NotificationAvatar {...notice} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <div className="flex-1">
            <NotificationTitle {...notice} />
            <NotificationMeta {...notice} />
          </div>
        </div>
        <NotificationMessage {...notice} />
        <NotificationUserRequest {...notice} />
        <NotificationMeeting {...notice} />
        <NotificationFile {...notice} />
        <NotificationMultipleFile {...notice} />
        <NotificationArtworks {...notice} />
        <NotificationTags {...notice} />
        <NotificationTask {...notice} />
        <NotificationActions {...notice} />
        <NotificationReply {...notice} />
        <NotificationProfileAction />
      </div>
    </div>
  );
}
