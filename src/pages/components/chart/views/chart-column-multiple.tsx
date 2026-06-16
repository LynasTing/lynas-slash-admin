import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const seriesData = [
  Array.from({ length: 9 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 9 }, () => Math.floor(Math.random() * 300) + 1)
];

export default function ChartColumnMultiple() {
  const { t } = useLocale();

  const series = [
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.netProfit`),
      data: seriesData[0]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.revenue`),
      data: seriesData[1]
    }
  ];

  const chartOptions = useChart({
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [
        t(`${CHART_PAGE_I18N_PREFIX}.months.feb`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.mar`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.apr`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.may`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.jun`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.jul`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.aug`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.sep`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.oct`)
      ]
    },
    tooltip: {
      y: {
        formatter: (value: number) => t(`${CHART_PAGE_I18N_PREFIX}.formatters.usdThousands`, { value })
      }
    },
    plotOptions: { bar: { columnWidth: '36%' } }
  });

  return <Chart type="bar" series={series} options={chartOptions} height={320} />;
}
