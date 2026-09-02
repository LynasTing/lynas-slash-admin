import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const seriesData = [
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000)),
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000))
];

export default function ChartArea() {
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
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z'
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  });

  return <Chart type="area" series={series} options={chartOptions} height={320} />;
}
