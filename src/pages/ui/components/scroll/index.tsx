import useLocale from '@/locales/use-locale';
import ScrollBarView from './views/scroll-bar-view';
import ScrollProgressView from './views/scroll-progress-view';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs';

const SCROLL_PAGE_I18N_PREFIX = 'pages.components.scroll';

const tabs = [
  {
    labelKey: `${SCROLL_PAGE_I18N_PREFIX}.tabs.scrollBar`,
    value: 'scrollBar',
    content: <ScrollBarView />
  },
  {
    labelKey: `${SCROLL_PAGE_I18N_PREFIX}.tabs.scrollProgress`,
    value: 'scrollProgress',
    content: <ScrollProgressView />
  }
];

export default function ScrollPage() {
  const { t } = useLocale();

  return (
    <Tabs defaultValue={tabs[0].value}>
      <TabsList>
        {tabs.map(item => (
          <TabsTrigger key={item.value} value={item.value}>
            {t(item.labelKey)}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(item => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
