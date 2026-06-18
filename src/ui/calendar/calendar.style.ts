import { type ComponentProps } from 'react';
import { DayPicker } from 'react-day-picker';
import { buttonVariants } from '@/ui/button/style';
import { cn } from '@/utils';

type CalendarMode = ComponentProps<typeof DayPicker>['mode'];

/**
 * 生成 DayPicker 的插槽样式。
 * @param mode - 当前日历选择模式，用于区分范围选择和单日选择的单元格圆角规则。
 * @returns 可传给 DayPicker classNames 的样式映射。
 *
 * Creates slot styles for DayPicker.
 * @param mode - The current calendar selection mode, used to switch cell radius rules between range and single selection.
 * @returns A style map that can be passed to DayPicker classNames.
 */
export function getCalendarClassNames(mode: CalendarMode) {
  return {
    months: 'flex flex-col gap-2 sm:flex-row',
    month: 'flex flex-col gap-4',
    caption: 'relative flex w-full items-center justify-center pt-1',
    caption_label: 'text-sm font-medium',
    nav: 'flex items-center gap-1',
    nav_button: cn(buttonVariants({ variant: 'outline' }), 'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
    nav_button_previous: 'absolute left-1',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse space-x-1',
    head_row: 'flex',
    head_cell: 'w-8 rounded-md font-normal text-[0.8rem] text-muted-foreground',
    row: 'mt-2 flex w-full',
    cell: cn(
      'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md',
      /**
       * 范围选择需要让起止日期和行首行尾分别处理圆角，否则连续日期块会断裂。
       *
       * Range selection needs separate radius rules for start, end, first, and last cells;
       * otherwise the continuous selected block renders with broken corners.
       */
      mode === 'range'
        ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        : '[&:has([aria-selected])]:rounded-md'
    ),
    day: cn(buttonVariants({ variant: 'ghost' }), 'size-8 p-0 font-normal aria-selected:opacity-100'),
    day_range_start: 'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
    day_range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
    day_selected:
      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
    day_today: 'bg-accent text-accent-foreground',
    day_outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
    day_disabled: 'text-muted-foreground opacity-50',
    day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
    day_hidden: 'invisible'
  };
}
