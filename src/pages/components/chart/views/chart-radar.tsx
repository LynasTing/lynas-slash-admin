import { Chart, useChart } from '@/components/chart';
import { themeVars } from '@/theme/theme.css';

const series = [
  {
    name: 'series 1',
    data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
  },
  {
    name: 'series 2',
    data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
  },
  {
    name: 'series 3',
    data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
  }
];

export default function ChartRadar() {
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
