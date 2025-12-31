import type { NavProps } from '../types';
import { cn } from '@/utils';
import { NavGroup } from './nav-group';

export function NavMini({ className, data, ...props }: NavProps) {
  return (
    <nav className={cn('flex flex-col', className)} {...props}>
      <ul className="flex flex-col gap-1">
        {data.map((i, idx) => (
          <NavGroup key={i.name || idx} items={i.items} />
        ))}
      </ul>
    </nav>
  );
}
