import { zodResolver } from '@hookform/resolvers/zod';
import { Select as AntdSelect } from 'antd';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BasicStatusEnum } from '#/enum';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import type { Role } from '#/entity';
import { AvatarUpload } from '@/components/upload';
import Button from '@/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { mockRoles } from '../role/role-mock';
import type { UserFormValues, UserModalType } from './types';
import useLocale from '@/locales/use-locale';
import type { TFunction } from 'i18next';

const USER_PAGE_I18N_PREFIX = 'pages.management.system.user';

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
      id: z.string().optional(),
      username: z
        .string()
        .trim()
        .min(2, t(`${USER_PAGE_I18N_PREFIX}.validation.usernameMinLength`)),
      email: z.email(t(`${USER_PAGE_I18N_PREFIX}.validation.emailInvalid`)),
      avatar: z.string().optional(),
      status: z.enum(BasicStatusEnum).optional(),
      roleIds: z.array(z.string()).min(1, t(`${USER_PAGE_I18N_PREFIX}.validation.rolesRequired`)),
      password: z.string().trim()
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
   * 弹窗模式。
   *
   * Modal mode.
   */
  type: UserModalType;

  /**
   * 当前表单初始值。
   *
   * Initial form values.
   */
  formValue: UserFormValues;

  /**
   * 表单可选择的角色列表。
   *
   * Roles available for selection in the form.
   */
  roleOptions?: Role[];

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
  onSave(values: UserFormValues): void | Promise<void>;

  /**
   * 关闭弹窗。
   *
   * Close the modal.
   */
  onCancel: VoidFunction;
};

/**
 * 用户新增、编辑表单弹窗。
 * 头像上传、账户信息和权限状态集中在同一表单中；编辑时留空密码会保留原密码。
 * @param props - 用户表单弹窗属性。
 * @returns 用户表单弹窗。
 *
 * User create and edit form modal.
 * Avatar upload, account details, and access status share one form; an empty password preserves the current password while editing.
 * @param props - User form modal props.
 * @returns User form modal.
 */
export default function UserModal({
  visible,
  type,
  formValue,
  roleOptions = mockRoles,
  confirmLoading = false,
  onSave,
  onCancel
}: UserModalProps) {
  const { t } = useLocale();
  /**
   * React Hook Form 表单实例。
   * resolver 随弹窗模式切换，因此新增和编辑既能共用字段又能拥有不同的密码规则。
   *
   * React Hook Form instance.
   * The resolver changes with the dialog mode, allowing shared fields while preserving different password rules for create and edit flows.
   */
  const userFormSchema = useMemo(() => createUserFormSchema(type, t), [t, type]);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: formValue
  });
  const { reset, setValue } = form;
  const modalTitle = t(type === 'create' ? `${USER_PAGE_I18N_PREFIX}.modal.createTitle` : `${USER_PAGE_I18N_PREFIX}.modal.editTitle`);

  useEffect(() => {
    // 弹窗切换目标用户或模式时重置表单，避免受控字段保留前一次输入。
    // Reset when the target user or mode changes so controlled fields cannot retain the prior input.
    reset(formValue);
  }, [formValue, reset, type]);

  return (
    <Dialog open={visible} onOpenChange={open => !open && onCancel()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSave)}>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.avatar')}</FormLabel>
                  <FormControl>
                    <AvatarUpload
                      key={`${type}-${formValue.id}-${formValue.avatar ?? ''}`}
                      defaultAvatar={field.value}
                      customRequest={({ onSuccess }) => onSuccess?.({})}
                      onAvatarChange={(_, previewUrl) => {
                        setValue('avatar', previewUrl, { shouldDirty: true, shouldValidate: true });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.roles')}</FormLabel>
                    <FormControl>
                      <AntdSelect
                        mode="multiple"
                        allowClear
                        className="w-full"
                        placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.roles`)}
                        value={field.value}
                        options={roleOptions.map(role => ({
                          value: role.id,
                          label: role.name,
                          disabled: role.status === BasicStatusEnum.DISABLE
                        }))}
                        onChange={field.onChange}
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
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder={t(`${USER_PAGE_I18N_PREFIX}.placeholders.${type === 'create' ? 'password' : 'newPassword'}`)}
                        {...field}
                      />
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
                      value={String(field.value ?? BasicStatusEnum.ENABLE)}
                      onValueChange={value => field.onChange(Number(value))}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={String(BasicStatusEnum.ENABLE)} id="user-status-enable" />
                        <Label htmlFor="user-status-enable">{t(BASIC_STATUS_LABEL_KEY_MAP[BasicStatusEnum.ENABLE])}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={String(BasicStatusEnum.DISABLE)} id="user-status-disable" />
                        <Label htmlFor="user-status-disable">{t(BASIC_STATUS_LABEL_KEY_MAP[BasicStatusEnum.DISABLE])}</Label>
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
