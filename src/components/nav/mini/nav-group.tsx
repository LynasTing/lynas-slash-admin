import type { NavGroupProps } from '../types';
import { NavList } from './nav-list';

export function NavGroup({ items }: NavGroupProps) {
  return (
    <li>
      <ul className="flex flex-col gap-1">
        {items.map((i, idx) => (
          <NavList key={i.title || idx} data={i} depth={1} />
        ))}
      </ul>
    </li>
  );
}
