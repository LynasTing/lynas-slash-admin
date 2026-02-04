import { ReactNode, Children, isValidElement, cloneElement, type CSSProperties } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';
import { Avatar, AvatarFallback } from '@/ui/avatar';

type Size = number | 'large' | 'medium' | 'small';

interface AvatarGroup {
  /**
   * 所有头像列表
   * Avatar list
   */
  children: ReactNode;
  max?: {
    /**
     * 最大可显示头像数量
     * Maximum number of avatars
     */
    count: number;
    /**
     * 作用在最后一个头像上
     * Applied to the last avatar
     */
    style?: CSSProperties;
  };
  /**
   * 所有头像尺寸
   * Avatar size
   */
  size: Size;
}

const getSizeStyles = (size: Size): CSSProperties => {
  if (typeof size === 'number') {
    return {
      width: size,
      height: size
    };
  }

  switch (size) {
    case 'small':
      return {
        width: 24,
        height: 24
      };
    case 'medium':
      return {
        width: 32,
        height: 32
      };
    case 'large':
      return {
        width: 40,
        height: 40
      };
    default:
      return {
        width: 32,
        height: 32
      };
  }
};

export default function AvatarGroup({ children, max, size }: AvatarGroup) {
  /**
   * React.Children.toArray() 将所有不确定形态的子元素转换为数组
   * - 自动补全 key
   *
   * React.Children.toArray(children) convert all unknown child elements into an array
   * - Automatically complete key
   */
  const avatars = Children.toArray(children);
  /** 总头像数量 / Total number of avatars */
  const total = avatars.length;
  /** 显示的头像列表 / List of avatars to display */
  let displayAvatars = avatars;
  /** 被隐藏的头像个数 / Number of hidden avatars  */
  let extra = 0;
  /** 被隐藏的头像列表 / List of hidden avatars */
  let extraAvatars: ReactNode[] = [];

  /**
   * 如果 头像总个数 > 最大可显示个数
   * If the total number of avatars > max count
   */
  if (max?.count && total > max.count) {
    /** 找到显示的头像列表 / Find the list of avatars to display */
    displayAvatars = avatars.slice(0, max.count - 1);
    extra = total - (max.count - 1);
    extraAvatars = avatars.slice(max.count - 1);
  }

  /** 头像尺寸样式 / Avatar size styles  */
  const sizeStyles = getSizeStyles(size);
  /** 被隐藏的头像尺寸样式 / Hidden avatar size styles */
  const extraStyles = max?.style ? { ...sizeStyles, ...max.style } : sizeStyles;

  /**
   * 克隆头像并统一注入尺寸样式
   * React 的 children 是不可变的，不能直接修改其 props
   * cloneElement 是 React 官方提供的安全改 props 方式
   *
   * Clone avatar and inject size styles
   * React's children are immutable, cannot directly modify its props
   * cloneElement is a safe way to change props
   */
  const cloneAvatarWithSize = (child: ReactNode): ReactNode => {
    if (isValidElement<{ style?: CSSProperties }>(child)) {
      return cloneElement(child, {
        style: {
          ...extraStyles
        }
      });
    }
    return child;
  };

  return (
    <div className="flex -space-x-3">
      {displayAvatars.map((item, idx) => (
        <div key={idx}>{cloneAvatarWithSize(item)}</div>
      ))}
      {extra > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Avatar style={extraStyles}>
                <AvatarFallback className="bg-bg-neutral font-semibold">+{extra}</AvatarFallback>
              </Avatar>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex gap-1">
              {extraAvatars.map((item, idx) => (
                <div key={idx}>{cloneAvatarWithSize(item)}</div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
