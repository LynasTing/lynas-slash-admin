import { Chart, useChart } from '@/components/chart';
import { themeVars } from '@/theme/theme.css';

const series = [
  {
    name: 'Cash Flow',
    data: Array.from({ length: 33 }, () => Math.floor(Math.random() * 80) - 50)
  }
];

export default function ChartColumnStacked() {
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
