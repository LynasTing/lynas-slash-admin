import type { NavProps } from '../types';
import { cn } from '@/utils';
import { NavHorizontalGroup } from './nav-group';

export function NavHorizontal({ data, className, ...props }: NavProps) {
  return (
    <nav className={cn('flex items-center gap-1 min-h-(--layout-nav-height-horizontal) border-b border-dashed', className)} {...props}>
      {data.map((i, idx) => (
        <NavHorizontalGroup key={i.name || idx} name={i.name} items={i.items} />
      ))}
    </nav>
  );
}
