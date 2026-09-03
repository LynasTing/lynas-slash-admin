import { Icon } from '@/components/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import useLocale from '@/locales/use-locale';
import GeneralPanel from './general-panel';
import NotificationsPanel from './notifications-panel';
import SecurityPanel from './security-panel';

export default function Account() {
  const { t } = useLocale();

  const tabs = [
    {
      icon: <Icon icon="solar:user-id-bold" size={24} className="mr-2" />,
      title: t('pages.management.user.account.tabs.general'),
      value: 'general',
      content: <GeneralPanel />
    },

    {
      icon: <Icon icon="solar:bell-bing-bold-duotone" size={24} className="mr-2" />,
      title: t('pages.management.user.account.tabs.notifications'),
      value: 'notifications',
      content: <NotificationsPanel />
    },
    {
      icon: <Icon icon="solar:key-minimalistic-square-3-bold-duotone" size={24} className="mr-2" />,
      title: t('pages.management.user.account.tabs.security'),
      value: 'security',
      content: <SecurityPanel />
    }
  ];
  return (
    <div>
      <Tabs defaultValue={tabs[0].value}>
        <TabsList>
          {tabs.map(item => (
            <TabsTrigger key={item.value} value={item.value} className="flex cursor-pointer items-center gap-1">
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
