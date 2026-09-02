import { Chart, useChart } from '@/components/chart';
import { themeVars } from '@/theme/theme.css';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const seriesData = [
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1),
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1),
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
];

export default function ChartRadar() {
  const { t } = useLocale();

  const series = [
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.series1`),
      data: seriesData[0]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.series2`),
      data: seriesData[1]
    },
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.series3`),
      data: seriesData[2]
    }
  ];

  const chartOptions = useChart({
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center'
    },
    xaxis: {
      categories: Array.from({ length: 6 }, (_, index) => new Date().getFullYear() - index).reverse(),
      labels: {
        style: {
          colors: [
            themeVars.colors.text.secondary,
            themeVars.colors.text.secondary,
            themeVars.colors.text.secondary,
            themeVars.colors.text.secondary,
            themeVars.colors.text.secondary,
            themeVars.colors.text.secondary
          ]
        }
      }
    }
  });

  return <Chart type="radar" series={series} options={chartOptions} height={320} />;
}
