import type { NavItemDataProps, NavProps } from '@/components/nav/types';
import type { MenuTree } from '#/entity';
import { Icon } from '@/components/icon';
import { Badge } from '@/ui/badge';
import { convertFlatToTree } from '@/utils';
import { DB_MENU } from '@/_mock/_backup';

/**
 * 递归地将后端 MenuTree 的 children 转换为前端导航所需的 NavItemDataProps
 * 该函数负责把后端菜单数据转换成导航组件可以直接使用的结构
 *
 * Recursively convert backend MenuTree children into NavItemDataProps
 * This function transforms backend menu data into a structure
 * that the navigation component can directly consume.
 */
const covnertChildren = (children?: MenuTree[]): NavItemDataProps[] => {
  if (!children?.length) return [];
  return children.map(i => ({
    title: i.name,
    path: i.path || '',
    icon: i.icon ? typeof i.icon === 'string' ? <Icon icon={i.icon} size={24} /> : i.icon : null,
    caption: i.caption,
    info: i.info ? <Badge variant="default">{i.info}</Badge> : null,
    disabled: i.disabled,
    externalLink: i.externalLink,
    auth: i.auth,
    hidden: i.hidden,
    children: covnertChildren(i.children)
  }));
};

/**
 *
 * 将 MenuTree 顶层结构转换为导航组件所需的 NavProps['data']
 * 每一个顶级菜单节点都会成为一个导航分组
 *
 *
 * Convert a MenuTree list into NavProps['data'] structure
 * Each top-level menu becomes a navigation section
 */
const convert = (menuTree: MenuTree[]): NavProps['data'] => {
  return menuTree.map(i => ({
    name: i.name,
    items: covnertChildren(i.children)
  }));
};

/**
 * 应用最终使用的导航数据
 * Final navigation data used by the application
 *
 * 数据流：
 * DB_MENU（扁平数据）
 * → convertFlatToTree（树形结构）
 * → convert（导航结构）
 *
 * Flow:
 * DB_MENU (flat list)
 * → convertFlatToTree (tree structure)
 * → convert (navigation structure)
 */
export const backendNavData: NavProps['data'] = convert(convertFlatToTree(DB_MENU));
