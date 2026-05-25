import { http, HttpResponse, delay } from 'msw';
import type { MenuTreeNode } from '#/entity';
import { MenuApi } from '@/api/services/menu';
import { GLOBAL_CONFIG } from '@/config/global';
import { ResultStatusEnum } from '#/enum';
import { DB_SYSTEM_MENU } from '../_backup';

/**
 * 克隆菜单树，避免接口调用方直接修改 mock 数据源
 * Clone the menu tree to prevent callers from mutating the mock data source directly
 *
 * @returns 克隆后的菜单树
 * @returns Cloned menu tree
 */
const cloneMenuTree = (): MenuTreeNode[] => structuredClone(DB_SYSTEM_MENU);

/**
 * 构建新增菜单节点
 * Build a created menu node
 *
 * @param value 表单提交值
 * @param value Submitted form value
 * @returns 可写入 mock 数据源的新节点
 * @returns New node ready to be written into the mock data source
 */
const createMenuNode = (value: MenuTreeNode): MenuTreeNode => ({
  ...value,
  id: value.id || `menu-${Date.now()}`
});

/**
 * 向菜单树追加节点
 * Append a node to the menu tree
 *
 * @param data 当前菜单树
 * @param data Current menu tree
 * @param node 待追加节点
 * @param node Node to append
 * @returns 是否追加成功
 * @returns Whether the append succeeded
 */
const appendMenuNode = (data: MenuTreeNode[], node: MenuTreeNode): boolean => {
  if (!node.parentId) {
    data.push(node);
    return true;
  }

  for (const item of data) {
    if (item.id === node.parentId) {
      item.children = [...(item.children ?? []), node];
      return true;
    }

    // 递归查找父节点，命中后提前结束 / Recursively find the parent and stop once matched
    if (item.children?.length && appendMenuNode(item.children, node)) {
      return true;
    }
  }

  return false;
};

/**
 * 更新菜单树中的节点
 * Update a node inside the menu tree
 *
 * @param data 当前菜单树
 * @param data Current menu tree
 * @param value 更新后的菜单节点
 * @param value Updated menu node
 * @returns 是否更新成功
 * @returns Whether the update succeeded
 */
const updateMenuNode = (data: MenuTreeNode[], value: MenuTreeNode): boolean => {
  for (const item of data) {
    if (item.id === value.id) {
      Object.assign(item, {
        ...value,
        children: value.children ?? item.children
      });
      return true;
    }

    // 递归更新子节点，命中后提前结束 / Recursively update child nodes and stop once matched
    if (item.children?.length && updateMenuNode(item.children, value)) {
      return true;
    }
  }

  return false;
};

/**
 * Mock 获取菜单列表接口
 * Mock menu list API
 */
const getMenuList = http.get(GLOBAL_CONFIG.apiBaseUrl + MenuApi.List, async () => {
  await delay(300);

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: cloneMenuTree()
  });
});

/**
 * Mock 新增菜单接口
 * Mock create menu API
 */
const createMenu = http.post(GLOBAL_CONFIG.apiBaseUrl + MenuApi.Create, async ({ request }) => {
  await delay(300);

  const value = (await request.json()) as MenuTreeNode;
  const createdNode = createMenuNode(value);

  appendMenuNode(DB_SYSTEM_MENU, createdNode);

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: cloneMenuTree()
  });
});

/**
 * Mock 更新菜单接口
 * Mock update menu API
 */
const updateMenu = http.post(GLOBAL_CONFIG.apiBaseUrl + MenuApi.Update, async ({ request }) => {
  await delay(300);

  const value = (await request.json()) as MenuTreeNode;
  updateMenuNode(DB_SYSTEM_MENU, value);

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: cloneMenuTree()
  });
});

export { getMenuList, createMenu, updateMenu };
