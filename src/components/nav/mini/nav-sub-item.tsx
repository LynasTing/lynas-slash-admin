import type { NavItemProps } from '../types';
import useLocale from '@/locales/use-locale';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';
import { Icon } from '@/components/icon';
import { cn } from '@/utils';
import { navItemClasses, navItemStyles } from '../styles';
import { NavItemRenderer } from '../components';

export const NavSubItem = (item: NavItemProps) => {
  const { t } = useLocale();

  const content = (
    <>
      {/* Caption */}
      {item.caption && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Icon icon="solar:info-circle-linear" size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t(item.caption)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Title */}
      <span className="flex-auto" style={navItemStyles.title}>
        {t(item.title)}
      </span>

      {/* Icon */}
      <span className="justify-center items-center mr-1" style={navItemStyles.icon}>
        {item.icon && typeof item.icon === 'string' ? <Icon icon={item.icon} /> : item.icon}
      </span>

      {/* Arrow */}
      {item.hasChild && <Icon icon="eva:arrow-ios-forward-fill" className="absolute right-1 top-2" style={navItemStyles.arrow} />}

      {/* Info */}
      {item.info && <span style={navItemStyles.info}>{item.info}</span>}
    </>
  );

  const itemClassName = cn(
    navItemClasses.base,
    navItemClasses.hover,
    item.active && item.depth === 1 && navItemClasses.active,
    item.active && item.depth !== 1 && 'bg-action-hover!',
    item.disabled && navItemClasses.disabled
  );

  return (
    <NavItemRenderer item={item} className={itemClassName}>
      {content}
    </NavItemRenderer>
  );
};
