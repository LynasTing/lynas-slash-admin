import InView from './views/in-view';
import Scroll from './views/scroll';
import Background from './views/background';
import Button from '@/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs';
import useLocale from '@/locales/use-locale';

const ANIMATE_PAGE_I18N_PREFIX = 'pages.components.animate';

/**
 * 动画示例页签配置
 * Animation demo tab configuration
 *
 * 页面只负责组合不同动画示例，具体演示逻辑下沉到各 view 内部。
 * This page only composes animation demos; each view owns its own demo logic.
 */
const tabs = [
  {
    labelKey: `${ANIMATE_PAGE_I18N_PREFIX}.tabs.inView`,
    value: 'inView',
    Component: InView
  },
  {
    labelKey: `${ANIMATE_PAGE_I18N_PREFIX}.tabs.scroll`,
    value: 'scroll',
    Component: Scroll
  },
  {
    labelKey: `${ANIMATE_PAGE_I18N_PREFIX}.tabs.background`,
    value: 'background',
    Component: Background
  }
];

export default function AnimatePage() {
  const { t } = useLocale();

  return (
    <>
      <Button variant="link" asChild className="mb-4 w-fit text-primary">
        <a href="https://www.framer.com/motion" target="_blank" rel="noreferrer">
          https://www.framer.com/motion
        </a>
      </Button>
      <Tabs defaultValue={tabs[0].value}>
        <TabsList>
          {tabs.map(item => (
            <TabsTrigger key={item.value} value={item.value}>
              {t(item.labelKey)}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(({ value, Component }) => (
          <TabsContent key={value} value={value}>
            <Component />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
