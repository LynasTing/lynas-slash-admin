import { Card } from '@/ui/card';
import { Icon } from '@/components/icon';
import { Text } from '@/ui/typography';
import { GLOBAL_CONFIG } from '@/config/global';
import { Avatar, AvatarImage } from '@/ui/avatar';
import Button from '@/ui/button';

/**
 * 项目用户类型
 * Project user type
 */
export interface ProjectUser {
  /**
   * 头像
   * Avatar
   */
  avatar: string;

  /**
   * 昵称
   * Nickname
   */
  name: string;
}

/**
 * 项目成员
 * Project members
 */
export function ProjectMembers({ projectUsers }: { projectUsers: ProjectUser[] }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-6">
      <Text variant="body2" className="mb-2 font-semibold">
        {GLOBAL_CONFIG.appName}
      </Text>
      <div className="mb-2 flex -space-x-2">
        {projectUsers.map(item => (
          <Avatar key={item.name} className="inline-block h-8 w-8 rounded-full">
            <AvatarImage src={item.avatar} />
          </Avatar>
        ))}
      </div>
      <Button className="flex h-10 w-10 items-center justify-center rounded-full" size="icon" variant="secondary">
        <Icon icon="mdi:plus" size={20} />
      </Button>
    </Card>
  );
}
