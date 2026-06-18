import { type ComponentProps } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/utils';
import { getCalendarClassNames } from './calendar.style';

/**
 * Calendar 日期选择组件
 * - 基于 DayPicker 封装项目统一样式
 * - 允许外部通过 classNames 覆盖具体插槽样式
 *
 * Calendar date picker component
 * - Wraps DayPicker with project-level shared styles
 * - Allows consumers to override specific slot styles through classNames
 */
function Calendar({ className, classNames, showOutsideDays = true, ...props }: ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        ...getCalendarClassNames(props.mode),
        ...classNames
      }}
      components={{
        IconLeft: ({ className, ...props }) => <ChevronLeft className={cn('size-4', className)} {...props} />,
        IconRight: ({ className, ...props }) => <ChevronRight className={cn('size-4', className)} {...props} />
      }}
      {...props}
    />
  );
}

export { Calendar };
