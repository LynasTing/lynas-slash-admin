import { Chart, useChart } from '@/components/chart';
import { themeVars } from '@/theme/theme.css';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const seriesData = Array.from({ length: 33 }, () => Math.floor(Math.random() * 80) - 50);

export default function ChartColumnStacked() {
  const { t } = useLocale();

  const series = [
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.cashFlow`),
      data: seriesData
    }
  ];

  const chartOptions = useChart({
    stroke: {
      show: false
    },
    xaxis: {
      type: 'datetime',
      categories: Array.from({ length: 33 }, (_, index) => new Date(new Date().getFullYear(), index, 1).toISOString().split('T')[0])
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value.toFixed(0)}% `
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '58%',
        colors: {
          ranges: [
            {
              from: -100,
              to: -46,
              color: themeVars.colors.palette.warning.default
            },
            {
              from: -45,
              to: 0,
              color: themeVars.colors.palette.info.default
            }
          ]
        }
      }
    }
  });

  return <Chart type="bar" series={series} options={chartOptions} height={320} />;
}
