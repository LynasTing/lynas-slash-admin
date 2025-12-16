import { Link } from 'react-router';
import type { LinkProps } from 'react-router';
import React from 'react';

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: string;
}

/**
 * 路由入口统一封装组件
 * Router entry point component
 */
export const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(({ href, ...props }, ref) => (
  <Link ref={ref} to={href} {...props} />
));
