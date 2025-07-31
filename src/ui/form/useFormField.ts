import React from 'react';
import {
  /**
   * 获取整个表单的上下文
   */
  useFormContext,

  /**
   * 用于监听某个字段的状态
   */
  useFormState
} from 'react-hook-form';
import { FormFieldContext, FormItemContext } from './index';

const useFormField = () => {
  /**
   * 从上层 FormField 中拿到传下来的name
   */
  const fieldContext = React.useContext(FormFieldContext);

  /**
   * 从上层 FormItem 中拿到id，后面要拼给input、label用
   */
  const itemContext = React.useContext(FormItemContext);

  /**
   * getFieldState React Hook Form 提供的查字段状态的专用函数
   * 传入字段名，可以查询这个字段是不是有错、有没有修改、是不是被点击过等
   */
  const { getFieldState } = useFormContext();

  /**
   * 订阅当前字段状态（性能优化）
   * 当这个字段的状态变化时，这个组件就会刷新
   */
  const formState = useFormState({ name: fieldContext.name });

  /**
   * 获取当前字段在表单中的状态
   */
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessagesId: `${id}-form-item-message`,
    ...fieldState
  };
};

export default useFormField;
