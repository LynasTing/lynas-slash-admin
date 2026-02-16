import type { CSSProperties } from 'react';
import { themeVars } from '@/theme/theme.css';

export type NavItemStyle = {
  icon: CSSProperties;
  title: CSSProperties;
  caption: CSSProperties;
  info: CSSProperties;
  arrow: CSSProperties;
  texts: CSSProperties;
};

export const navItemStyles: NavItemStyle = {
  icon: {
    display: 'inline-flex',
    flexShrink: 0,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.875rem',
    fontWeight: 500,
    textAlign: 'left',
    lineHeight: 18 / 12
  },
  caption: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.75rem',
    fontWeight: 400,
    textAlign: 'left',
    color: themeVars.colors.text.disabled
  },
  info: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: '6px'
  },
  arrow: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    width: 16,
    height: 16,
    marginLeft: '6px',
    transition: 'all 0.3s ease-in-out'
  },
  texts: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 auto'
  }
};
