import type { NavItemProps } from '../types';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';
import { Icon } from '@/components/icon';
import useLocale from '@/locales/use-locale';
import { NavItemRenderer } from '../components';
import { cn } from '@/utils';
import { navItemClasses, navItemStyles } from '../styles';

export const NavMiniRootItem = (item: NavItemProps) => {
  const { t } = useLocale();
  const content = (
    <>
      {/* Caption */}
      {item.caption && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Icon icon="solar:info-circle-linear" size={16} className="absolute top-2 left-1" />
            </TooltipTrigger>
            <TooltipContent side="right">{t(item.caption)}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Icon */}
      <span style={navItemStyles.icon}>{item.icon && typeof item.icon === 'string' ? <Icon icon={item.icon} size={24} /> : item.icon}</span>

      {/* Arrow */}
      {item.hasChild && <Icon icon="eva:arrow-ios-forward-fill" className="absolute top-2 right-1" style={navItemStyles.arrow} />}

      {/* Title */}
      <span style={navItemStyles.title} className="mt-1 text-center! text-xs!">
        {t(item.title)}
      </span>
    </>
  );

  const itemClassName = cn(
    navItemClasses.base,
    navItemClasses.hover,
    'relative min-h-12 flex-col px-1 pt-2 pb-1.5',
    item.active && item.depth === 1 && navItemClasses.active,
    item.active && item.depth !== 1 && 'bg-action-hover!',
    item.disabled && navItemClasses.disabled
  );

  return (
    <NavItemRenderer item={item} className={itemClassName}>
      {content}{' '}
    </NavItemRenderer>
  );
};
