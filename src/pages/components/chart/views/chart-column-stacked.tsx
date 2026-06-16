import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const seriesData = [
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1),
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1),
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1),
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
];

export default function ChartColumnStacked() {
  const { t } = useLocale();

  const series = [
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.productA`),
      data: seriesData[0]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.productB`),
      data: seriesData[1]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.productC`),
      data: seriesData[2]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.productD`),
      data: seriesData[3]
    }
  ];

  const chartOptions = useChart({
    chart: {
      stacked: true,
      zoom: {
        enabled: true
      }
    },
    legend: {
      itemMargin: {
        vertical: 8
      },
      position: 'right',
      offsetY: 20
    },
    plotOptions: {
      bar: {
        columnWidth: '16%'
      }
    },
    stroke: {
      show: false
    },
    xaxis: {
      type: 'datetime',
      categories: ['01/01/2026 GMT', '01/02/2026 GMT', '01/03/2026 GMT', '01/04/2026 GMT', '01/05/2026 GMT', '01/06/2026 GMT']
    }
  });

  return <Chart type="bar" series={series} options={chartOptions} height={320} />;
}
