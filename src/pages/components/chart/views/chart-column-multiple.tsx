import { Chart, useChart } from '@/components/chart';

const series = [
  {
    name: 'Net Profit',
    data: Array.from({ length: 9 }, () => Math.floor(Math.random() * 300) + 1)
  },
  {
    name: 'Revenue',
    data: Array.from({ length: 9 }, () => Math.floor(Math.random() * 300) + 1)
  }
];

export default function ChartColumnMultiple() {
  const chartOptions = useChart({
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    },
    tooltip: {
      y: {
        formatter: (value: number) => `$${value} thousands`
      }
    },
    plotOptions: { bar: { columnWidth: '36%' } }
  });

  return <Chart type="bar" series={series} options={chartOptions} height={320} />;
}
