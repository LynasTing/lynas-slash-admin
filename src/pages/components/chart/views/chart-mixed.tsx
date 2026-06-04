import { Chart, useChart } from '@/components/chart';

const series = [
  {
    name: 'Team A',
    type: 'column',
    data: Array.from({ length: 11 }, () => Math.floor(Math.random() * 100) + 1)
  },
  {
    name: 'Team B',
    type: 'area',
    data: Array.from({ length: 11 }, () => Math.floor(Math.random() * 100) + 1)
  },
  {
    name: 'Team C',
    type: 'line',
    data: Array.from({ length: 11 }, () => Math.floor(Math.random() * 100) + 1)
  }
];

export default function ChartMixed() {
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
        text: 'Points'
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return value.toFixed(0) + ' points';
          }
          return value;
        }
      }
    }
  });

  return <Chart type="line" series={series} options={chartOptions} height={320} />;
}
