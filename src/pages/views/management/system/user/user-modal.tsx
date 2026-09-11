import { zodResolver } from '@hookform/resolvers/zod';
import { Select as AntdSelect } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import type { SysRoleOption } from '#/system/role';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import { Icon } from '@/components/icon';
import Button from '@/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import type { SysUserSaveRequest } from '#/system/user';
import useLocale from '@/locales/use-locale';
import type { TFunction } from 'i18next';

const USER_PAGE_I18N_PREFIX = 'pages.management.system.user';

type UserModalType = 'create' | 'edit';

/**
 * 用户基础表单校验规则。
 * 新增和编辑共有的字段规则只维护一份，密码是否必填则由模式相关的规则补充。
 *
 * Base user form validation rules.
 * Shared field rules are maintained once for both create and edit flows; mode-specific validation adds whether a password is required.
 */
/**
 * 根据弹窗模式补充密码校验规则。
 * 新增用户必须提供密码；编辑时留空表示保持原密码，只有输入新密码时才校验长度。
 * @param type - 用户弹窗模式。
 * @returns 当前模式对应的用户表单校验规则。
 *
 * Add password validation rules for the current modal mode.
 * Creating a user requires a password; editing preserves the current password when empty and validates a replacement only when provided.
 * @param type - User modal mode.
 * @returns User form validation rules for the current mode.
 */
const createUserFormSchema = (type: UserModalType, t: TFunction) =>
  z
    .object({
      username: z
        .string()
        .trim()
        .min(2, t(`${USER_PAGE_I18N_PREFIX}.validation.usernameMinLength`))
        .max(64, t(`${USER_PAGE_I18N_PREFIX}.validation.usernameMaxLength`)),
      nickname: z
        .string()
        .trim()
        .max(50, t(`${USER_PAGE_I18N_PREFIX}.validation.nicknameMaxLength`))
        .optional(),
      email: z
        .string()
        .trim()
        .email(t(`${USER_PAGE_I18N_PREFIX}.validation.emailInvalid`))
        .max(255, t(`${USER_PAGE_I18N_PREFIX}.validation.emailMaxLength`)),
      phone: z
        .string()
        .trim()
        .max(32, t(`${USER_PAGE_I18N_PREFIX}.validation.phoneMaxLength`))
        .optional(),
      avatar: z
        .string()
        .trim()
        .max(512, t(`${USER_PAGE_I18N_PREFIX}.validation.avatarMaxLength`))
        .optional(),
      status: z.union([z.literal(BOOLEAN_VALUE_MAP.TRUE), z.literal(BOOLEAN_VALUE_MAP.FALSE)]),
      roleIds: z.array(z.number().int().positive()).min(1, t(`${USER_PAGE_I18N_PREFIX}.validation.rolesRequired`)),
      password: z
        .string()
        .trim()
        .max(72, t(`${USER_PAGE_I18N_PREFIX}.validation.passwordMaxLength`))
    })
    .superRefine((values, context) => {
      // 把模式差异集中在这里，基础字段定义保持唯一，避免新增和编辑表单逐渐分叉。
      // Keep mode-specific differences here so the base field definition remains singular and create/edit forms do not drift apart.
      const isPasswordRequired = type === 'create';
      const shouldValidatePassword = isPasswordRequired || values.password.length > 0;

      if (shouldValidatePassword && values.password.length < 8) {
        context.addIssue({
          code: 'custom',
          path: ['password'],
          message: t(`${USER_PAGE_I18N_PREFIX}.validation.passwordMinLength`)
        });
      }
    });

export type UserModalProps = {
  /**
   * 弹窗是否可见。
   *
   * Whether the modal is visible.
   */
  visible: boolean;

  /**
   * 是否处于编辑模式。
   *
   * Whether the modal is editing an existing user.
   */
  isEditing: boolean;

  /**
   * 当前表单初始值。
   *
   * Initial form values.
   */
  formValue: SysUserSaveRequest;

  /**
   * 表单可选择的角色列表。
   *
   * Roles available for selection in the form.
   */
  roleOptions: SysRoleOption[];

  /**
   * 确认按钮是否处于提交状态。
   *
   * Whether the confirm button is submitting.
   */
  confirmLoading?: boolean;

  /**
   * 保存用户表单。
   * @param values - 已通过校验的表单值。
   *
   * Save the user form.
   * @param values - Validated form values.
   */
  onSave(values: SysUserSaveRequest): void | Promise<void>;

  /**
   * 关闭弹窗。
   *
   * Close the modal.
   */
  onCancel: VoidFunction;
};

/**
 * 用户新增、编辑表单弹窗。
 * 头像地址、账户信息和权限状态集中在同一表单中；编辑时留空密码会保留原密码。
 * @param props - 用户表单弹窗属性。
 * @returns 用户表单弹窗。
 *
 * User create and edit form modal.
 * Avatar address, account details, and access status share one form; an empty password preserves the current password while editing.
 * @param props - User form modal props.
 * @returns User form modal.
 */
export default function UserModal({
  visible,
  isEditing,
  formValue,
  roleOptions,
  confirmLoading = false,
  onSave,
  onCancel
}: UserModalProps) {
  const { t } = useLocale();
  const type: UserModalType = isEditing ? 'edit' : 'create';
  /**
   * React Hook Form 表单实例。
   * resolver 随弹窗模式切换，因此新增和编辑既能共用字段又能拥有不同的密码规则。
   *
   * React Hook Form instance.
   * The resolver changes with the dialog mode, allowing shared fields while preserving different password rules for create and edit flows.
   */
  const userFormSchema = useMemo(() => createUserFormSchema(type, t), [t, type]);
  const form = useForm<SysUserSaveRequest>({
    resolver: zodResolver(userFormSchema),
    defaultValues: formValue
  });
  const { reset } = form;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const modalTitle = t(type === 'create' ? `${USER_PAGE_I18N_PREFIX}.modal.createTitle` : `${USER_PAGE_I18N_PREFIX}.modal.editTitle`);

  useEffect(() => {
    // 弹窗切换目标用户或模式时重置表单，避免受控字段保留前一次输入。
    // Reset when the target user or mode changes so controlled fields cannot retain the prior input.
    reset(formValue);
    setIsPasswordVisible(false);
  }, [formValue, reset, type]);

  return (
    <Dialog open={visible} onOpenChange={open => !open && onCancel()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSave)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.username')}</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.username`)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.avatar')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.avatar`)} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.nickname')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.nickname`)} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.email`)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roleIds"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.roles')}</FormLabel>
                    <AntdSelect
                      mode="multiple"
                      allowClear
                      className="w-full"
                      placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.roles`)}
                      value={field.value ?? []}
                      aria-invalid={Boolean(fieldState.error)}
                      // Ant Design 默认将下拉菜单挂到 body，Radix Dialog 会阻止弹窗外部的点击，导致选项可见但无法选中。
                      // Render the popup inside the dialog because Radix Dialog blocks pointer events outside its content.
                      getPopupContainer={triggerNode => triggerNode.parentElement ?? document.body}
                      options={roleOptions.map(role => ({
                        value: role.id,
                        label: role.name,
                        disabled: role.status === BOOLEAN_VALUE_MAP.FALSE
                      }))}
                      onChange={(roleIds: number[]) => field.onChange(roleIds)}
                      onBlur={field.onBlur}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.phone')}</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        autoComplete="tel"
                        placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.phone`)}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {type === 'create' ? t('common.fields.password') : t(`${USER_PAGE_I18N_PREFIX}.modal.newPassword`)}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? 'text' : 'password'}
                          autoComplete="new-password"
                          className="pr-10"
                          placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.${type === 'create' ? 'password' : 'newPassword'}`)}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
                          aria-label={t(`${USER_PAGE_I18N_PREFIX}.actions.${isPasswordVisible ? 'hidePassword' : 'showPassword'}`)}
                          onClick={() => setIsPasswordVisible(visible => !visible)}>
                          <Icon icon={isPasswordVisible ? 'solar:eye-closed-bold-duotone' : 'solar:eye-bold-duotone'} size={18} />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.status')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-6"
                      value={String(field.value ?? BOOLEAN_VALUE_MAP.TRUE)}
                      onValueChange={value => field.onChange(Number(value))}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={String(BOOLEAN_VALUE_MAP.TRUE)} id="user-status-enable" />
                        <Label htmlFor="user-status-enable">{t(BASIC_STATUS_LABEL_KEY_MAP[BOOLEAN_VALUE_MAP.TRUE])}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={String(BOOLEAN_VALUE_MAP.FALSE)} id="user-status-disable" />
                        <Label htmlFor="user-status-disable">{t(BASIC_STATUS_LABEL_KEY_MAP[BOOLEAN_VALUE_MAP.FALSE])}</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('common.actions.cancel')}
              </Button>
              <Button type="submit" disabled={confirmLoading}>
                {confirmLoading ? t('common.actions.saving') : t('common.actions.save')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
