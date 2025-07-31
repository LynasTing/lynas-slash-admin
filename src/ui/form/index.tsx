import { cn } from '@/utils';
import * as React from 'react';
import { Label as LabelPrimitive, Slot as SlotPrimitive } from 'radix-ui';
import { Label } from '@/ui/label';
import useFormField from './useFormField';
import {
  /**
   * 用户将自定义组件与 react-hook-form 连接
   */
  Controller,

  /**
   * 表单上下文提供器（让子组件能用 useFormContext 拿到表单信息）
   */
  FormProvider,
  type ControllerProps,
  type FieldPath,
  type FieldValues
} from 'react-hook-form';

const Form = FormProvider;

/**
 * 用于传递当前字段名给所有子组件（比如FormLabel、FormMessage等）
 */
export type FormFieldContextValue<
  /**
   * 定义一个 TFieldValues 类型，它继承自 FieldValues 类型，表示表单字段的值
   */
  TFieldValues extends FieldValues = FieldValues,
  /**
   * 定义一个 TName 类型，它继承自 FieldPath 类型，表示表单字段的名称
   */
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

/**
 * 创建 Context，默认值使用类型断言强制转换为空（因为后续使用中确保它不会空）
 */
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

/**
 * FormField 组件
 * 相当于字段的入口组件，内部使用 Controller 注册字段
 * 同时将当前字段名通过 context 向下传递
 *
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

/**
 * FormItem 组件 用来包裹表单内其它组件
 * React.ComponentProps 用于获取组件、元素所支持的所有属性类型
 */
function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  /**
   * React.useId 生成稳定的唯一id,
   */
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        /**
         * data-slot 自定义属性
         * data-xxx  HTML 标准语法
         */
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      /**
       * 校验到错误时，字体变红
       */
      className={cn('data-[error=true]:text-destructive', className)}
      /**
       * htmlFor 用于指定与当前标签关联的表单元素
       * 如果是 input ，点击 Label 就会聚焦到 input
       */
      htmlFor={formItemId}
      {...props}
    />
  );
}

/**
 * FormControl 组件
 * 给 input、select、textarea 等控件增加语义属性和上下文绑定（比如：id area-describedby aria-invalid）
 */
function FormControl({ ...props }: React.ComponentProps<typeof SlotPrimitive.Slot>) {
  const { error, formItemId, formDescriptionId, formMessagesId } = useFormField();

  return (
    /**
     * 通过 SlotPrimitive.Slot 插槽机制，把用户传来的表单控件包裹起来，不破坏原始结构
     */
    <SlotPrimitive.Slot
      data-slot="form-control"
      id={formItemId}
      /**
       * 无障碍友好
       * 某些 DOM 的文字挂到 input 上
       */
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessagesId}`}
      /**
       * 无障碍友好
       * 标识当前控件是否有错误
       */
      aria-invalid={!!error}
      {...props}
    />
  );
}

/**
 * FormDescription 组件
 * 输入框或其它组件下方的描述
 */
function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

/**
 * FormMessage 组件
 * 用于显示校验错误信息
 */
function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessagesId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p data-slot="form-message" id={formMessagesId} className={cn('text-sm  text-destructive', className)} {...props} />
  );
}

export {
  FormFieldContext,
  FormItemContext,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
};
