import { Icon } from '@/components/icon';
import { cn } from '@/utils';

interface TrendProps {
  /**
   * 趋势值（百分比）
   * Trend value (percentage)
   */
  value: number;
}

function Trend({ value }: TrendProps) {
  const trendMap = {
    up: {
      class: 'text-success',
      icon: 'mdi:arrow-up'
    },
    down: {
      class: 'text-error',
      icon: 'mdi:arrow-down'
    },
    flat: {
      class: 'text-muted-foreground',
      icon: null
    }
  };
  const type = value > 0 ? 'up' : value < 0 ? 'down' : 'flat';
  const config = trendMap[type];

  return (
    <span className={cn(config.class, 'flex items-center gap-1 font-bold')}>
      {config.icon && <Icon icon={config.icon} size={16} />}
      {Math.abs(value)}%
    </span>
  );
}

export default Trend;
