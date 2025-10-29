import { FormProvider } from 'react-hook-form';
import { FormFieldContext } from './context';
import { Controller, type FieldValues, type FieldPath, type ControllerProps } from 'react-hook-form';

/**
 * FormProvider
 */
export const Form = FormProvider;

/**
 * 表单字段组件：用于将单个表单字段绑定到 React Hook Form 的状态管理中
 *
 * 功能：
 * - 将指定字段（通过 name 指定）绑定到 RHF 表单状态
 * - 提供字段名上下文给子组件（如 FormLabel、FormControl、FormMessage）
 *
 * 泛型参数：
 * - TFieldValues：整个表单的数据结构类型
 * - TName：字段名路径类型（必须是 TFieldValues 的 key）
 *
 * 参数：
 * - props：ControllerProps，包含 name、control、render 等 RHF 所需属性
 */
export const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: ControllerProps<TFieldValues, TName>
) => {
  return (
    /**
     * 使用 Context 提供当前字段名，使子组件能通过 useFormField() 获取
     */
    <FormFieldContext.Provider value={{ name: props.name }}>
      {/*
        使用 React Hook Form 的 Controller 组件：
        1. 自动管理输入控件的值、校验、错误等
        2. 接管 value / onChange / onBlur
        3. 允许通过 render props 自定义控件渲染逻辑
      */}
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};
