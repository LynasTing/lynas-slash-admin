import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/ui/collapsible';
import { useLocation } from 'react-router';
import { useState } from 'react';
import type { NavListProps } from '../types';
import { NavVerticalItem } from './nav-item';

export function NavVerticalList({ data, depth = 1 }: NavListProps) {
  const location = useLocation();
  // 当前菜单是否激活 / Check if the current route matches this nav item
  const isActive = location.pathname.includes(data.path);
  // 当前菜单是否展开 / Whether the current navigation item is open
  const [open, setOpen] = useState(isActive);
  // 是否有子菜单 / Whether the current navigation item has children
  const hasChild = data.children && data.children.length > 0;

  /**
   * 垂直导航项菜单点击事件
   */
  const handleVerticalItemClick = () => {
    if (hasChild) setOpen(!open);
  };

  // 隐藏菜单 / Hide menu
  if (data.hidden) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} data-nav-type="list">
      <CollapsibleTrigger className="w-full">
        <NavVerticalItem
          // data
          title={data.title}
          path={data.path}
          icon={data.icon}
          info={data.info}
          caption={data.caption}
          auth={data.auth}
          // state
          open={open}
          active={isActive}
          disabled={data.disabled}
          // options
          hasChild={hasChild}
          depth={depth}
          // event
          onClick={handleVerticalItemClick}
        />
      </CollapsibleTrigger>
      {hasChild && (
        <CollapsibleContent>
          <div className="flex flex-col mt-1 ml-4 gap-1">
            {data.children?.map(i => (
              <NavVerticalList key={i.title} data={i} depth={depth + 1} />
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
