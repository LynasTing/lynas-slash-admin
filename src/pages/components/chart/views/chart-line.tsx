import { Chart, useChart } from '@/components/chart';

const series = [
  {
    name: 'series1',
    data: Array.from({ length: 9 }).map(() => Math.floor(Math.random() * 1000 + 1))
  },
  {
    name: 'series2',
    data: Array.from({ length: 9 }).map(() => Math.floor(Math.random() * 1000 + 1))
  }
];

export default function ChartLine() {
  const chartOptions = useChart({
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
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
