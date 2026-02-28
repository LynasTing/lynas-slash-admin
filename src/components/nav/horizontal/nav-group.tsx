import type { NavGroupProps } from '../types';
import { NavHorizontalList } from './nav-list';

export function NavHorizontalGroup({ items }: NavGroupProps) {
  return (
    <li className="flex items-center">
      <ul className="flex flex-row gap-1">
        {items.map((i, idx) => (
          <NavHorizontalList key={i.title || idx} data={i} depth={1} />
        ))}
      </ul>
    </li>
  );
}
