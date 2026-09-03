import type { EventContentArg } from '@fullcalendar/core';
import { StyledCalendarEvent } from './calendar.styles';

/**
 * 渲染 FullCalendar 的自定义事件内容。
 * 颜色通过外层 style 写入 currentColor，样式层再用伪元素生成淡色背景，保证不同事件颜色可以复用同一套结构。
 *
 * Renders custom FullCalendar event content.
 * The event color is passed as currentColor on the wrapper, and the style layer uses a pseudo-element to render the tinted background with one shared structure.
 */
export default function CalendarEventContent(EventContent: EventContentArg) {
  const { timeText, event, backgroundColor } = EventContent;

  return (
    <StyledCalendarEvent style={{ color: backgroundColor }}>
      <div className="flex w-full text-[13px] leading-5 brightness-[0.48]">
        <div className="overflow-visible font-bold">{timeText}</div>
        <div className="min-w-0">
          <div className="truncate">{event.title}</div>
        </div>
      </div>
    </StyledCalendarEvent>
  );
}
