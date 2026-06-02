import ScrollBarView from './views/scroll-bar-view';
import ScrollProgressView from './views/scroll-progress-view';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs';

const tabs = [
  {
    label: 'ScrollBar',
    value: 'scrollBar',
    content: <ScrollBarView />
  },
  {
    label: 'Scroll Progress',
    value: 'scrollProgress',
    content: <ScrollProgressView />
  }
];

export default function ScrollPage() {
  return (
    <Tabs defaultValue={tabs[0].value}>
      <TabsList>
        {tabs.map(item => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
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
