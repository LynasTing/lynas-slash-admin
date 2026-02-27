import { cn } from '@/utils';
import type { NavProps } from '../types';
import { NavVerticalGroup } from './nav-group';

export function NavVertical({ data, className, ...props }: NavProps) {
  return (
    <nav className={cn('flex flex-col gap-1', className)} {...props}>
      {data.map((item, idx) => (
        <NavVerticalGroup key={item.name || idx} name={item.name} items={item.items} />
      ))}
    </nav>
  );
}
