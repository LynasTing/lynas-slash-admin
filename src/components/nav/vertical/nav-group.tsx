import { useToggle } from 'react-use';
import useLocale from '@/locales/use-locale';
import { cn } from '@/utils';
import { Icon } from '@/components/icon';
import type { NavGroupProps } from '../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/ui/collapsible';
import { NavVerticalList } from './nav-list';

interface GroupProps {
  /**
   * 分组名称（可选）
   * Group name (optional)
   */
  name?: string;

  /**
   * 是否展开
   * Whether to expand
   */
  open: boolean;

  /**
   * 点击事件
   * Click event
   * @param nextVal - 下一个值
   */
  onClick: (nextVal: boolean) => void;
}

function Group({ name, open, onClick }: GroupProps) {
  const { t } = useLocale();

  return (
    name && (
      <div
        className={cn(
          'group w-full inline-flex items-center justify-start relative gap-2 cursor-pointer pt-4 pr-2 pb-2 pl-3 transition-all duration-300 ease-in-out',
          'hover: pl-4'
        )}
        onClick={() => onClick(!open)}>
        <Icon
          icon="eva:arrow-ios-forward-fill"
          className={cn(
            'absolute left-[-4px] h-4 w-4 inline-flex shrink-0 transition-all duration-300 ease-in-out", "opacity-0 group-hover:opacity-100',
            {
              'rotate-90': open
            }
          )}
        />
        <span className={cn('text-xs font-medium transition-all duration-300 ease-in-out text-text-disabled', 'hover:text-text-primary')}>
          {t(name)}
        </span>
      </div>
    )
  );
}

export function NavVerticalGroup({ name, items }: NavGroupProps) {
  const [open, toggleOpen] = useToggle(true);

  return (
    <Collapsible open={open}>
      <CollapsibleTrigger asChild>
        <Group name={name} open={open} onClick={toggleOpen} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col gap-1 w-full">
          {items.map((item, idx) => (
            <NavVerticalList key={item.title || idx} data={item} depth={1} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
