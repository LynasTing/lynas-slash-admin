import { Chart, useChart } from '@/components/chart';

const series = [
  {
    name: 'Net Profit',
    data: Array.from({ length: 9 }).map(() => Math.floor(Math.random() * 300) + 1)
  }
];

export default function ChartColumnSingle() {
  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: '16%'
      }
    },
    stroke: {
      show: false
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    },
    tooltip: {
      y: {
        formatter: (value: number) => `$${value} thousands`
      }
    }
  });

  return <Chart type="bar" series={series} options={chartOptions} height={320} />;
}
