import type { NavItemProps } from '../types';
import { NavItemRenderer } from '../components';
import { Icon } from '@/components/icon';
import { navItemClasses, navItemStyles } from '../styles';
import { cn } from '@/utils';
import useLocale from '@/locales/use-locale';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';

/**
 * 垂直导航栏单项组件
 * 根据传入的 item 属性渲染图标、标题、副标题、信息以及子菜单箭头
 *
 * Vertical navigation item component
 * Renders icon, title, caption, info, and arrow for submenu based on the passed item props
 */
export function NavVerticalItem(item: NavItemProps) {
  const { t } = useLocale();
  const { icon, active, depth, disabled, title, caption, info, hasChild, open } = item;

  const navItemRenderClassName = cn(
    navItemClasses.base,
    navItemClasses.hover,
    'min-h-[44px]',
    active && depth === 1 && navItemClasses.active,
    active && depth !== 1 && 'bg-action-hover!',
    disabled && navItemClasses.disabled
  );
  return (
    <NavItemRenderer item={item} className={navItemRenderClassName}>
      {/* Icon */}
      <span style={navItemStyles.icon} className="justify-center items-center mr-3">
        {icon && typeof icon === 'string' ? <Icon icon={icon} /> : icon}
      </span>

      <span className="min-h-[24px]" style={navItemStyles.texts}>
        {/* Title */}
        <span style={navItemStyles.title}>{title}</span>

        {/* Caption */}
        {caption && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span style={navItemStyles.caption}>{t(caption)}</span>
              </TooltipTrigger>
              <TooltipContent side="top" align="start">
                {t(caption)}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Info */}
        {info && <span style={navItemStyles.info}>{info}</span>}

        {/* Arrow */}
        {hasChild && (
          <Icon
            icon="eva:arrow-ios-forward-fill"
            style={{
              ...navItemStyles.arrow,
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
          />
        )}
      </span>
    </NavItemRenderer>
  );
}
