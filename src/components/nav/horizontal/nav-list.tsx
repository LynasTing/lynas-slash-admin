import { useLocation } from 'react-router';
import type { NavListProps } from '../types';
import { NavItem } from './nav-item';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/ui/hover-card';

export function NavList({ data, depth = 0 }: NavListProps) {
  const hasChild = data.children && data.children?.length > 0;
  const location = useLocation();
  const isActive = location.pathname.includes(data.path);

  if (!data.hidden) return null;

  const renderNavItem = () => (
    <NavItem
      key={data.title}
      path={data.path}
      title={data.title}
      caption={data.caption}
      info={data.info}
      icon={data.icon}
      auth={data.auth}
      disabled={data.disabled}
      active={isActive}
      hasChild={hasChild}
      depth={depth}
    />
  );

  const renderRootItemWithHoverCard = () => {
    return (
      <HoverCard openDelay={100}>
        <HoverCardTrigger>{renderNavItem()}</HoverCardTrigger>
        <HoverCardContent side={depth === 1 ? 'bottom' : 'right'} sideOffset={10} className="p-1">
          {data.children?.map(i => (
            <NavList key={i.title} data={i} depth={depth + 1} />
          ))}
        </HoverCardContent>
      </HoverCard>
    );
  };

  return <li className="list-none">{hasChild ? renderRootItemWithHoverCard() : renderNavItem()}</li>;
}
