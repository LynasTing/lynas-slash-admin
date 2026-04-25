import { useMemo, useState } from 'react';
import type { TimeRange } from './types';
import AnalyticsHeader from './analysics-header';
import { WebAnalysis, type WebAnalyticsProps } from './web-analytics';
import { MetricCard, type MetricCardProps, type MetricItem } from './metric-card';
import { TopPages, type TopPagesProps } from './top-pages';
import { SessionDevices, type DeviceStatProps } from './session-devices';
import { TopChannels, type TopChannelProps } from './top-channels';
import { TrafficData, type TrafficDataProps } from './traffic-data';
import useLocale from '@/locales/use-locale';

/**
 * 时间维度映射（day / week / month）
 * Mapping data by time range (day / week / month)
 */
type TimeMap<T> = {
  [K in TimeRange]: T;
};

/**
 * 带时间维度的指标卡片数据，重写 MetricCardProps
 * Metric card data with time-based metrics,Rewrite MetricCardProps
 */
type MetricCardWithTime = Omit<MetricCardProps, 'metrics'> & {
  metrics: TimeMap<MetricItem>;
};

/**
 * 仪表盘整体数据结构（按时间维度组织）
 * Dashboard data structure grouped by time dimension
 */
interface DashboardData {
  webAnalytic: TimeMap<WebAnalyticsProps>;
  metricCards: MetricCardWithTime[];
  topPages: TimeMap<TopPagesProps[]>;
  sessionDevices: TimeMap<DeviceStatProps[]>;
  topChannels: TimeMap<TopChannelProps>;
  trafficData: TimeMap<TrafficDataProps[]>;
}

/**
 * 仪表盘静态数据（模拟数据 / mock）
 * Dashboard mock data (static demo data)
 */
const dashboardData: DashboardData = {
  webAnalytic: {
    day: {
      pageViews: 32124,
      pageViewsChange: 4.2,
      avgTime: '3m 16s',
      avgTimeChange: -0.2,
      chart: {
        series: [
          { name: 'Natural', data: [40000, 60000, 90000, 100000, 80000, 70000, 60000, 50000, 70000, 90000, 80000, 90000] },
          { name: 'Referral', data: [30000, 40000, 50000, 60000, 50000, 40000, 30000, 40000, 50000, 60000, 50000, 40000] },
          { name: 'Direct', data: [50000, 60000, 40000, 30000, 40000, 50000, 60000, 70000, 80000, 70000, 60000, 50000] }
        ],
        categories: ['01 Jun', '02 Jun', '03 Jun', '04 Jun', '05 Jun', '06 Jun', '07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun']
      }
    },
    week: {
      pageViews: 210324,
      pageViewsChange: 2.1,
      avgTime: '3m 10s',
      avgTimeChange: -0.5,
      chart: {
        series: [
          { name: 'Natural', data: [400000, 600000, 900000, 1000000, 800000, 700000, 600000, 500000, 700000, 900000, 800000, 900000] },
          { name: 'Referral', data: [300000, 400000, 500000, 600000, 500000, 400000, 300000, 400000, 500000, 600000, 500000, 400000] },
          { name: 'Direct', data: [500000, 600000, 400000, 300000, 400000, 500000, 600000, 700000, 800000, 700000, 600000, 500000] }
        ],
        categories: [
          'Week 1',
          'Week 2',
          'Week 3',
          'Week 4',
          'Week 5',
          'Week 6',
          'Week 7',
          'Week 8',
          'Week 9',
          'Week 10',
          'Week 11',
          'Week 12'
        ]
      }
    },
    month: {
      pageViews: 420354,
      pageViewsChange: 4.8,
      avgTime: '3m 18s',
      avgTimeChange: -0.3,
      chart: {
        series: [
          { name: 'Natural', data: [50000, 60000, 65000, 67000, 62000, 64000, 66000, 68000, 69000, 70000, 71000, 72000] },
          { name: 'Referral', data: [40000, 42000, 43000, 44000, 45000, 46000, 47000, 48000, 49000, 50000, 51000, 52000] },
          { name: 'Direct', data: [45000, 47000, 48000, 49000, 50000, 51000, 52000, 53000, 54000, 55000, 56000, 57000] }
        ],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }
  },
  metricCards: [
    {
      title: 'dashboard.metricCards.visitors',
      bgColor: 'bg-orange-200',
      icon: 'mdi:users',
      metrics: {
        day: { value: 149328, change: 5.2, tip: 'dashboard.comparison.vsLastDay' },
        week: { value: 749853, change: 8.4, tip: 'dashboard.comparison.vsLastWeek' },
        month: { value: 1749853, change: 12.4, tip: 'dashboard.comparison.vsLastYear' }
      }
    },
    {
      title: 'dashboard.metricCards.conversionRate',
      bgColor: 'bg-emerald-200',
      icon: 'ph:seal-percent-fill',
      metrics: {
        day: { value: '6.8%', change: -1.8, tip: 'dashboard.comparison.vsLastDay' },
        week: { value: '7.0%', change: 0.2, tip: 'dashboard.comparison.vsLastWeek' },
        month: { value: '7.2%', change: 0.8, tip: 'dashboard.comparison.vsLastYear' }
      }
    },
    {
      title: 'dashboard.metricCards.adCampaigns',
      bgColor: 'bg-purple-200',
      icon: 'heroicons-solid:cursor-click',
      metrics: {
        day: { value: 17333, change: 2.3, tip: 'dashboard.comparison.vsLastDay' },
        week: { value: 114987, change: 6.1, tip: 'dashboard.comparison.vsLastWeek' },
        month: { value: 214987, change: 15.6, tip: 'dashboard.comparison.vsLastYear' }
      }
    }
  ],
  topPages: {
    day: [
      { url: '/dashboard', views: 6485, viewsChange: 1.7, unique: 1078, uniqueChange: 1.2 },
      { url: '/affiliate', views: 3687, viewsChange: 1.4, unique: 801, uniqueChange: 0.9 },
      { url: '/contract', views: 2918, viewsChange: 2.6, unique: 655, uniqueChange: 1.4 },
      { url: '/products', views: 4882, viewsChange: -0.7, unique: 936, uniqueChange: -0.3 },
      { url: '/sign-in', views: 1527, viewsChange: 1.1, unique: 389, uniqueChange: 0.8 },
      { url: '/about', views: 2103, viewsChange: -0.3, unique: 450, uniqueChange: -1.5 }
    ],
    week: [
      { url: '/dashboard', views: 36485, viewsChange: 2.7, unique: 11078, uniqueChange: 2.2 },
      { url: '/affiliate', views: 23687, viewsChange: 1.9, unique: 9801, uniqueChange: 1.5 },
      { url: '/contract', views: 12918, viewsChange: 3.1, unique: 7655, uniqueChange: 2.1 },
      { url: '/products', views: 14882, viewsChange: -0.2, unique: 9936, uniqueChange: 0.1 },
      { url: '/sign-in', views: 11527, viewsChange: 1.5, unique: 4389, uniqueChange: 1.2 },
      { url: '/about', views: 12103, viewsChange: 0.3, unique: 5450, uniqueChange: -0.5 }
    ],
    month: [
      { url: '/dashboard', views: 76485, viewsChange: 4.7, unique: 21078, uniqueChange: 3.2 },
      { url: '/affiliate', views: 43687, viewsChange: 2.4, unique: 18001, uniqueChange: 1.9 },
      { url: '/contract', views: 22918, viewsChange: 4.6, unique: 16555, uniqueChange: 2.4 },
      { url: '/products', views: 24882, viewsChange: 0.7, unique: 19360, uniqueChange: 0.3 },
      { url: '/sign-in', views: 21527, viewsChange: 2.1, unique: 8389, uniqueChange: 1.8 },
      { url: '/about', views: 22103, viewsChange: 0.8, unique: 9450, uniqueChange: -1.2 }
    ]
  },
  sessionDevices: {
    day: [
      { label: 'dashboard.devices.desktop', value: 42.1, color: '#3b82f6', icon: 'mdi:desktop-mac' },
      { label: 'dashboard.devices.mobile', value: 33.7, color: '#f59e42', icon: 'mdi:cellphone' },
      { label: 'dashboard.devices.tablet', value: 19.6, color: '#6366f1', icon: 'mdi:tablet' }
    ],
    week: [
      { label: 'dashboard.devices.desktop', value: 42.1, color: '#3b82f6', icon: 'mdi:desktop-mac' },
      { label: 'dashboard.devices.mobile', value: 33.7, color: '#f59e42', icon: 'mdi:cellphone' },
      { label: 'dashboard.devices.tablet', value: 19.6, color: '#6366f1', icon: 'mdi:tablet' }
    ],
    month: [
      { label: 'dashboard.devices.desktop', value: 42.1, color: '#3b82f6', icon: 'mdi:desktop-mac' },
      { label: 'dashboard.devices.mobile', value: 33.7, color: '#f59e42', icon: 'mdi:cellphone' },
      { label: 'dashboard.devices.tablet', value: 19.6, color: '#6366f1', icon: 'mdi:tablet' }
    ]
  },
  topChannels: {
    day: {
      change: 2.6,
      tip: 'dashboard.comparison.vsLastDay',
      channels: [
        { name: 'Google', percent: 42, total: 61731, icon: 'logos:google-icon' },
        { name: 'Instagram', percent: 28, total: 41210, icon: 'skill-icons:instagram' },
        { name: 'Facebook', percent: 16, total: 20590, icon: 'logos:facebook' },
        { name: 'X', percent: 9, total: 15820, icon: 'ri:twitter-x-fill' },
        { name: 'TikTok', percent: 5, total: 10211, icon: 'logos:tiktok-icon' }
      ]
    },
    week: {
      change: 5.4,
      tip: 'dashboard.comparison.vsLastWeek',
      channels: [
        { name: 'Google', percent: 39, total: 428900, icon: 'logos:google-icon' },
        { name: 'Instagram', percent: 30, total: 330120, icon: 'skill-icons:instagram' },
        { name: 'Facebook', percent: 18, total: 250430, icon: 'logos:facebook' },
        { name: 'X', percent: 8, total: 120880, icon: 'ri:twitter-x-fill' },
        { name: 'TikTok', percent: 5, total: 88010, icon: 'logos:tiktok-icon' }
      ]
    },

    month: {
      change: 8.9,
      tip: 'dashboard.comparison.vsLastMonth',
      channels: [
        { name: 'Google', percent: 37, total: 1823000, icon: 'logos:google-icon' },
        { name: 'Instagram', percent: 29, total: 1428000, icon: 'skill-icons:instagram' },
        { name: 'Facebook', percent: 19, total: 1104500, icon: 'logos:facebook' },
        { name: 'X', percent: 9, total: 620300, icon: 'ri:twitter-x-fill' },
        { name: 'TikTok', percent: 6, total: 410200, icon: 'logos:tiktok-icon' }
      ]
    }
  },
  trafficData: {
    day: [
      { source: 'dashboard.trafficSource.direct', visits: 1500, unique: 1200, bounce: 40, duration: '00:03:45', progress: 60 },
      { source: 'dashboard.trafficSource.natural', visits: 3000, unique: 2500, bounce: 35, duration: '00:04:20', progress: 75 },
      { source: 'dashboard.trafficSource.referral', visits: 1000, unique: 850, bounce: 45, duration: '00:03:10', progress: 80 },
      { source: 'dashboard.trafficSource.socialMedia', visits: 2000, unique: 1800, bounce: 50, duration: '00:02:50', progress: 40 },
      { source: 'dashboard.trafficSource.emailCampaign', visits: 800, unique: 700, bounce: 30, duration: '00:05:00', progress: 55 }
    ],
    week: [
      { source: 'dashboard.trafficSource.direct', visits: 11500, unique: 11200, bounce: 38, duration: '00:03:35', progress: 62 },
      { source: 'dashboard.trafficSource.natural', visits: 23000, unique: 22500, bounce: 33, duration: '00:04:10', progress: 78 },
      { source: 'dashboard.trafficSource.referral', visits: 11000, unique: 9850, bounce: 43, duration: '00:03:00', progress: 82 },
      { source: 'dashboard.trafficSource.socialMedia', visits: 12000, unique: 11800, bounce: 48, duration: '00:02:40', progress: 45 },
      { source: 'dashboard.trafficSource.emailCampaign', visits: 3800, unique: 3700, bounce: 28, duration: '00:05:10', progress: 59 }
    ],
    month: [
      { source: 'dashboard.trafficSource.direct', visits: 31500, unique: 31200, bounce: 36, duration: '00:03:25', progress: 65 },
      { source: 'dashboard.trafficSource.natural', visits: 53000, unique: 52500, bounce: 31, duration: '00:04:00', progress: 80 },
      { source: 'dashboard.trafficSource.referral', visits: 21000, unique: 19850, bounce: 41, duration: '00:02:50', progress: 85 },
      { source: 'dashboard.trafficSource.socialMedia', visits: 22000, unique: 21800, bounce: 46, duration: '00:02:30', progress: 50 },
      { source: 'dashboard.trafficSource.emailCampaign', visits: 7800, unique: 7700, bounce: 26, duration: '00:05:20', progress: 63 }
    ]
  }
};

/**
 * 数据分析页面
 * Analytics dashboard page
 */
export default function Analysis() {
  const { t } = useLocale();
  const [timeType, setTimeType] = useState<TimeRange>('day');

  const webAnalytic = useMemo(
    () => ({
      ...dashboardData.webAnalytic[timeType],
      chart: {
        ...dashboardData.webAnalytic[timeType].chart,
        series: dashboardData.webAnalytic[timeType].chart.series.map(item => ({
          ...item,
          name: t(`dashboard.trafficSource.${item.name.toLowerCase()}`)
        })),
        categories:
          timeType === 'month'
            ? [
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
              ]
            : dashboardData.webAnalytic[timeType].chart.categories
      }
    }),
    [t, timeType]
  );
  const metricCards = useMemo(() => {
    return dashboardData.metricCards.map(item => ({
      ...item,
      title: t(item.title),
      metrics: {
        ...item.metrics[timeType],
        tip: t(item.metrics[timeType].tip)
      }
    }));
  }, [t, timeType]);
  const topPages = dashboardData.topPages[timeType];
  const sessionDevices = useMemo(
    () =>
      dashboardData.sessionDevices[timeType].map(item => ({
        ...item,
        label: t(item.label)
      })),
    [t, timeType]
  );
  const topChannels = dashboardData.topChannels[timeType];
  const trafficData = useMemo(
    () =>
      dashboardData.trafficData[timeType].map(item => ({
        ...item,
        source: t(item.source)
      })),
    [t, timeType]
  );
  return (
    <div className="flex flex-col gap-4">
      <AnalyticsHeader timeType={timeType} setTimeType={setTimeType} />
      <div className="flex flex-col xl:grid grid-cols-4 gap-4">
        <WebAnalysis webAnalytic={webAnalytic} />
        <div className="flex flex-col xl:flex-col md:flex-row gap-4 h-full">
          {metricCards.map(item => (
            <MetricCard metricCard={item} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <TopPages topPages={topPages} />
        <SessionDevices sessionDevices={sessionDevices} />
        <TopChannels topChannels={topChannels} />
      </div>
      <TrafficData trafficData={trafficData} />
    </div>
  );
}
