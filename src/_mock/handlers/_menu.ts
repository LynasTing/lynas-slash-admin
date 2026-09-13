import { http, delay, HttpResponse } from 'msw';
import { GLOBAL_CONFIG } from '@/config/global';
import { ResultStatusEnum } from '#/enum';
import type { SysMenuSaveRequest, SysMenuTreeNode } from '#/system/menu';
import { SYSTEM_MENU_API_MAP as MENU_API } from '@/api/system/menu';
import { SYSTEM_MENUS } from '../system-data';

const cloneMenuTree = (): SysMenuTreeNode[] => structuredClone(SYSTEM_MENUS);

const findMenu = (nodes: SysMenuTreeNode[], id: number): SysMenuTreeNode | undefined => {
  for (const node of nodes) {
    if (node.id === id) return node;
    const child = findMenu(node.children, id);
    if (child) return child;
  }
  return undefined;
};

const appendMenu = (nodes: SysMenuTreeNode[], node: SysMenuTreeNode): boolean => {
  if (node.parentId === 0) {
    nodes.push(node);
    return true;
  }
  const parent = findMenu(nodes, node.parentId);
  if (!parent) return false;
  parent.children.push(node);
  return true;
};

const nextMenuId = (): number => {
  const ids: number[] = [];
  const collect = (nodes: SysMenuTreeNode[]): void => {
    nodes.forEach(node => {
      ids.push(node.id);
      collect(node.children);
    });
  };
  collect(SYSTEM_MENUS);
  return Math.max(0, ...ids) + 1;
};

const toMenuNode = (value: SysMenuSaveRequest, id: number): SysMenuTreeNode => ({
  ...value,
  id,
  parentName: findMenu(SYSTEM_MENUS, value.parentId)?.name ?? null,
  i18nKey: value.i18nKey ?? '',
  path: value.path ?? null,
  component: value.component ?? null,
  icon: value.icon ?? null,
  description: value.description ?? null,
  externalLink: value.externalLink ?? null,
  children: []
});

const getMenuList = http.get(GLOBAL_CONFIG.apiBaseUrl + MENU_API.LIST, async () => {
  await delay(100);
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: cloneMenuTree() });
});

const createMenu = http.post(GLOBAL_CONFIG.apiBaseUrl + MENU_API.CREATE, async ({ request }) => {
  await delay(100);
  const value = (await request.json()) as SysMenuSaveRequest;
  const created = toMenuNode(value, nextMenuId());
  if (!appendMenu(SYSTEM_MENUS, created)) {
    return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Parent menu not found', data: null }, { status: 400 });
  }
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

const updateMenu = http.put(`${GLOBAL_CONFIG.apiBaseUrl}${MENU_API.RESOURCE}/:id`, async ({ params, request }) => {
  await delay(100);
  const id = Number(params.id);
  const target = findMenu(SYSTEM_MENUS, id);
  if (!target) {
    return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Menu not found', data: null }, { status: 404 });
  }
  const value = (await request.json()) as SysMenuSaveRequest;
  Object.assign(target, toMenuNode(value, id), { children: target.children });
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

const deleteMenu = http.delete(`${GLOBAL_CONFIG.apiBaseUrl}${MENU_API.RESOURCE}/:id`, async ({ params }) => {
  await delay(100);
  const id = Number(params.id);
  const remove = (nodes: SysMenuTreeNode[]): boolean => {
    const index = nodes.findIndex(node => node.id === id);
    if (index >= 0) {
      nodes.splice(index, 1);
      return true;
    }
    return nodes.some(node => remove(node.children));
  };
  if (!remove(SYSTEM_MENUS)) {
    return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Menu not found', data: null }, { status: 404 });
  }
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

export { getMenuList, createMenu, updateMenu, deleteMenu };
