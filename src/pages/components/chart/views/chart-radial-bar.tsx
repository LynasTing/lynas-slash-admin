import { Chart, useChart } from '@/components/chart';
import { formatNumber } from '@/utils';

const series = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100) + 1);

export default function ChartRadialBar() {
  const chartOptions = useChart({
    labels: ['Apple', 'Microsoft', 'Oracle', 'Amazon'],
    chart: {
      sparkline: {
        enabled: true
      }
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '68%'
        },
        dataLabels: {
          value: {
            offsetY: 16
          },
          total: {
            formatter: () => formatNumber(series.reduce((a, b) => a + b, 0))
          }
        }
      }
    }
  });

  return <Chart type="radialBar" series={series} options={chartOptions} height={320} />;
}
