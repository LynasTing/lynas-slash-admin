import { Chart, useChart } from '@/components/chart';

const series = [
  {
    name: 'series1',
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000))
  },
  {
    name: 'series2',
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000))
  }
];

export default function ChartArea() {
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
