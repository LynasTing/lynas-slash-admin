import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const seriesData = [
  Array.from({ length: 11 }, () => Math.floor(Math.random() * 100) + 1),
  Array.from({ length: 11 }, () => Math.floor(Math.random() * 100) + 1),
  Array.from({ length: 11 }, () => Math.floor(Math.random() * 100) + 1)
];

export default function ChartMixed() {
  const { t } = useLocale();

  const series = [
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.teamA`),
      type: 'column',
      data: seriesData[0]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.teamB`),
      type: 'area',
      data: seriesData[1]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.teamC`),
      type: 'line',
      data: seriesData[2]
    }
  ];

  const chartOptions = useChart({
    stroke: {
      width: [0, 2, 3]
    },
    plotOptions: {
      bar: {
        columnWidth: '20%'
      }
    },
    fill: {
      type: ['solid', 'gradient', 'solid']
    },
    labels: [
      '01/05/2026',
      '02/05/2026',
      '03/05/2026',
      '04/05/2026',
      '05/05/2026',
      '06/05/2026',
      '07/05/2026',
      '08/05/2026',
      '09/05/2026',
      '10/05/2026',
      '11/05/2026'
    ],
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: t(`${CHART_PAGE_I18N_PREFIX}.units.points`)
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return t(`${CHART_PAGE_I18N_PREFIX}.formatters.points`, { value: value.toFixed(0) });
          }
          return value;
        }
      }
    }
  });

  return <Chart type="line" series={series} options={chartOptions} height={320} />;
}
