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
    <Card className="flex flex-col justify-center items-center gap-4 p-6">
      <Text variant="body2" className="font-semibold mb-2">
        {GLOBAL_CONFIG.appName}
      </Text>
      <div className="flex -space-x-2 mb-2">
        {projectUsers.map(item => (
          <Avatar key={item.name} className="inline-block w-8 h-8 rounded-full">
            <AvatarImage src={item.avatar} />
          </Avatar>
        ))}
      </div>
      <Button className="flex justify-center items-center w-10 h-10 rounded-full" size="icon" variant="secondary">
        <Icon icon="mdi:plus" size={20} />
      </Button>
    </Card>
  );
}
