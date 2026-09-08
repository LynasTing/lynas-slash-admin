import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { TreeSelect } from 'antd';
import type { SysMenuCategory, SysMenuSaveRequest, SysMenuTreeNode } from '#/system/menu';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import Button from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Textarea } from '@/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';
import useLocale from '@/locales/use-locale';

const MENU_PAGE_I18N_PREFIX = 'pages.management.system.menu';

const categoryKeyMap: Record<SysMenuCategory, string> = {
  [SYS_MENU_CATEGORY_MAP.GROUP]: `${MENU_PAGE_I18N_PREFIX}.types.GROUP`,
  [SYS_MENU_CATEGORY_MAP.DIRECTORY]: `${MENU_PAGE_I18N_PREFIX}.types.DIRECTORY`,
  [SYS_MENU_CATEGORY_MAP.MENU]: `${MENU_PAGE_I18N_PREFIX}.types.MENU`,
  [SYS_MENU_CATEGORY_MAP.ACTION]: `${MENU_PAGE_I18N_PREFIX}.types.ACTION`
};

const categoryOptions: ReadonlyArray<SysMenuCategory> = [
  SYS_MENU_CATEGORY_MAP.GROUP,
  SYS_MENU_CATEGORY_MAP.DIRECTORY,
  SYS_MENU_CATEGORY_MAP.MENU,
  SYS_MENU_CATEGORY_MAP.ACTION
];

const allowedChildCategoryMap: Readonly<Record<SysMenuCategory, ReadonlyArray<SysMenuCategory>>> = {
  [SYS_MENU_CATEGORY_MAP.GROUP]: [SYS_MENU_CATEGORY_MAP.DIRECTORY, SYS_MENU_CATEGORY_MAP.MENU],
  [SYS_MENU_CATEGORY_MAP.DIRECTORY]: [SYS_MENU_CATEGORY_MAP.DIRECTORY, SYS_MENU_CATEGORY_MAP.MENU],
  [SYS_MENU_CATEGORY_MAP.MENU]: [SYS_MENU_CATEGORY_MAP.ACTION],
  [SYS_MENU_CATEGORY_MAP.ACTION]: []
};

/**
 * 在菜单树中查找指定节点，用于确定当前父级允许的子菜单类别。
 * Find a node in the menu tree to determine which child categories are allowed for the selected parent.
 *
 * @param nodes - 菜单树节点。
 * @param nodeId - 要查找的节点 ID。
 * @returns 匹配的菜单节点；找不到时返回 undefined。
 *
 * @param nodes - Menu tree nodes.
 * @param nodeId - Node ID to find.
 * @returns The matching menu node, or undefined when it cannot be found.
 */
const findMenuNode = (nodes: SysMenuTreeNode[], nodeId: number): SysMenuTreeNode | undefined => {
  for (const node of nodes) {
    if (node.id === nodeId) return node;

    const childNode = findMenuNode(node.children, nodeId);
    if (childNode) return childNode;
  }

  return undefined;
};

/**
 * 校验外链是否为完整的 HTTP 或 HTTPS URL。
 * 仅检查协议前缀会放行 `https://` 等不完整地址，因此使用浏览器 URL 解析器确认主机名存在。
 *
 * Validate whether an external link is a complete HTTP or HTTPS URL.
 * Checking only a protocol prefix would allow incomplete addresses such as `https://`, so the browser URL parser also verifies a hostname exists.
 *
 * @param value - 待校验的外链地址。
 * @returns 是否为完整的 HTTP 或 HTTPS URL。
 *
 * @param value - External link to validate.
 * @returns Whether the value is a complete HTTP or HTTPS URL.
 */
const isValidHttpUrl = (value: string): boolean => {
  try {
    const url: URL = new URL(value);
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
  } catch {
    // URL 构造失败表示输入不是可解析的绝对地址。
    // A failed URL construction means the input is not a parseable absolute URL.
    return false;
  }
};

/**
 * 菜单新增弹窗属性。
 * Menu creation modal properties.
 */
export interface SysMenuModalProps {
  /**
   * 弹窗是否可见。
   * Whether the modal is visible.
   */
  visible: boolean;

  /**
   * 表单初始值。
   * Initial form values.
   */
  formValue: SysMenuSaveRequest;

  /**
   * 是否锁定父级菜单，通常用于从某个菜单节点新增子菜单。
   * Whether the parent menu is locked, usually when creating a child from a menu row.
   */
  parentLocked: boolean;

  /**
   * 是否处于编辑模式。
   * Whether the modal is in edit mode.
   */
  isEditing: boolean;

  /**
   * 可选父级菜单。
   * Available parent menu options.
   */
  parentOptions: SysMenuTreeNode[];

  /**
   * 是否正在提交。
   * Whether the form is submitting.
   */
  confirmLoading: boolean;

  /**
   * 保存已通过校验的菜单数据。
   * Save validated menu data.
   */
  onSave(values: SysMenuSaveRequest): void | Promise<void>;

  /**
   * 关闭弹窗。
   * Close the modal.
   */
  onCancel: VoidFunction;
}

/**
 * 菜单新增和编辑表单弹窗。
 * 当前后端契约未按菜单类别约束可选字段，因此统一展示并原样提交已填写的可选配置。
 *
 * Menu creation and editing form dialog.
 * The current backend contract does not constrain optional fields by menu category, so the dialog displays and submits completed optional settings consistently.
 *
 * @param props - 菜单新增弹窗属性。
 * @returns 菜单新增表单弹窗。
 *
 * @param props - Menu creation modal properties.
 * @returns Menu creation form modal.
 */
export default function SysMenuModal({
  visible,
  formValue,
  parentOptions,
  parentLocked,
  isEditing,
  confirmLoading,
  onSave,
  onCancel
}: SysMenuModalProps) {
  const { t } = useLocale();
  const form = useForm<SysMenuSaveRequest>({
    defaultValues: formValue
  });
  const category: SysMenuCategory = useWatch({ control: form.control, name: 'category' });
  const parentId: number = useWatch({ control: form.control, name: 'parentId' });
  const parentNode: SysMenuTreeNode | undefined = parentId ? findMenuNode(parentOptions, parentId) : undefined;
  const selectableCategoryOptions: ReadonlyArray<SysMenuCategory> = parentNode
    ? allowedChildCategoryMap[parentNode.category]
    : categoryOptions;

  useEffect(() => {
    // 每次重新打开新增弹窗时恢复默认值，避免未保存的输入残留到下一次创建。
    // Restore defaults whenever the creation dialog is reopened so unsaved input cannot leak into the next creation.
    form.reset(formValue);
  }, [form, formValue]);

  useEffect(() => {
    // 父级变化后自动修正为后端允许的最低子级类型，避免提交非法层级组合。
    // When the parent changes, select the first backend-approved child category so invalid hierarchy combinations cannot be submitted.
    const firstAvailableCategory: SysMenuCategory | undefined = selectableCategoryOptions[0];
    if (firstAvailableCategory !== undefined && !selectableCategoryOptions.includes(category)) {
      form.setValue('category', firstAvailableCategory, { shouldValidate: true });
    }
  }, [category, form, selectableCategoryOptions]);

  return (
    <Dialog open={visible} onOpenChange={open => !open && onCancel()}>
      <DialogContent
        className="max-h-[calc(100vh-2rem)] gap-0 overflow-y-auto p-8 sm:max-w-3xl sm:p-9"
        onPointerDownOutside={event => event.preventDefault()}>
        <DialogHeader className="border-b pr-8 pb-5">
          <DialogTitle className="text-xl">{t(`${MENU_PAGE_I18N_PREFIX}.modal.${isEditing ? 'editTitle' : 'createTitle'}`)}</DialogTitle>
          <DialogDescription className="sr-only">{t(`${MENU_PAGE_I18N_PREFIX}.modal.createDescription`)}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8 pt-7" onSubmit={form.handleSubmit(onSave)}>
            <div className="grid gap-x-6 gap-y-7 **:data-[slot=form-item]:gap-2.5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.category`)}</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        value={String(field.value)}
                        onValueChange={value => value && field.onChange(Number(value))}>
                        {categoryOptions.map(option => (
                          <ToggleGroupItem key={option} value={String(option)} disabled={!selectableCategoryOptions.includes(option)}>
                            {t(categoryKeyMap[option])}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.parent`)}</FormLabel>
                    <FormControl>
                      <TreeSelect
                        allowClear
                        className="w-full"
                        disabled={parentLocked}
                        fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                        placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.rootMenu`)}
                        treeData={parentOptions}
                        treeDefaultExpandAll
                        value={field.value === 0 ? undefined : field.value}
                        onChange={value => field.onChange(value === undefined ? 0 : Number(value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                rules={{
                  validate: value => value.trim().length > 0 || t(`${MENU_PAGE_I18N_PREFIX}.validation.nameRequired`),
                  maxLength: { value: 64, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.nameMaxLength`) }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.name`)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="i18nKey"
                rules={{
                  maxLength: { value: 255, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.i18nKeyMaxLength`) }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.i18nKey`)}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.i18nKey`)}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                rules={{
                  validate: value => value.trim().length > 0 || t(`${MENU_PAGE_I18N_PREFIX}.validation.codeRequired`),
                  maxLength: { value: 128, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.codeMaxLength`) }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.code')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.code`)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sort"
                rules={{
                  required: t(`${MENU_PAGE_I18N_PREFIX}.validation.sortRequired`),
                  min: { value: 0, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.sortMin`) },
                  validate: value => Number.isInteger(value) || t(`${MENU_PAGE_I18N_PREFIX}.validation.sortInteger`)
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.order')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={1}
                        placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.sort`)}
                        value={field.value}
                        onChange={event => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.fields.status')}</FormLabel>
                    <FormControl>
                      <RadioGroup value={String(field.value)} onValueChange={value => field.onChange(Number(value))} className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={String(BOOLEAN_VALUE_MAP.TRUE)} id="menu-status-enable" />
                          <Label htmlFor="menu-status-enable">{t('common.status.enable')}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={String(BOOLEAN_VALUE_MAP.FALSE)} id="menu-status-disable" />
                          <Label htmlFor="menu-status-disable">{t('common.status.disable')}</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hidden"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.visibility`)}</FormLabel>
                    <FormControl>
                      <RadioGroup value={String(field.value)} onValueChange={value => field.onChange(Number(value))} className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={String(BOOLEAN_VALUE_MAP.FALSE)} id="menu-visibility-show" />
                          <Label htmlFor="menu-visibility-show">{t(`${MENU_PAGE_I18N_PREFIX}.visibility.show`)}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={String(BOOLEAN_VALUE_MAP.TRUE)} id="menu-visibility-hide" />
                          <Label htmlFor="menu-visibility-hide">{t(`${MENU_PAGE_I18N_PREFIX}.visibility.hide`)}</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="path"
                rules={{
                  maxLength: { value: 255, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.pathMaxLength`) }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.path`)}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.path`)}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                rules={{
                  maxLength: { value: 128, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.iconMaxLength`) }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.icon`)}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.icon`)}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="component"
                rules={{
                  maxLength: { value: 255, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.componentMaxLength`) }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.component`)}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.component`)}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="externalLink"
                rules={{
                  maxLength: { value: 500, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.externalLinkMaxLength`) },
                  validate: value => !value || isValidHttpUrl(value.trim()) || t(`${MENU_PAGE_I18N_PREFIX}.validation.externalLinkInvalid`)
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.externalLink`)}</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.externalLink`)}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              rules={{ maxLength: { value: 500, message: t(`${MENU_PAGE_I18N_PREFIX}.validation.descriptionMaxLength`) } }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t(`${MENU_PAGE_I18N_PREFIX}.form.placeholders.description`)}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="border-t pt-6">
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
