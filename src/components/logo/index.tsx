import { cn } from '@/utils';
import { Icon } from '@/components/icon';
import { NavLink } from 'react-router';

interface Props {
  size?: string | number;
  className?: string;
}

function Logo({ size = 50, className }: Props) {
  return (
    <NavLink to="/" className={cn(className)}>
      <Icon icon="local:ic-logo" size={size} />
    </NavLink>
  );
}

export default Logo;
