import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { faker } from '@faker-js/faker';
import { Icon } from '@/components/icon';
import useLocale from '@/locales/use-locale';
import { useUserInfo } from '@/store/user';
import { Timeline } from 'antd';
import { themeVars } from '@/theme/theme.css';
import { Text } from '@/ui/typography';
import Button from '@/ui/button';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';

/**
 * 用户资料侧栏面板。
 * User profile side panel.
 */
export default function ProfilePanel() {
  // 国际化函数 / Translation function
  const { t } = useLocale();
  // 当前登录用户名 / Current logged-in username
  const { username } = useUserInfo();

  // 个人简介信息项 / About section items
  const abountItems = [
    {
      icon: <Icon icon="fa-solid:user" size={18} />,
      label: t('pages.management.user.profile.fullName'),
      val: username
    },
    {
      icon: <Icon icon="eos-icons:role-binding" size={18} />,
      label: t('pages.management.user.profile.role'),
      val: t('pages.management.user.profile.roles.developer')
    },
    {
      icon: <Icon icon="tabler:location-filled" size={18} />,
      label: t('pages.management.user.profile.country'),
      val: t('pages.management.user.profile.countries.usa')
    },
    {
      icon: <Icon icon="ion:language" size={18} />,
      label: t('pages.management.user.profile.language'),
      val: t('pages.management.user.profile.languages.english')
    },
    {
      icon: <Icon icon="ph:phone-fill" size={18} />,
      label: t('pages.management.user.profile.contact'),
      val: '(123)456-7890'
    },
    {
      icon: <Icon icon="ic:baseline-email" size={18} />,
      label: t('pages.management.user.profile.email'),
      val: 'LynasTing@proton.me'
    }
  ];

  // 联系人卡片数据 / Connections card items
  const connectionsItems = Array.from({ length: 5 }, () => ({
    avatar: faker.image.avatarGitHub(),
    name: faker.person.fullName(),
    connection: t('pages.management.user.profile.connectionCount', { count: faker.number.int(100) }),
    connected: faker.datatype.boolean()
  }));

  // 主色值，供连接状态样式复用 / Primary theme color reused by connection state styles
  const defaultThemeVar = themeVars.colors.palette.primary.default;

  // 团队卡片数据 / Teams card items
  const teamItems = [
    {
      avatar: <Icon icon="devicon:react" size={36} />,
      name: 'React Developers',
      members: t('pages.management.user.profile.memberCount', { count: faker.number.int(100) }),
      tag: <Badge variant="warning">Developer</Badge>
    },
    {
      avatar: <Icon icon="devicon:figma" size={36} />,
      name: 'UI Designer',
      members: t('pages.management.user.profile.memberCount', { count: faker.number.int() }),
      tag: <Badge variant="info">Designer</Badge>
    },
    {
      avatar: <Icon icon="logos:jest" size={36} />,
      name: 'Test Team',
      members: t('pages.management.user.profile.memberCount', { count: faker.number.int(100) }),
      tag: <Badge variant="success">Test</Badge>
    },
    {
      avatar: <Icon icon="logos:nestjs" size={36} />,
      name: 'Nest.js Developers',
      members: t('pages.management.user.profile.memberCount', { count: faker.number.int(100) }),
      tag: <Badge variant="warning">Developer</Badge>
    },

    {
      avatar: <Icon icon="logos:twitter" size={36} />,
      name: 'Digital Marketing',
      members: t('pages.management.user.profile.memberCount', { count: faker.number.int(100) }),
      tag: <Badge variant="info">Marketing</Badge>
    }
  ];

  // 时间线条目 / Activity timeline items
  const timelineItems = [
    {
      color: themeVars.colors.palette.error.default,
      children: (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Text>8 Invoices have been paid</Text>
            <div className="opacity-50">Wednesday</div>
          </div>
          <Text variant="caption" color="secondary">
            Invoices have been paid to the company.
          </Text>

          <div className="mt-2 flex items-center gap-2">
            <Icon icon="local:file-pdf" size={30} />
            <span className="font-medium opacity-60">invoice.pdf</span>
          </div>
        </div>
      )
    },
    {
      color: themeVars.colors.palette.primary.default,
      children: (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Text>Create a new project for client 😎</Text>
            <div className="opacity-50">April, 18</div>
          </div>
          <Text variant="caption" color="secondary">
            Project kickoff has been prepared for the client.
          </Text>
          <div className="mt-2 flex items-center gap-2">
            <img src={faker.image.avatarGitHub()} className="h-8 w-8 rounded-full" alt={t('pages.management.user.profile.clientAvatarAlt')} />
            <span className="font-medium opacity-60">{faker.person.fullName()} (client)</span>
          </div>
        </div>
      )
    },
    {
      color: themeVars.colors.palette.info.default,
      children: (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Text>Order #37745 from September</Text>
            <div className="opacity-50">January, 10</div>
          </div>
          <Text variant="caption" color="secondary">
            Invoices have been paid to the company.
          </Text>
        </div>
      )
    },
    {
      color: themeVars.colors.palette.warning.default,
      children: (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Text>Public Meeting</Text>
            <div className="opacity-50">September, 30</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Top */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('pages.management.user.profile.about')}</CardTitle>
            <CardDescription>{faker.lorem.paragraph()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {abountItems.map(item => (
                <div className="flex space-x-2" key={item.label}>
                  <div>{item.icon}</div>
                  <div>{item.label}:</div>
                  <div className="opacity-50">{item.val}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>{t('pages.management.user.profile.timeline.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline className="mt-4! w-full" items={timelineItems} />
          </CardContent>
        </Card>
      </div>
      {/* Bottom */}
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{t('pages.management.user.profile.connections')}</CardTitle>
            <Button variant="ghost" size="icon">
              <Icon icon="fontisto:more-v-a" />
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4">
              {connectionsItems.map((item, index) => (
                <li key={index} className="flex items-center gap-x-4">
                  <Avatar>
                    <AvatarImage className="size-10 rounded-full" src={item.avatar} />
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-y-1">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-xs opacity-50">{item.connection}</span>
                  </div>
                  <div
                    className="flex size-8 flex-none items-center justify-center rounded"
                    style={{
                      backgroundColor: item.connected ? defaultThemeVar : 'transparent',
                      border: item.connected ? 'none' : `1px solid ${defaultThemeVar}`
                    }}>
                    <Icon icon="tdesign:user" color={item.connected ? 'white' : defaultThemeVar} size={20} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{t('pages.management.user.profile.teams.title')}</CardTitle>
            <Button variant="ghost" size="icon">
              <Icon icon="fontisto:more-v-a" />
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4">
              {teamItems.map((item, index) => (
                <li key={index} className="flex items-center gap-x-4">
                  {item.avatar}
                  <div className="flex flex-1 flex-col gap-y-1">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-xs opacity-50">{item.members}</span>
                  </div>
                  <div className="h-6">{item.tag}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
