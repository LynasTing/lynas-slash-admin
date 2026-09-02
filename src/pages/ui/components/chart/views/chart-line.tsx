import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const seriesData = [
  Array.from({ length: 9 }, () => Math.floor(Math.random() * 1000 + 1)),
  Array.from({ length: 9 }, () => Math.floor(Math.random() * 1000 + 1))
];

export default function ChartLine() {
  const { t } = useLocale();

  const series = [
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.series1`),
      data: seriesData[0]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.series2`),
      data: seriesData[1]
    }
  ];

  const chartOptions = useChart({
    xaxis: {
      categories: [
        t(`${CHART_PAGE_I18N_PREFIX}.months.jan`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.feb`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.mar`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.apr`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.may`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.jun`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.jul`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.aug`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.sep`)
      ]
    },
    tooltip: {
      x: {
        show: false
      },
      marker: {
        show: false
      }
    }
  });

  return <Chart type="line" series={series} options={chartOptions} height={320} />;
}
