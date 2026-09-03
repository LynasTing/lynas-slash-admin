import type { EventInput } from '@fullcalendar/core';
import type { Dayjs } from 'dayjs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { calendarEventColors } from './calendar-init-mock';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Switch } from '@/ui/switch';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import useLocale from '@/locales/use-locale';
import type { TFunction } from 'i18next';

const calendarI18nPrefix = 'pages.others.calendar';

export type CalendarEventModalFormField = {
  /**
   * 事件 ID
   * Event ID
   */
  id: string;

  /**
   * 事件标题
   * Event title
   */
  title?: EventInput['title'];

  /**
   * 事件描述
   * Event description
   */
  description?: string;

  /**
   * 是否为全天事件
   * Whether the event is an all-day event
   */
  allDay?: EventInput['allDay'];

  /**
   * 开始时间
   * Start time
   */
  start?: Dayjs;

  /**
   * 结束时间
   * End time
   */
  end?: Dayjs;

  /**
   * 事件颜色
   * Event color
   */
  color?: EventInput['color'];
};

/**
 * 表单层使用 Date，是因为原生 datetime-local 输入框和 Zod 的 z.date() 都直接处理 Date。
 * 对外事件层使用 Dayjs，是为了和日历页面已有的时间处理方式保持一致，所以提交时会做一次 Date -> Dayjs 转换。
 *
 * The form layer uses Date because native datetime-local inputs and Zod's z.date() both work directly with Date values.
 * The event layer exposes Dayjs to stay consistent with the calendar page's existing date handling, so submit converts Date to Dayjs.
 */
const createFormSchema = (t: TFunction) =>
  z
    .object({
      title: z.string().min(1, t(`${calendarI18nPrefix}.validation.titleRequired`)),
      description: z.string().optional(),
      allDay: z.boolean(),
      start: z.date(),
      end: z.date(),
      color: z.string()
    })
    /**
     * refine 是 Zod 提供的自定义校验入口，用于表达单个字段类型无法覆盖的业务规则。
     * 这里 start / end 都已经通过 z.date() 保证是 Date，但“结束时间必须晚于开始时间”需要同时读取两个字段，所以放在 refine 里。
     *
     * 例如：
     * - z.string().min(1) 只能校验 title 自己不能为空；
     * - z.date() 只能校验 start / end 自己是 Date；
     * - refine(values => values.end > values.start) 可以校验多个字段之间的关系。
     *
     * path: ['end'] 表示错误挂到 end 字段上，表单 UI 渲染 FormMessage 时会显示在 End 输入项附近。
     *
     * refine is Zod's custom validation hook for business rules that cannot be expressed by a single field type.
     * start and end are already guaranteed to be Date values by z.date(), but "end must be later than start" depends on both fields.
     *
     * For example:
     * - z.string().min(1) only validates that title itself is not empty;
     * - z.date() only validates that start / end themselves are Date values;
     * - refine(values => values.end > values.start) validates the relationship between multiple fields.
     *
     * path: ['end'] attaches the error to the end field, so FormMessage can render it near the End input.
     */
    .refine(values => values.end > values.start, {
      message: t(`${calendarI18nPrefix}.validation.endAfterStart`),
      path: ['end']
    });

/**
 * z.infer 会从 Zod schema 反推出 TypeScript 类型，避免“校验规则一份、TS 类型又手写一份”导致两边不一致。
 *
 * 例如 formSchema 里 title 是 z.string()，FormValues['title'] 就会自动成为 string；
 * start 是 z.date()，FormValues['start'] 就会自动成为 Date。
 *
 * z.infer derives the TypeScript type from the Zod schema, so the validation rules and form value type stay in sync.
 *
 * For example, because title is z.string(), FormValues['title'] becomes string;
 * because start is z.date(), FormValues['start'] becomes Date.
 */
type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

/**
 * 将外部日历事件数据转换为表单默认值。
 * react-hook-form 的 defaultValues 和 reset 都需要同一份字段映射，集中在这里可以避免新增字段时漏改其中一处。
 *
 * Converts external calendar event data into form default values.
 * react-hook-form's defaultValues and reset need the same field mapping, so keeping it here prevents missing one path when fields change.
 */
const getDefaultValues = (initValues: CalendarEventModalFormField): FormValues => {
  /**
   * 表单控件使用 Date，外部事件模型使用 Dayjs。
   * 这里统一完成 Dayjs -> Date 的转换，让组件其他位置只关心表单值本身。
   *
   * Form controls use Date, while the external event model uses Dayjs.
   * This function centralizes the Dayjs -> Date conversion so the rest of the component only deals with form values.
   */
  return {
    title: initValues.title || '',
    description: initValues.description || '',
    allDay: initValues.allDay || false,
    start: initValues.start?.toDate() || new Date(),
    end: initValues.end?.toDate() || new Date(),
    color: initValues.color || calendarEventColors[0]
  };
};

type CalendarEventModalProps = {
  /**
   * 弹窗模式
   * Modal mode
   */
  type: 'add' | 'edit';

  /**
   * 是否显示弹窗
   * Whether the modal is visible
   */
  visible: boolean;

  /**
   * 表单初始值
   * Initial form values
   */
  initValues: CalendarEventModalFormField;

  /**
   * 取消或关闭弹窗回调
   * Callback for canceling or closing the modal
   */
  onCancel: VoidFunction;

  /**
   * 删除事件回调
   * Callback for removing an event
   */
  onRemove: (id: string) => void;

  /**
   * 创建事件回调
   * Callback for creating an event
   */
  onCreate: (v: CalendarEventModalFormField) => void;

  /**
   * 编辑事件回调
   * Callback for editing an event
   */
  onEdit: (v: CalendarEventModalFormField) => void;
};

export default function CalendarEventModal({ type, visible, initValues, onCancel, onRemove, onCreate, onEdit }: CalendarEventModalProps) {
  const { t } = useLocale();
  const title = type === 'add' ? t(`${calendarI18nPrefix}.modal.addTitle`) : t(`${calendarI18nPrefix}.modal.editTitle`);
  const formSchema = useMemo(() => createFormSchema(t), [t]);

  const formModal = useForm<FormValues>({
    /**
     * zodResolver 是 react-hook-form 和 Zod 之间的适配层。
     * react-hook-form 负责收集输入值、管理 touched / dirty / error 等表单状态；
     * Zod 负责判断这些值是否满足 formSchema。
     *
     * 提交流程可以理解为：
     * 1. 用户点击 Save；
     * 2. formModal.handleSubmit 收集表单当前值；
     * 3. zodResolver(formSchema) 调用 formSchema 校验这些值；
     * 4. 校验通过才会进入 handleSubmit(values)，校验失败则把错误写回对应字段。
     *
     * zodResolver is the adapter between react-hook-form and Zod.
     * react-hook-form collects input values and manages form state such as touched, dirty, and errors;
     * Zod decides whether those values satisfy formSchema.
     *
     * The submit flow is:
     * 1. The user clicks Save;
     * 2. formModal.handleSubmit collects the current form values;
     * 3. zodResolver(formSchema) validates those values with formSchema;
     * 4. handleSubmit(values) runs only when validation passes, otherwise errors are assigned back to the fields.
     */
    resolver: zodResolver(formSchema),
    /**
     * defaultValues 是 react-hook-form 初始化表单状态的来源。
     * datetime-local 输入框最终需要 Date，所以这里把 initValues 里的 Dayjs 转成 Date；没有传入值时用当前时间兜底。
     *
     * defaultValues is the initial source of truth for react-hook-form.
     * datetime-local inputs work with Date values here, so Dayjs values from initValues are converted to Date; current time is used as a fallback.
     */
    defaultValues: getDefaultValues(initValues)
  });

  const handleSubmit = (values: FormValues) => {
    /**
     * 表单内部的时间值是 Date，但外部日历事件类型使用 Dayjs。
     * 提交时统一转换，避免把表单控件实现细节泄漏给父组件。
     *
     * Form time values are Date internally, while the external calendar event type uses Dayjs.
     * The conversion happens on submit so parent components do not need to know about form-control internals.
     */
    const { id } = initValues;

    const event: CalendarEventModalFormField = {
      ...values,
      id,
      start: dayjs(values.start),
      end: dayjs(values.end)
    };

    /**
     * 新增和编辑共享同一套表单字段，只在最终提交动作上分流。
     * 这样可以避免为 add / edit 维护两份几乎相同的表单。
     *
     * Add and edit share the same form fields and only branch at the final submit action.
     * This avoids maintaining two nearly identical forms for add / edit flows.
     */
    const func = type === 'add' ? onCreate : onEdit;
    func(event);
    onCancel();
  };

  const { reset } = formModal;

  useEffect(() => {
    if (visible) {
      reset(getDefaultValues(initValues));
    }
  }, [visible, reset, initValues]);

  return (
    <Dialog open={visible} onOpenChange={v => !v && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...formModal}>
          <form className="space-y-4" onSubmit={formModal.handleSubmit(handleSubmit)}>
            <FormField
              control={formModal.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${calendarI18nPrefix}.form.title`)}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formModal.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${calendarI18nPrefix}.form.description`)}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={formModal.control}
              name="allDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${calendarI18nPrefix}.form.allDay`)}</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={formModal.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${calendarI18nPrefix}.form.start`)}</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      /**
                       * datetime-local 需要形如 2026-06-12T09:30 的本地输入格式。
                       * toISOString() 会带秒、毫秒和时区信息，所以这里只截取前 16 位给输入框展示。
                       *
                       * datetime-local expects a local input format like 2026-06-12T09:30.
                       * toISOString() includes seconds, milliseconds, and timezone information, so only the first 16 characters are used for display.
                       */
                      value={field.value?.toISOString().slice(0, 16)}
                      onChange={e => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={formModal.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${calendarI18nPrefix}.form.end`)}</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      /**
                       * End 输入框和 Start 使用同一套 Date <-> datetime-local 转换规则。
                       * 结束时间早于开始时间的业务校验交给 formSchema.refine 统一处理。
                       *
                       * The End input uses the same Date <-> datetime-local conversion as Start.
                       * The business rule for end being later than start is handled centrally by formSchema.refine.
                       */
                      value={field.value?.toISOString().slice(0, 16)}
                      onChange={e => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={formModal.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${calendarI18nPrefix}.form.color`)}</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input type="color" {...field} />
                      <div className="flex gap-1">
                        {calendarEventColors.map((item, index) => (
                          <button
                            key={index}
                            className="size-6 shrink-0 rounded-full border"
                            /**
                             * 颜色按钮在 form 内部，必须显式声明 type="button"。
                             * 原生 button 在表单里默认是 submit，不声明会导致点颜色时直接提交表单。
                             *
                             * Color buttons live inside a form, so type="button" must be explicit.
                             * Native buttons default to submit inside forms, which would submit the form when choosing a color.
                             */
                            type="button"
                            style={{
                              backgroundColor: item
                            }}
                            onClick={() => field.onChange(item)}
                          />
                        ))}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              {type === 'edit' && (
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => {
                    /**
                     * 删除是编辑态才有的破坏性操作。
                     * 删除后立即关闭弹窗，避免用户继续编辑已经被移除的事件。
                     *
                     * Delete is only available in edit mode as a destructive action.
                     * The modal closes immediately after deletion to prevent editing an event that has already been removed.
                     */
                    onRemove(initValues.id);
                    onCancel();
                  }}>
                  <Icon icon="fluent:delete-16-filled" size={20} className="text-error!" />
                </Button>
              )}

              <div className="flex gap-2.5">
                <Button variant="ghost" type="button" onClick={onCancel}>
                  {t(`${calendarI18nPrefix}.actions.cancel`)}
                </Button>
                <Button type="submit">{t(`${calendarI18nPrefix}.actions.save`)}</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
