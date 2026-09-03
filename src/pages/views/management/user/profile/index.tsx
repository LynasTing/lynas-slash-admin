import Banner1IMG from '@/assets/images/background/banner_1.png';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { useUserInfo } from '@/store/user';
import { Text, Title } from '@/ui/typography';
import { Icon } from '@/components/icon';
import { themeVars } from '@/theme/theme.css';
import useLocale from '@/locales/use-locale';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs';
import ProfilePanel from './profile-panel';
import TeamsPanel from './teams-panel';
import ProjectsPanel from './projects-panel';
import ConnectionsPanel from './connections-panel';
import type { ReactNode } from 'react';

type UserProfileTab = {
  icon: ReactNode;
  title: string;
  value: string;
  content: ReactNode;
};

/**
 * 用户资料页面。
 * User profile page.
 */
export default function UserProfile() {
  // 当前用户头像和用户名 / Current user avatar and username
  const { avatar, username } = useUserInfo();
  // 国际化函数 / Translation function
  const { t } = useLocale();

  // 用户资料页签配置 / User profile tab configuration
  const tabs: UserProfileTab[] = [
    {
      icon: <Icon icon="solar:user-id-bold" size={24} className="mr-2" />,
      title: t('pages.management.user.profile.tabs.profile'),
      value: 'profile',
      content: <ProfilePanel />
    },
    {
      icon: <Icon icon="solar:users-group-rounded-bold" size={24} className="mr-2" />,
      title: t('pages.management.user.profile.tabs.teams'),
      value: 'teams',
      content: <TeamsPanel />
    },
    {
      icon: <Icon icon="solar:folder-with-files-bold" size={24} className="mr-2" />,
      title: t('pages.management.user.profile.tabs.projects'),
      value: 'projects',
      content: <ProjectsPanel />
    },
    {
      icon: <Icon icon="solar:link-circle-bold" size={24} className="mr-2" />,
      title: t('pages.management.user.profile.tabs.connections'),
      value: 'connections',
      content: <ConnectionsPanel />
    }
  ];

  return (
    <div className="flex flex-col space-y-4">
      <div
        className="inset-0 flex flex-col items-center justify-center gap-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${Banner1IMG}")`
        }}>
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatar} className="rounded-full" />
        </Avatar>
        <div className="flex items-center space-x-2">
          <Title as="h5">{username}</Title>
          <Icon icon="heroicons:check-badge-solid" size={20} color={themeVars.colors.palette.success.default} />
        </div>
        <Text variant="body2">{t('pages.management.user.profile.tsFullStack')}</Text>
      </div>
      <Tabs defaultValue={tabs[0].value}>
        <TabsList className="mx-auto mb-4">
          {tabs.map(item => (
            <TabsTrigger key={item.value} value={item.value} className="flex space-x-2">
              {item.icon}
              <span>{item.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(item => (
          <TabsContent key={item.value} value={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
