import Button from '@/ui/button';
import { Card } from '@/ui/card';
import { Text } from '@/ui/typography';
import { useState } from 'react';
import { Icon } from '@/components/icon';
import { cn } from '@/utils';
import useLocale from '@/locales/use-locale';

/**
 * 交易数据类型
 * Transaction data type
 */
export interface Transaction {
  /**
   * 图标
   * Icon name
   */
  icon: string;

  /**
   * 名称
   * Transaction name
   */
  name: string;

  /**
   * 交易ID
   * Transaction ID
   */
  id: string;

  /**
   * 金额（正负表示收入/支出）
   * Amount (positive = income, negative = expense)
   */
  amount: number;

  /**
   * 时间
   * Time string
   */
  time: string;

  /**
   * 趋势（上涨 / 下跌）
   * Trend (up / down)
   */
  trend: 'up' | 'down';

  /**
   * 状态（用于筛选）
   * Status (used for filtering)
   */
  status: 'success' | 'pending' | 'failed';
}

/**
 * 交易表格
 * Transaction table
 */
export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const { t } = useLocale();
  const tabs: Array<{ value: 'all' | Transaction['status']; label: string }> = [
    { value: 'all', label: t('dashboard.all') },
    { value: 'success', label: t('dashboard.transactionStatus.success') },
    { value: 'pending', label: t('dashboard.transactionStatus.pending') },
    { value: 'failed', label: t('dashboard.transactionStatus.failed') }
  ];

  const [activeTab, setActiveTab] = useState<'all' | Transaction['status']>('all');
  const visibleTransactions = activeTab === 'all' ? transactions : transactions.filter(item => item.status === activeTab);

  return (
    <Card className="flex flex-col p-6 lg:col-span-2">
      <div className="flex items-center gap-4 mb-4">
        <Text variant="body2" className="font-semibold">
          {t('dashboard.transactions')}
        </Text>
        <div className="flex gap-2">
          {tabs.map(item => (
            <Button
              key={item.value}
              size="sm"
              variant={activeTab === item.value ? 'default' : 'ghost'}
              className="cursor-pointer"
              onClick={() => setActiveTab(item.value)}>
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {visibleTransactions.map(item => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="w-12 py-2">
                  <span className="inline-flex justify-center items-center w-10 h-10 rounde-full">
                    <Icon icon={item.icon} size={20} />
                  </span>
                </td>
                <td className="py-2">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs">{item.id}</div>
                </td>
                <td className="py-2 text-right font-bold">
                  {item.amount > 0 ? '+' : '-'}${Math.abs(item.amount).toLocaleString()}
                </td>
                <td className="py-2 text-right">
                  <span className={cn('text-xs font-bold', item.trend === 'up' ? 'text-green-500' : 'text-red-500')}>
                    <Icon icon={item.trend === 'up' ? 'mdi:arrow-up' : 'mdi:arrow-down'} size={14} /> {item.trend === 'up' ? '+' : '-'}10.6%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
