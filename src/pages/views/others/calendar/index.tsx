import { Card, CardContent } from '@/ui/card';
import { StyledCalendar } from './calendar.styles';
import { useSettingStoreState } from '@/store/setting';
import CalendarHeader, { type ViewType, type NavigateType } from './calendar-header';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
import { useMediaQuery, down } from '@/hooks';
import useLocale from '@/locales/use-locale';
import { initialEvents } from './calendar-init-mock';
import CalendarEventContent from './calendar-event-content';
import CalendarEventModal, { type CalendarEventModalFormField } from './calendar-event-modal';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import type { EventInput, EventClickArg, DateSelectArg, LocaleInput } from '@fullcalendar/core';

/**
 * 事件表单的默认初始值。
 * 关闭弹窗时会用它重置表单上下文，避免上一次编辑的数据泄漏到下一次新增。
 *
 * Default initial values for the event form.
 * The modal reset uses this object so the previous edited event does not leak into the next create flow.
 */
const defaultEventInitValue = {
  id: faker.string.uuid(),
  title: '',
  description: '',
  allDay: false,
  start: dayjs(),
  end: dayjs(),
  color: ''
};

export default function CalendarPage() {
  const fullCalendarRef = useRef<FullCalendar>(null);

  const { themeMode } = useSettingStoreState();
  const { locale } = useLocale();
  const fullCalendarLocale: LocaleInput | string = locale === 'zh_CN' ? zhCnLocale : 'en';

  const [date, setDate] = useState(new Date());

  const [viewType, setViewType] = useState<ViewType>('dayGridMonth');

  /**
   * 同步 React 视图状态到 FullCalendar 实例。
   * useLayoutEffect 会在组件首次挂载后执行，也会在依赖项 viewType 发生变化后再次执行；执行时机位于 React 完成 DOM 提交之后、浏览器下一次绘制之前。
   *
   * 这里必须使用实例 API，是因为 FullCalendar 的 initialView 只读取首次挂载时的值。
   * 后续无论是用户点击 Month / Week / Day / List，还是断点变化触发 setViewType，都只会先改变 React state，不会自动驱动 FullCalendar 内部视图。
   *
   * setTimeout 把 changeView 推迟到当前调用栈之后，确保 FullCalendar 已经完成本轮内部布局和 ref 初始化，再执行真实视图切换。
   *
   * Synchronizes the React view state to the FullCalendar instance.
   * useLayoutEffect runs after the component first mounts and runs again whenever the viewType dependency changes; it runs after React commits DOM updates and before the browser's next paint.
   *
   * The instance API is required here because FullCalendar only reads initialView during the first mount.
   * Later changes, whether from the Month / Week / Day / List menu or from breakpoint-driven setViewType calls, only update React state first and do not automatically switch FullCalendar's internal view.
   *
   * setTimeout defers changeView until after the current call stack, so FullCalendar has finished its own layout work and ref initialization before the real view switch runs.
   */
  useLayoutEffect(() => {
    const calendarApi = fullCalendarRef.current?.getApi();
    if (!calendarApi) return;

    setTimeout(() => {
      calendarApi.changeView(viewType);
    }, 0);
  }, [viewType]);

  /**
   * 处理日历时间范围导航。
   * FullCalendar 自己维护当前日期，所以导航后要从实例读取最新日期并同步给 header 展示。
   *
   * Handles calendar range navigation.
   * FullCalendar owns the current date internally, so the latest date is read from the instance after navigation and synced to the header.
   */
  const handleNavigate = (value: NavigateType) => {
    const calendarApi = fullCalendarRef.current?.getApi();
    if (!calendarApi) return;

    switch (value) {
      case 'prev':
        calendarApi.prev();
        break;
      case 'next':
        calendarApi.next();
        break;
      case 'today':
        calendarApi.today();
    }

    setDate(calendarApi.getDate());
  };

  const [modalVisible, setModalVisible] = useState(false);

  const xsBreakPoint = useMediaQuery(down('xs'));

  /**
   * 根据响应式断点重算日历视图状态。
   * useEffect 会在组件首次挂载后执行，也会在依赖项 xsBreakPoint 变化后再次执行；它的执行时机晚于浏览器绘制，所以适合处理这种不需要阻塞首帧布局的响应式状态同步。
   *
   * 这个 effect 只负责决定 React 层应该使用哪个 viewType：
   * - xs 断点下切到 listWeek，减少小屏横向拥挤；
   * - 非 xs 断点恢复 dayGridMonth，让大屏回到月视图。
   *
   * FullCalendar 的真实视图切换不在这里直接做，而是交给依赖 viewType 的 useLayoutEffect 统一同步，避免同一份视图同步逻辑散落在多个入口。
   *
   * Recalculates the calendar view state from the responsive breakpoint.
   * useEffect runs after the component first mounts and runs again whenever the xsBreakPoint dependency changes; it runs after the browser paints, which fits responsive state sync that does not need to block the first frame.
   *
   * This effect only decides which viewType React should hold:
   * - switch to listWeek at the xs breakpoint to reduce horizontal crowding on small screens;
   * - restore dayGridMonth outside the xs breakpoint so larger screens return to the month view.
   *
   * The actual FullCalendar view switch is not performed here. It is centralized in the viewType-driven useLayoutEffect above so view synchronization does not spread across multiple entry points.
   */
  useEffect(() => {
    if (xsBreakPoint) {
      setViewType('listWeek');
    } else {
      setViewType('dayGridMonth');
    }
  }, [xsBreakPoint]);

  const [modalFormType, setModalFormType] = useState<'add' | 'edit'>('add');

  const [eventInitValue, setEventInitValue] = useState<CalendarEventModalFormField>(defaultEventInitValue);

  /**
   * 关闭事件弹窗并恢复默认表单值。
   * 这里重置 initValues，是为了让下一次打开新增弹窗时不带上编辑态的标题、颜色或描述。
   *
   * Closes the event modal and restores default form values.
   * initValues are reset here so the next create modal does not reuse title, color, or description from an edit flow.
   */
  const handleEventCancel = () => {
    setEventInitValue(defaultEventInitValue);
    setModalVisible(false);
  };

  /**
   * 根据事件 ID 从 FullCalendar 实例中删除事件。
   * 删除发生在实例数据源里，不需要额外维护一份 React 事件列表。
   *
   * Removes an event from the FullCalendar instance by ID.
   * The deletion happens in FullCalendar's internal event source, so no separate React event list is maintained.
   */
  const handleEventRemove = (id: string) => {
    const calendarApi = fullCalendarRef.current?.getApi();
    if (!calendarApi) return;

    const target = calendarApi.getEventById(id);
    if (target) target.remove();
  };

  /**
   * 新增日历事件。
   * start / end 是可选字段，只有存在时才写入 FullCalendar 事件，避免把无效日期传给日历实例。
   *
   * Creates a calendar event.
   * start and end are optional, so they are only written to the FullCalendar event when present to avoid passing invalid dates.
   */
  const handleEventCreate = (values: CalendarEventModalFormField) => {
    const calendarApi = fullCalendarRef.current?.getApi();
    if (!calendarApi) return;

    const { title = '', description, start, end, allDay, color } = values;

    const event: EventInput = {
      id: faker.string.uuid(),
      title,
      extendedProps: {
        description
      },
      allDay,
      color
    };

    if (start) event.start = start.toDate();
    if (end) event.end = end.toDate();

    calendarApi.addEvent(event);
  };

  /**
   * 编辑日历事件。
   * FullCalendar 的 EventApi 不适合直接整体替换字段，这里先删除旧事件再添加新事件，确保扩展字段和颜色一起刷新。
   *
   * Edits a calendar event.
   * FullCalendar's EventApi is not a clean whole-object replacement API, so the old event is removed before adding the refreshed event with updated extended fields and color.
   */
  const handleEventEdit = (values: CalendarEventModalFormField) => {
    const calendarApi = fullCalendarRef.current?.getApi();
    if (!calendarApi) return;

    const { id, title = '', description, start, end, allDay = false, color } = values;

    const event: EventInput = {
      id,
      title,
      extendedProps: {
        description
      },
      allDay,
      color
    };

    if (start) event.start = start.toDate();
    if (end) event.end = end.toDate();

    const target = calendarApi.getEventById(id);
    if (!target) return;
    target.remove();
    calendarApi.addEvent(event);
  };

  /**
   * 处理用户在日历网格中拖选出的时间范围。
   * 选区只用于生成新增表单默认值，随后立即清除 FullCalendar 的高亮选区。
   *
   * Handles a date range selected from the calendar grid.
   * The selected range is only used to seed the create form, then the FullCalendar selection highlight is cleared immediately.
   */
  const handleDateSelect = ({ view, start, end, allDay }: DateSelectArg) => {
    const calendarApi = view.calendar;
    if (!calendarApi) return;

    calendarApi.unselect();
    setEventInitValue({
      id: faker.string.uuid(),
      title: '',
      description: '',
      start: start ? dayjs(start) : undefined,
      end: end ? dayjs(end) : undefined,
      allDay
    });
    setModalFormType('add');
    setModalVisible(true);
  };

  /**
   * 处理事件点击并把 FullCalendar 的 EventApi 转换成弹窗表单值。
   * 表单不直接依赖 EventApi，是为了让新增和编辑都复用同一套稳定的数据结构。
   *
   * Handles event clicks and converts FullCalendar's EventApi into modal form values.
   * The form does not depend directly on EventApi so create and edit flows can share one stable data shape.
   */
  const handleEventClick = ({ event }: EventClickArg) => {
    const { id, title, extendedProps, start, end, allDay, backgroundColor } = event;

    const form: CalendarEventModalFormField = {
      id,
      title,
      description: extendedProps.description,
      start: dayjs(start),
      end: dayjs(end),
      allDay,
      color: backgroundColor
    };

    setEventInitValue(form);
    setModalFormType('edit');
    setModalVisible(true);
  };

  return (
    <>
      <Card className="size-full">
        <CardContent className="size-full">
          <StyledCalendar $themeMode={themeMode}>
            <CalendarHeader
              now={date}
              viewType={viewType}
              onViewTypeChange={v => setViewType(v)}
              onNavigate={handleNavigate}
              onCreate={() => setModalVisible(true)}
            />
            <FullCalendar
              ref={fullCalendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              locale={fullCalendarLocale}
              initialDate={date}
              initialView={xsBreakPoint ? 'listWeek' : viewType}
              initialEvents={initialEvents}
              eventContent={CalendarEventContent}
              editable
              selectable
              selectMirror
              dayMaxEvents
              headerToolbar={false}
              select={handleDateSelect}
              eventClick={handleEventClick}
            />
          </StyledCalendar>
        </CardContent>
      </Card>
      <CalendarEventModal
        visible={modalVisible}
        type={modalFormType}
        initValues={eventInitValue}
        onCancel={handleEventCancel}
        onRemove={handleEventRemove}
        onCreate={handleEventCreate}
        onEdit={handleEventEdit}
      />
    </>
  );
}
