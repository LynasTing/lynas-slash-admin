import { faker } from '@faker-js/faker';
import type { EventInput } from '@fullcalendar/core';
import dayjs from 'dayjs';

export const calendarEventColors = ['#00a76f', '#8e33ff', '#00b8d9', '#003768', '#22c55e', '#ffab00', '#ff5630', '#7a0916'] as const;

/**
 * 生成一条用于 FullCalendar 首屏展示的模拟事件。
 * @returns FullCalendar 可直接消费的事件数据。
 *
 * Generates a mock event for the initial FullCalendar view.
 * @returns Event data that can be consumed directly by FullCalendar.
 */
function createInitialCalendarEvent(): EventInput {
  const start = dayjs()
    .add(faker.number.int({ min: -12, max: 20 }), 'day')
    .hour(faker.number.int({ min: 8, max: 18 }))
    .minute(faker.helpers.arrayElement([0, 15, 30, 45]))
    .second(0)
    .millisecond(0);
  const allDay = faker.datatype.boolean();

  /**
   * 全天事件使用日期字符串，让 FullCalendar 按日期块渲染。
   * 普通事件保留具体时间，避免 mock 数据全部变成跨天长条。
   *
   * All-day events use date strings so FullCalendar renders them as day blocks.
   * Timed events keep exact times to avoid turning every mock item into a long multi-day bar.
   */
  const end = allDay
    ? start.add(faker.number.int({ min: 1, max: 4 }), 'day').format('YYYY-MM-DD')
    : start.add(faker.number.int({ min: 1, max: 6 }), 'hour').toISOString();

  return {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    description: faker.lorem.paragraphs({ min: 1, max: 2 }),
    start: allDay ? start.format('YYYY-MM-DD') : start.toISOString(),
    end,
    color: faker.helpers.arrayElement(calendarEventColors),
    allDay
  };
}

export const initialEvents: EventInput[] = Array.from({ length: 20 }, () => createInitialCalendarEvent());
