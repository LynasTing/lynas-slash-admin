import { useLocation } from 'react-router';
import type { NavListProps } from '../types';
import { NavRootItem } from './nav-root-item';
import { NavSubItem } from './nav-sub-item';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card';

export function NavList({ data, depth = 0 }: NavListProps) {
  const hasChild = data.children && data.children?.length > 0;
  const location = useLocation();
  const isActive = location.pathname.includes(data.path);

  if (data.hidden) return null;

  const renderRootNavItem = () => (
    <NavRootItem
      key={data.title}
      path={data.path}
      title={data.title}
      caption={data.caption}
      info={data.info}
      icon={data.icon}
      auth={data.auth}
      hasChild={hasChild}
      disabled={data.disabled}
      depth={depth}
      active={isActive}
    />
  );

  const renderSubNavItem = () => (
    <NavSubItem
      key={data.title}
      path={data.path}
      title={data.title}
      caption={data.caption}
      info={data.info}
      icon={data.icon}
      auth={data.auth}
      hasChild={hasChild}
      disabled={data.disabled}
      depth={depth}
      active={isActive}
    />
  );

  const renderNavItem = () => (depth === 1 ? renderRootNavItem() : renderSubNavItem());

  const renderRootItemWithHoverCard = () => (
    <HoverCard openDelay={100}>
      <HoverCardTrigger>{renderNavItem()}</HoverCardTrigger>
      <HoverCardContent side="right" sideOffset={10} className="p-1">
        {data.children?.map(i => (
          <NavList key={i.title} data={i} depth={depth + 1} />
        ))}
      </HoverCardContent>
    </HoverCard>
  );

  return <li className="list-none">{hasChild ? renderRootItemWithHoverCard() : renderNavItem()}</li>;
}
