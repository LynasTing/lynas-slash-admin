import React from 'react';
import type { ComponentProps } from 'react';
import { Label as LabelPrimitive, Slot as SlotPrimitive } from 'radix-ui';
import { cn } from '@/utils';
import { useFormField } from './context';
import { Label } from '@/ui/label';

type FormItemContextValue = {
  id: string;
};

/**
 * React.createContext()
 * - 创建上下文
 */
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

/**
 * @description 表单元素
 */
export function FormItem({ className, ...props }: ComponentProps<'div'>) {
  // React.useId()  React自带的方法，生成唯一 id
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}

/**
 * @description 表单标签
 */
export function FormLabel({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

/**
 * @description 表单控件包装组件
 * - 通常包裹 <input>、<select>、<textarea> 等实际表单控件
 */
export function FormControl({ ...props }: React.ComponentProps<typeof SlotPrimitive.Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <SlotPrimitive.Slot
      data-slot="form-control"
      id={formItemId}
      aria-invalid={!!error}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      {...props}
    />
  );
}

/**
 * @description 辅助说明文字 静态
 */
export function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return <p data-slot="form-description" id={formDescriptionId} className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

/**
 * @description 字段校验错误信息 动态
 */
export function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p data-slot="form-message" id={formMessageId} className={cn('text-destructive text-sm', className)} {...props}>
      {body}
    </p>
  );
}
