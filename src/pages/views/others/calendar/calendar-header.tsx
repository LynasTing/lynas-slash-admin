import { type ReactNode } from 'react';
import { Icon } from '@/components/icon';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/ui/dropdown-menu';
import Button from '@/ui/button';
import dayjs from 'dayjs';
import { up, useMediaQuery } from '@/hooks';
import useLocale from '@/locales/use-locale';

const calendarI18nPrefix = 'pages.others.calendar';

export type ViewType = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

type ViewTypeMenu = {
  /**
   * 菜单展示文案的国际化 key。
   * i18n key for the menu label displayed to users.
   */
  labelKey: string;

  /**
   * FullCalendar 视图类型，用于把菜单选项映射到日历视图。
   * FullCalendar view type used to map a menu option to the calendar view.
   */
  viewType: ViewType;

  /**
   * 菜单项和当前视图触发器中展示的图标。
   * Icon rendered for the menu item and the active view trigger.
   */
  icon: ReactNode;
};

/**
 * 视图菜单配置集中维护，避免触发器展示和下拉菜单列表使用两套定义。
 * Calendar view menu configuration is centralized so the trigger and dropdown list share the same source.
 */
const calendarViewItems: ViewTypeMenu[] = [
  {
    labelKey: `${calendarI18nPrefix}.views.month`,
    viewType: 'dayGridMonth',
    icon: <Icon icon="mdi:calendar-month-outline" size={18} />
  },
  {
    labelKey: `${calendarI18nPrefix}.views.week`,
    viewType: 'timeGridWeek',
    icon: <Icon icon="mdi:calendar-weekend-outline" size={18} />
  },
  {
    labelKey: `${calendarI18nPrefix}.views.day`,
    viewType: 'timeGridDay',
    icon: <Icon icon="mdi:calendar-today-outline" size={18} />
  },
  {
    labelKey: `${calendarI18nPrefix}.views.list`,
    viewType: 'listWeek',
    icon: <Icon icon="mdi:view-agenda-outline" size={18} />
  }
];

export type NavigateType = 'prev' | 'today' | 'next';

type CalendarHeaderProps = {
  /**
   * 当前日历日期，用于渲染 header 中间的日期标题。
   * Current calendar date used to render the date title in the center of the header.
   */
  now: Date;

  /**
   * 当前日历视图，由父组件传入，保证 header 展示与日历实例状态一致。
   * Current calendar view passed from the parent to keep the header aligned with the calendar instance.
   */
  viewType: ViewType;

  /**
   * 视图切换回调，header 只上报用户选择，实际视图状态由父组件维护。
   * View change callback; the header only reports the user selection while the parent owns the view state.
   */
  onViewTypeChange: (value: ViewType) => void;

  /**
   * 日期导航回调，用于触发上一段、下一段和回到今天。
   * Date navigation callback used to trigger previous, next, and today actions.
   */
  onNavigate: (value: NavigateType) => void;

  /**
   * 新建事件回调，通常用于让父组件打开事件创建表单。
   * Create-event callback, usually used by the parent to open the event creation form.
   */
  onCreate: VoidFunction;
};

/**
 * 渲染日历头部操作区。
 * Header 本身不直接操作 FullCalendar 实例，只负责展示当前状态并把用户操作抛给父组件。
 *
 * Renders the calendar header actions.
 * The header does not mutate the FullCalendar instance directly; it displays current state and delegates user actions to the parent.
 */
export default function CalendarHeader({ now, viewType, onViewTypeChange, onNavigate, onCreate }: CalendarHeaderProps) {
  const { t, locale } = useLocale();
  const isLgUp = useMediaQuery(up('lg'));
  const dayjsLocale = locale === 'zh_CN' ? 'zh-cn' : 'en';

  /**
   * 当前选中菜单项由 viewType 派生，避免 header 内部状态与父组件日历状态不同步。
   * The selected menu item is derived from viewType to avoid local header state drifting from the parent calendar state.
   */
  const selectedViewTypeMenu = calendarViewItems.find(i => i.viewType === viewType) ?? calendarViewItems[0];

  /**
   * 将菜单项选择转换为日历视图变更事件。
   * Converts a menu item selection into a calendar view change event.
   */
  const handleViewTypeChange = (item: ViewTypeMenu) => {
    onViewTypeChange(item.viewType);
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      {isLgUp && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <div className="flex items-center">
                {selectedViewTypeMenu.icon}
                <span className="mx-1 text-sm! font-medium">{t(selectedViewTypeMenu.labelKey)}</span>
                <Icon icon="solar:alt-arrow-down-outline" size={20} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {calendarViewItems.map(item => (
              <DropdownMenuItem key={item.viewType} onClick={() => handleViewTypeChange(item)}>
                {t(item.labelKey)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div className="flex flex-col pb-2 lg:w-2/3 lg:flex-row lg:justify-between lg:gap-y-0">
        <div className="flex cursor-pointer items-center justify-center">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('prev')}>
            <Icon icon="solar:alt-arrow-left-outline" size={20} />
          </Button>
          <span className="mx-2 text-base font-bold">{dayjs(now).locale(dayjsLocale).format('DD MMM YYYY')}</span>
          <Button variant="ghost" size="icon" onClick={() => onNavigate('next')}>
            <Icon icon="solar:alt-arrow-right-outline" size={20} />
          </Button>
        </div>
        <div className="flex items-center justify-end">
          <Button onClick={() => onNavigate('today')}>{t(`${calendarI18nPrefix}.actions.today`)}</Button>
          <Button className="ml-2 flex items-center justify-center" onClick={() => onCreate()}>
            <Icon icon="material-symbols:add" size={24} />
            {t(`${calendarI18nPrefix}.actions.newEvent`)}
          </Button>
        </div>
      </div>
    </div>
  );
}
