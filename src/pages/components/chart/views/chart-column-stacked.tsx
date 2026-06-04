import { Chart, useChart } from '@/components/chart';

const series = [
  {
    name: 'Product A',
    data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
  },
  {
    name: 'Product B',
    data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
  },
  {
    name: 'Product C',
    data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
  },
  {
    name: 'Product D',
    data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
  }
];

export default function ChartColumnStacked() {
  const chartOptions = useChart({
    chart: {
      stacked: true,
      zoom: {
        enabled: true
      }
    },
    legend: {
      itemMargin: {
        vertical: 8
      },
      position: 'right',
      offsetY: 20
    },
    plotOptions: {
      bar: {
        columnWidth: '16%'
      }
    },
    stroke: {
      show: false
    },
    xaxis: {
      type: 'datetime',
      categories: ['01/01/2026 GMT', '01/02/2026 GMT', '01/03/2026 GMT', '01/04/2026 GMT', '01/05/2026 GMT', '01/06/2026 GMT']
    }
  });

  return <Chart type="bar" series={series} options={chartOptions} height={320} />;
}
