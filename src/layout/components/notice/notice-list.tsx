import type { NotificationProps } from './types';
import NoticeItem from './notice-item';
import { ScrollArea } from '@/ui/scroll-area';

export default function NoticeList({ notice }: { notice: NotificationProps[] }) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-0">
        {notice.map(item => (
          <NoticeItem key={item.id} {...item} />
        ))}
      </div>
    </ScrollArea>
  );
}
