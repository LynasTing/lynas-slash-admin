import { faker } from '@faker-js/faker';
import { Card } from '@/ui/card';
import { Text } from '@/ui/typography';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import useLocale from '@/locales/use-locale';

/**
 * 用户联系人面板。
 * User connections panel.
 */
function ConnectionsPanel() {
  // 国际化函数 / Translation function
  const { t } = useLocale();

  // 联系人卡片数据 / Connection card items
  const items = [
    {
      avatar: faker.image.avatarGitHub(),
      name: faker.person.fullName(),
      title: 'UI Designer',
      tags: ['Figma', 'Sketch'],
      projects: '18',
      tasks: '834',
      connections: '129',
      connected: Math.random() > 0.5
    },
    {
      avatar: faker.image.avatarGitHub(),
      name: faker.person.fullName(),
      title: 'Developer',
      tags: ['Angular', 'React'],
      projects: '118',
      tasks: '2.32k',
      connections: '1.29k',
      connected: Math.random() > 0.5
    },
    {
      avatar: faker.image.avatarGitHub(),
      name: faker.person.fullName(),
      title: 'Developer',
      tags: ['Html', 'React'],
      projects: '32',
      tasks: '1.25k',
      connections: '890',
      connected: Math.random() > 0.5
    },
    {
      avatar: faker.image.avatarGitHub(),
      name: faker.person.fullName(),
      title: 'UI/UX Designer',
      tags: ['Figma', 'Sketch', 'Photoshop'],
      projects: '86',
      tasks: '12.4k',
      connections: '890',
      connected: Math.random() > 0.5
    },
    {
      avatar: faker.image.avatarGitHub(),
      name: faker.person.fullName(),
      title: 'Full Stack Developer',
      tags: ['React', 'Html', 'Node.js'],
      projects: '244',
      tasks: '23.9k',
      connections: '2.14k',
      connected: Math.random() > 0.5
    },
    {
      avatar: faker.image.avatarGitHub(),
      name: faker.person.fullName(),
      title: 'SEO',
      tags: ['Analysis', 'Writing'],
      projects: '32',
      tasks: '1.28k',
      connections: '1.27k',
      connected: Math.random() > 0.5
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} className="w-full flex-col items-center">
          <img src={item.avatar} className="size-20 rounded-full" alt={t('pages.management.user.profile.avatarAlt', { name: item.name })} />
          <Text variant="body1" className="mt-4 font-semibold">
            {item.name}
          </Text>
          <Text variant="body2" className="opacity-50">
            {item.title}
          </Text>
          <div className="mt-4 flex gap-4">
            {item.tags.map((sub, subIndex) => (
              <Badge key={subIndex} variant="info">
                {sub}
              </Badge>
            ))}
          </div>
          <ul className="mt-4 flex gap-4">
            <li className="flex flex-col items-center">
              <Text variant="body1" className="font-semibold">
                {item.projects}
              </Text>
              <Text variant="body2" className="opacity-50">
                {t('pages.management.user.profile.stats.projects')}
              </Text>
            </li>
            <li className="flex flex-col items-center">
              <Text variant="body1" className="font-semibold">
                {item.tasks}
              </Text>
              <Text variant="body2" className="opacity-50">
                {t('pages.management.user.profile.stats.tasks')}
              </Text>
            </li>
            <li className="flex flex-col items-center">
              <Text variant="body1" className="font-semibold">
                {item.connections}
              </Text>
              <Text variant="body2" className="opacity-50">
                {t('pages.management.user.profile.stats.connections')}
              </Text>
            </li>
          </ul>

          <Button variant={item.connected ? 'default' : 'outline'} className="cursor-pointer">
            <Icon icon="ri:user-add-line" size={14} />
            <Text variant="body2" className="ml-2">
              {item.connected ? t('pages.management.user.profile.actions.connected') : t('pages.management.user.profile.actions.connect')}
            </Text>
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default ConnectionsPanel;
