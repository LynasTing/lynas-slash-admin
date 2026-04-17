import BannerCard from './banner-card';
import { QuickStats, type QuickStatProps } from './quick-stats';
import { MonthlyRevenue, type MonthlyRevenueData } from './monthly-revenue';
import { ProjectProgres, type ProjectTaskData } from './project-progress';
import { ProjectOverview } from './project-overview';
import { ProjectMembers } from './project-members';
import { TransactionTable, type Transaction } from './transaction-table';
import { IncomeBreakdown } from './income-breakdown';
import AvatarIMG1 from '@/assets/images/avatars/avatar_1.png';
import AvatarIMG2 from '@/assets/images/avatars/avatar_2.png';
import AvatarIMG3 from '@/assets/images/avatars/avatar_3.png';
import AvatarIMG4 from '@/assets/images/avatars/avatar_4.png';
import AvatarIMG5 from '@/assets/images/avatars/avatar_5.png';
import useLocale from '@/locales/use-locale';

/**
 * 项目成员
 * Project members
 */
const projectUsers = [
  { avatar: AvatarIMG1, name: 'John' },
  { avatar: AvatarIMG2, name: 'Wiliam' },
  { avatar: AvatarIMG3, name: 'Kevin' },
  { avatar: AvatarIMG4, name: 'Maciej' },
  { avatar: AvatarIMG5, name: 'Kamil' }
];

/**
 * 交易数据
 * Transaction data
 */
const transactions: Transaction[] = [
  { icon: 'mdi:spotify', name: 'Spotify Music', id: '#T11032', amount: 10000, time: '06:30 pm', trend: 'up', status: 'success' },
  { icon: 'mdi:medium', name: 'Medium', id: '#T11032', amount: -26, time: '08:30 pm', trend: 'down', status: 'pending' },
  { icon: 'mdi:uber', name: 'Uber', id: '#T11032', amount: 210000, time: '08:40 pm', trend: 'up', status: 'failed' },
  { icon: 'mdi:taxi', name: 'Ola Cabs', id: '#T11032', amount: 210000, time: '07:40 pm', trend: 'up', status: 'success' }
];

function Workbench() {
  const { t } = useLocale();
  const quickStats: QuickStatProps[] = [
    {
      icon: 'solar:wallet-outline',
      label: t('dashboard.quickStats.allEarnings'),
      value: '$3,020',
      percent: 30.6,
      color: '#3b82f6',
      chart: [12, 18, 14, 16, 12, 10, 14, 18, 16, 14, 12, 10]
    },
    {
      icon: 'solar:graph-outline',
      label: t('dashboard.quickStats.pageViews'),
      value: '290K+',
      percent: 30.6,
      color: '#f59e42',
      chart: [8, 12, 10, 14, 18, 16, 14, 12, 10, 14, 18, 16]
    },
    {
      icon: 'solar:checklist-outline',
      label: t('dashboard.quickStats.totalTask'),
      value: '839',
      percent: 0,
      color: '#10b981',
      chart: [10, 14, 12, 16, 18, 14, 12, 10, 14, 18, 16, 12]
    },
    {
      icon: 'solar:download-outline',
      label: t('dashboard.quickStats.download'),
      value: '2,067',
      percent: -30.6,
      color: '#ef4444',
      chart: [16, 14, 12, 10, 14, 18, 16, 12, 10, 14, 18, 16]
    }
  ];
  const monthlyRevenue: MonthlyRevenueData = {
    series: [
      {
        name: t('dashboard.revenue'),
        data: [30, 40, 35, 50, 49, 70, 91, 60, 50, 55, 60, 65]
      }
    ],
    categories: [
      t('dashboard.months.jan'),
      t('dashboard.months.feb'),
      t('dashboard.months.mar'),
      t('dashboard.months.apr'),
      t('dashboard.months.may'),
      t('dashboard.months.jun'),
      t('dashboard.months.jul'),
      t('dashboard.months.aug'),
      t('dashboard.months.sep'),
      t('dashboard.months.oct'),
      t('dashboard.months.nov'),
      t('dashboard.months.dec')
    ],
    percent: 5.44
  };
  const projectTasks: ProjectTaskData[] = [
    { label: t('dashboard.projectTasks.horizontalLayout'), color: '#3b82f6' },
    { label: t('dashboard.projectTasks.invoiceGenerator'), color: '#f59e42' },
    { label: t('dashboard.projectTasks.packageUpgrades'), color: '#fbbf24' },
    { label: t('dashboard.projectTasks.figmaAutoLayout'), color: '#10b981' }
  ];
  const totalIncome = {
    series: [44, 55, 41, 17],
    labels: [
      t('dashboard.incomeBreakdown.income'),
      t('dashboard.incomeBreakdown.download'),
      t('dashboard.incomeBreakdown.rent'),
      t('dashboard.incomeBreakdown.views')
    ],
    details: [
      { label: t('dashboard.incomeBreakdown.income'), value: 23876 },
      { label: t('dashboard.incomeBreakdown.download'), value: 23876 },
      { label: t('dashboard.incomeBreakdown.rent'), value: 23876 },
      { label: t('dashboard.incomeBreakdown.views'), value: 23876 }
    ]
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <BannerCard />
      {/* 顶部四个统计卡片 / Top four statistics cards */}
      <QuickStats data={quickStats} />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 月度收入 / Monthly income */}
        <MonthlyRevenue monthlyRevenue={monthlyRevenue} />
        {/* 项目进度 / project progress */}
        <ProjectProgres projectTasks={projectTasks} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 项目概览 / Project overview */}
        <ProjectOverview />
        {/* 项目成员 / Project members */}
        <ProjectMembers projectUsers={projectUsers} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 交易表格 / Transaction table */}
        <TransactionTable transactions={transactions} />
        {/* 收入明细 / Income breakdown */}
        <IncomeBreakdown totalIncome={totalIncome} />
      </section>
    </div>
  );
}

export default Workbench;
