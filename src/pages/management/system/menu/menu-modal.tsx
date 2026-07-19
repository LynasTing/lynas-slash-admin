import type { MenuTreeNode } from '#/entity';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';
import { BasicStatusEnum, MenuTypeEnum } from '#/enum';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import { TreeSelect, AutoComplete, type AutoCompleteProps } from 'antd';
import { Input } from '@/ui/input';
import { useState, useCallback, useEffect, useMemo } from 'react';
import Button from '@/ui/button';
import useLocale from '@/locales/use-locale';

// 菜单管理页国际化前缀 / Menu management page i18n prefix
const MENU_PAGE_I18N_PREFIX = 'pages.management.system.menu';

export type MenuModalProps = {
  /**
   * 弹窗是否可见
   * Whether the modal is visible
   */
  visible: boolean;

  /**
   * 弹窗标题
   * Modal title
   */
  title: string;

  /**
   * 表单初始值
   * Initial form value
   */
  formValue: MenuTreeNode;

  /**
   * 父级菜单候选树
   * Parent menu option tree
   */
  menuTreeData: MenuTreeNode[];

  /**
   * 确认按钮是否处于提交中
   * Whether the confirm button is submitting
   */
  confirmLoading?: boolean;

  /**
   * 保存菜单配置
   * Save the menu configuration
   *
   * @param value 当前表单值
   * @param value Current form values
   */
  onSave(value: MenuTreeNode): void | Promise<void>;

  /**
   * 关闭弹窗
   * Close the modal
   */
  onCancel: VoidFunction;
};

// 页面组件模块集合 / Page component module map
const PAGES = import.meta.glob('/src/pages/**/*.tsx');

// 页面组件扫描入口路径 / Entry path for page component scanning
const ENTRY_PATH = '/src/pages';

// 组件路径选择项 / Component path select options
const PAGES_SELECT_OPTIONS = Object.entries(PAGES).map(([path]) => {
  // 去掉源码入口前缀，让表单只保存可用于路由配置的相对页面路径 / Strip the source prefix and keep route-ready page paths in the form.
  const pagePath = path.replace(ENTRY_PATH, '');

  return {
    label: pagePath,
    value: pagePath
  };
});

/**
 * 菜单编辑弹窗
 * Menu editing modal
 *
 * @param props 菜单弹窗属性
 * @param props Menu modal props
 * @returns 菜单表单弹窗
 * @returns Menu form modal
 */
export default function MenuModal({ visible, title, formValue, menuTreeData, confirmLoading = false, onSave, onCancel }: MenuModalProps) {
  const { t } = useLocale();

  // 菜单表单实例 / Menu form instance
  const formModal = useForm<MenuTreeNode>({
    defaultValues: formValue
  });
  const { reset } = formModal;

  // 页面组件联想选项 / Page component autocomplete options
  const [componentOptions, setComponentOptions] = useState<AutoCompleteProps['options']>(PAGES_SELECT_OPTIONS);

  /**
   * 将菜单树转换为可本地化展示的父级候选树
   * Convert menu nodes into localized parent options
   *
   * @param data 菜单树数据
   * @param data Menu tree data
   * @returns 带本地化名称的菜单树
   * @returns Menu tree with localized names
   */
  const getLocalizedMenuTreeData = useCallback(
    (data: MenuTreeNode[]): MenuTreeNode[] =>
      data.map(item => {
        // 递归翻译子级菜单名称，避免父级选择器展示原始英文 name
        // Recursively localize child labels so the parent selector does not show raw names.
        const children = item.children?.length ? getLocalizedMenuTreeData(item.children) : undefined;

        return {
          ...item,
          name: t(item.label),
          children
        };
      }),
    [t]
  );

  // 本地化后的父级菜单候选树 / Localized parent menu option tree
  const localizedMenuTreeData = useMemo(() => getLocalizedMenuTreeData(menuTreeData), [getLocalizedMenuTreeData, menuTreeData]);

  /**
   * 根据父级菜单名称更新组件路径候选项
   * Update component path options by parent menu name
   *
   * @param name 父级菜单名称
   * @param name Parent menu name
   * @returns 无返回值
   * @returns No return value
   */
  const updateComponentOptions = useCallback((name: string) => {
    // 未提供父级名称时保留当前候选项 / Keep current options when no parent name is provided
    if (!name) {
      setComponentOptions(PAGES_SELECT_OPTIONS);
      return;
    }

    // 用父级名称过滤页面路径，减少组件路径选择范围 / Filter page paths by parent name to narrow component choices
    setComponentOptions(PAGES_SELECT_OPTIONS.filter(item => item.value.toLowerCase().includes(name.toLowerCase())));
  }, []);

  /**
   * 根据父级菜单 ID 查找菜单名称
   * Find the menu name by parent menu ID
   *
   * @param parentId 父级菜单 ID
   * @param parentId Parent menu ID
   * @param data 菜单树数据
   * @param data Menu tree data
   * @returns 父级菜单名称
   * @returns Parent menu name
   */
  const getParentNameById = useCallback((parentId: string, data: MenuTreeNode[]): string => {
    // 没有父级 ID 时直接返回空名称 / Return an empty name when parent ID is missing
    if (!parentId) return '';

    for (const item of data) {
      // 当前节点匹配时返回当前菜单名称 / Return current menu name when the node matches
      if (item.id === parentId) return item.name;

      // 子级存在时递归向下查找 / Recursively search child nodes when they exist
      if (item.children?.length) {
        const parentName = getParentNameById(parentId, item.children);

        // 子树命中后提前结束遍历 / Stop traversal once the parent is found in a subtree
        if (parentName) return parentName;
      }
    }

    return '';
  }, []);

  /**
   * 同步弹窗表单初始值和组件路径候选项
   * Sync modal form values and component path options
   */
  useEffect(() => {
    // 弹窗切换编辑对象时重置表单值 / Reset form values when the edited menu changes
    reset(formValue);

    // 有父级菜单时按父级名称收窄组件候选项 / Narrow component options by parent menu name when parent exists
    if (formValue.parentId) {
      const parentName = getParentNameById(formValue.parentId, menuTreeData);
      updateComponentOptions(parentName);
    } else {
      // 顶级菜单没有父级，展示全部组件候选项 / Show all component options for top-level menus
      setComponentOptions(PAGES_SELECT_OPTIONS);
    }
  }, [formValue, reset, menuTreeData, getParentNameById, updateComponentOptions]);

  return (
    <Dialog open={visible} onOpenChange={open => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...formModal}>
          <form className="space-y-4" onSubmit={formModal.handleSubmit(onSave)}>
            <FormField
              control={formModal.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.type`)}</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={String(field.value)}
                      className="w-auto"
                      onValueChange={v => {
                        if (!v) return;
                        field.onChange(Number(v));
                      }}>
                      <ToggleGroupItem value={String(MenuTypeEnum.CATALOGUE)}>
                        {t(`${MENU_PAGE_I18N_PREFIX}.types.CATALOGUE`)}
                      </ToggleGroupItem>
                      <ToggleGroupItem value={String(MenuTypeEnum.MENU)}>{t(`${MENU_PAGE_I18N_PREFIX}.types.MENU`)}</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formModal.control}
              name="name"
              rules={{ required: t(`${MENU_PAGE_I18N_PREFIX}.validation.nameRequired`) }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formModal.control}
              name="label"
              rules={{ required: t(`${MENU_PAGE_I18N_PREFIX}.validation.labelRequired`) }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.label`)}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formModal.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.parent`)}</FormLabel>
                  <FormControl>
                    <TreeSelect
                      treeData={localizedMenuTreeData}
                      allowClear
                      value={field.value}
                      fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                      getPopupContainer={node => node.parentElement ?? document.body}
                      onChange={v => {
                        const parentId = String(v ?? '');
                        field.onChange(parentId);
                        updateComponentOptions(getParentNameById(parentId, menuTreeData));
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formModal.control}
              name="route"
              rules={{ required: t(`${MENU_PAGE_I18N_PREFIX}.validation.routeRequired`) }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.route`)}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formModal.watch('type') === MenuTypeEnum.MENU && (
              <FormField
                control={formModal.control}
                name="component"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.component`)}</FormLabel>
                    <FormControl>
                      <AutoComplete
                        options={componentOptions}
                        value={field.value}
                        filterOption={(input, option) => {
                          // 统一把候选项标签转成字符串，避免空值影响匹配 / Normalize option labels to strings to avoid matching errors
                          const label = String(option?.label ?? '').toLowerCase();
                          return label.includes(input.toLowerCase());
                        }}
                        onChange={value => field.onChange(value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={formModal.control}
              name="icon"
              rules={{ required: t(`${MENU_PAGE_I18N_PREFIX}.validation.iconRequired`) }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.icon`)}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formModal.control}
              name="hide"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${MENU_PAGE_I18N_PREFIX}.form.fields.visibility`)}</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={String(!!field.value)}
                      onValueChange={v => {
                        if (!v) return;
                        field.onChange(v === 'true');
                      }}>
                      <ToggleGroupItem value="false">{t(`${MENU_PAGE_I18N_PREFIX}.visibility.show`)}</ToggleGroupItem>
                      <ToggleGroupItem value="true">{t(`${MENU_PAGE_I18N_PREFIX}.visibility.hide`)}</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formModal.control}
              name="order"
              rules={{ required: t(`${MENU_PAGE_I18N_PREFIX}.validation.orderRequired`) }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.order')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value ?? ''}
                      onChange={event => {
                        const v = event.target.value;
                        field.onChange(v === '' ? undefined : Number(v));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formModal.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.status')}</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={String(field.value)}
                      onValueChange={v => {
                        if (!v) return;
                        field.onChange(Number(v));
                      }}>
                      <ToggleGroupItem value={String(BasicStatusEnum.ENABLE)}>
                        {t(BASIC_STATUS_LABEL_KEY_MAP[BasicStatusEnum.ENABLE])}
                      </ToggleGroupItem>
                      <ToggleGroupItem value={String(BasicStatusEnum.DISABLE)}>
                        {t(BASIC_STATUS_LABEL_KEY_MAP[BasicStatusEnum.DISABLE])}
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" onClick={onCancel} disabled={confirmLoading}>
                {t('common.actions.cancel')}
              </Button>
              <Button variant="default" type="submit" disabled={confirmLoading}>
                {t('common.actions.confirm')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
