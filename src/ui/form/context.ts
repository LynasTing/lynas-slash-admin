import * as React from 'react';
import { type FieldValues, type FieldPath, useFormContext, useFormState } from 'react-hook-form';

/**
 * 定义一个表单字段上下文类型：
 * - 该上下文对象包含一个属性 `name`
 * - `name` 必须是表单数据结构 TFieldValues 中的一个合法字段路径
 *
 * 泛型参数说明：
 * - TFieldValues：整个表单的数据结构（继承自 RHF 的 FieldValues）
 * - TName：字段名路径，由 FieldPath<TFieldValues> 自动推导
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

/**
 * 创建一个上下文对象，用于在表单字段组件之间共享字段信息
 */
export const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

export type FormItemContextValue = {
  id: string;
};

/**
 * React.createContext()
 * - 创建上下文
 */
export const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

export const useFormField = () => {
  /**
   * fieldContext - 表单字段上下文
   */
  const fieldContext = React.useContext(FormFieldContext);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  /**
   * itemContext - 表单元素上下文
   */
  const itemContext = React.useContext(FormItemContext);

  const { id } = itemContext;

  /**
   * useFormContext() - 获取整个表单的状态
   *
   * getFieldState() - 获取指定字段的状态
   * - param1 获取哪个字段的状态
   * - param2 只在第二个字段状态变化时重新渲染
   */
  const { getFieldState } = useFormContext();

  /**
   * useFormState() - 订阅某个字段的状态
   * - 订阅某个字段后，只在这个字段状态变化时重新渲染
   */
  const formState = useFormState({ name: fieldContext.name });

  /**
   * fieldState - 表单字段状态
   */
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    // id - 表单元素 id
    id,
    // name - 表单字段名
    name: fieldContext.name,
    // formItemId - 表单元素 id
    formItemId: `${id}-form-item`,
    // formDescriptionId - 表单描述 id
    formDescriptionId: `${id}-form-item-description`,
    // formMessageId - 表单错误信息 id
    formMessageId: `${id}-form-item-message`,
    // formControlId - 表单控件 id
    ...fieldState
  };
};
