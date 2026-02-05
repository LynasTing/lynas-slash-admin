import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Badge } from '@/ui/badge';
import { ComponentProps } from 'react';
import { NotificationProps } from './types';
import NoticeList from './notice-list';

type BadgeVariant = ComponentProps<typeof Badge>['variant'];

interface TabItem {
  key: string;
  label: string;
  badgeType: BadgeVariant;
  data: NotificationProps[];
}

const tabsData: TabItem[] = [
  {
    key: 'all',
    label: 'All',
    badgeType: 'default',
    data: [
      {
        id: 1,
        type: 'mention',
        user: 'Joe Lincoln',
        action: 'mentioned you in',
        target: 'Latest Trends',
        targetType: 'topic',
        time: '18 mins ago',
        department: 'Web Design 2024',
        message: '@Cody For an expert opinion, check out what Mike has to say on this topic!',
        hasReply: true,
        hasAvatar: true
      },
      {
        id: 2,
        type: 'tags',
        user: 'Leslie Alexander',
        action: 'added new tags to',
        target: 'Web Redesign 2024',
        time: '53 mins ago',
        department: 'ACME',
        tags: ['Client-Request', 'Figma', 'Redesign'],
        hasAvatar: true
      },
      {
        id: 3,
        type: 'access',
        user: 'Guy Hawkins',
        action: 'requested access to',
        target: 'AirSpace',
        targetType: 'project',
        time: '14 hours ago',
        department: 'Dev Team',
        hasActions: true,
        hasAvatar: true
      },
      {
        id: 4,
        type: 'file',
        user: 'Jane Perez',
        action: 'invites you to review a file.',
        time: '3 hours ago',
        fileSize: '742kb',
        fileName: 'Launch_nov24.pptx',
        fileType: 'ppt',
        editedTime: '39 mins ago',
        hasAvatar: true
      },
      {
        id: 5,
        type: 'article',
        user: 'Raymond Pawell',
        action: 'posted a new article',
        target: '2024 Roadmap',
        time: '1 hour ago',
        department: 'Roadmap',
        hasAvatar: true
      },
      {
        id: 6,
        type: 'project',
        user: 'Tyler Hero',
        action: 'wants to view your design project',
        time: '3 day ago',
        department: 'Metronic Launcher mockups',
        fileName: 'Launcher-UIkit.fig',
        fileType: 'figma',
        editedTime: '2 mins ago',
        hasAvatar: true
      }
    ]
  },
  {
    key: 'inbox',
    label: 'Inbox',
    badgeType: 'info',
    data: [
      {
        id: 1,
        type: 'user_request',
        user: 'Samuel Lee',
        action: 'requested to add user to',
        target: 'TechSynergy',
        time: '22 hours ago',
        department: 'Dev Team',
        userEmail: 'ronald.richards@gmail.com',
        userName: 'Ronald Richards',
        hasActions: true,
        hasAvatar: true
      },
      {
        id: 2,
        type: 'success',
        message: 'You have successfully verified your account',
        time: '2 days ago',
        isSuccess: true
      },
      {
        id: 3,
        type: 'file',
        user: 'Ava Peterson',
        action: 'uploaded attachment',
        time: '3 days ago',
        department: 'ACME',
        fileName: 'Redesign-2024.xls',
        fileSize: '2.6 MB',
        fileType: 'excel',
        hasAvatar: true
      },
      {
        id: 4,
        type: 'task',
        user: 'Ethan Parker',
        action: 'created a new tasks to',
        target: 'Site Sculpt',
        targetType: 'project',
        time: '3 days ago',
        department: 'Web Designer',
        task: {
          title: 'Location history is erased after Logging In',
          dueDate: '15 May, 2024',
          assignees: 2
        },
        tags: ['Improvement', 'Bug'],
        hasAvatar: true
      },
      {
        id: 5,
        type: 'upgrade',
        user: 'Benjamin Harris',
        action: 'requested to upgrade plan',
        time: '4 days ago',
        department: 'Marketing',
        hasActions: true,
        hasAvatar: true
      },
      {
        id: 6,
        type: 'mention',
        user: 'Isaac Morgan',
        action: 'mentioned you in',
        target: 'Data Transmission',
        targetType: 'topic',
        time: '6 days ago',
        department: 'Dev Team',
        hasAvatar: true
      }
    ]
  },
  {
    key: 'team',
    label: 'Team',
    badgeType: 'success',
    data: [
      {
        id: 1,
        type: 'meeting',
        user: 'Nova Hawthorne',
        action: 'sent you an meeting invitation',
        time: '2 days ago',
        department: 'Dev Team',
        meeting: {
          title: 'Preparation For Release',
          date: 'Apr 12, 2024',
          time: '9:00 PM - 10:00 PM',
          attendees: 7
        },
        hasActions: true,
        hasAvatar: true
      },
      {
        id: 2,
        type: 'article',
        user: 'Adrian Vale',
        action: 'posted a new article',
        target: 'Marketing',
        targetDate: '13 May',
        time: '2 days ago',
        department: 'Marketing',
        hasAvatar: true
      },
      {
        id: 3,
        type: 'upload',
        user: 'Skylar Frost',
        action: 'uploaded 2 attachments',
        time: '3 days ago',
        department: 'Web Design',
        files: [
          { name: 'Landing-page.docx', size: '1.9 MB', type: 'word' },
          { name: 'New-icon.svg', size: '2.3 MB', type: 'svg' }
        ],
        hasAvatar: true
      },
      {
        id: 4,
        type: 'comment',
        user: 'Selene Silverleaf',
        action: 'commented on',
        target: 'SiteSculpt',
        time: '4 days ago',
        department: 'Manager',
        message: "@Cody This design is simply stunning! From layout to color, it's a work of art!",
        hasReply: true,
        hasAvatar: true
      },
      {
        id: 5,
        type: 'invitation',
        user: 'Thalia Fox',
        action: 'has invited you to join',
        target: 'Design Research',
        time: '4 days ago',
        department: 'Dev Team',
        hasActions: true,
        hasAvatar: true
      }
    ]
  }
];

export default function NoticeTabs() {
  return (
    <Tabs className="flex flex-col w-full h-full">
      <TabsList defaultValue={tabsData[0].key} className="flex justify-between items-center shrink-0 gap-2 w-full">
        {tabsData.map(item => (
          <TabsTrigger key={item.key} value={item.key} className="flex items-center gap-1">
            <span>{item.label}</span>
            <Badge variant={item.badgeType}>{item.data.length}</Badge>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabsData.map(item => (
        <TabsContent value={item.key} className="flex-1 overflow-hidden">
          <NoticeList notice={item.data} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
