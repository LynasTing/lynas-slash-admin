import styled from 'styled-components';
import { themeVars } from '@/theme/theme.css';
import { ThemeMode } from '#/enum';

/**
 * 自定义事件外观容器。
 * 事件颜色来自 currentColor，伪元素负责绘制透明背景，让文本和背景保持同一色系但不互相遮挡。
 *
 * Custom event appearance wrapper.
 * The event color comes from currentColor, and the pseudo-element draws a translucent background so text and background stay in the same color family without blocking readability.
 */
export const StyledCalendarEvent = styled.div`
  position: relative;
  width: 100%;
  border-radius: 6px;
  background-color: #fff;

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.24;
    border-radius: 6px;
    background-color: currentColor;
    transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

/**
 * FullCalendar 样式适配层。
 * 这里集中覆盖第三方组件的 CSS 变量和内部类名，避免把日历皮肤规则散落到业务组件里。
 *
 * FullCalendar styling adapter.
 * Third-party CSS variables and internal class overrides are centralized here so calendar skin rules do not leak into business components.
 */
export const StyledCalendar = styled.div<{ $themeMode: ThemeMode }>`
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
  /**
   * 隐藏滚动条但保留滚动能力，避免日历内部滚动条破坏页面布局。
   *
   * Hides scrollbars while preserving scrolling so FullCalendar's internal scroll area does not disrupt the page layout.
   */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .fc {
    width: 100%;
    height: 100%;

    /**
     * FullCalendar 暴露的 CSS 变量优先覆盖，能减少对内部 DOM 结构的依赖。
     *
     * FullCalendar's exposed CSS variables are overridden first to reduce dependency on its internal DOM structure.
     */
    --fc-border-color: rgba(${themeVars.colors.palette.gray['500Channel']} / 0.16);
    --fc-now-indicator-color: ${themeVars.colors.palette.primary.darker};
    --fc-today-bg-color: rgba(${themeVars.colors.palette.gray['500Channel']} / 0.08);
    --fc-page-bg-color: ${props => (props.$themeMode === ThemeMode.Light ? '#ffffff' : '#161c24')};
    --fc-neutral-bg-color: ${themeVars.colors.background.default};
    --fc-list-event-hover-bg-color: rgba(${themeVars.colors.palette.gray['500Channel']} / 0.08);
    --fc-highlight-color: rgba(${themeVars.colors.palette.gray['500Channel']} / 0.08);

    a {
      color: ${props => (props.$themeMode === ThemeMode.Dark ? '#ffffff' : '#212b36')};
    }

    .fc-col-header {
      box-shadow: ${themeVars.shadows.inner};
      th {
        border-color: transparent;
      }
      .fc-col-header-cell-cushion {
        font-weight: 600;
        font-size: 0.875rem;
        font-family: 'Public Sans', sans-serif;
        padding: 8px 0px;
      }
    }

    /**
     * 月、周、日视图共享同一套事件外观覆盖。
     * 列表视图的 DOM 结构不同，单独在下面处理。
     *
     * Month, week, and day views share the same event appearance overrides.
     * List view uses a different DOM structure and is handled separately below.
     */
    .fc-dayGridMonth-view,
    .fc-timeGridWeek-view,
    .fc-timeGridDay-view {
      .fc-daygrid-day-number {
        line-height: 1.57143;
        font-size: 0.875rem;
        font-family: 'Public Sans', sans-serif;
        font-weight: 400;
        padding: 8px 8px 0px;
      }

      .fc-daygrid-event {
        margin-top: 4px;

        .fc-event-start,
        .fc-event-end {
          margin-left: 4px;
          margin-right: 4px;
        }
      }

      .fc-event {
        border-color: transparent !important;
        background-color: transparent !important;
      }
    }

    /**
     * 列表视图需要保留 FullCalendar 的表格信息结构，只移除事件块背景。
     *
     * List view keeps FullCalendar's table-like information structure and only removes the event block background.
     */
    .fc-list {
      .fc-list-day {
        th {
          z-index: 1;
        }
      }

      .fc-list-day-text,
      .fc-list-day-side-text {
        line-height: 1.57143;
        font-size: 0.875rem;
        font-family: 'Public Sans', sans-serif;
        font-weight: 400;
      }

      .fc-list-event-time {
        color: ${themeVars.colors.palette.gray['500Channel']};
      }

      .fc-event-title {
        color: ${themeVars.colors.text.primary};
      }

      .fc-list-table {
        th,
        td {
          border-color: transparent;
        }
      }

      ${StyledCalendarEvent} {
        background-color: transparent;

        &::before {
          display: none;
        }
      }
    }
  }
`;
