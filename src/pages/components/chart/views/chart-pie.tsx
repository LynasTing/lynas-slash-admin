import { Chart, useChart } from '@/components/chart';

const series = Array.from({ length: 5 }, () => Math.floor(Math.random() * 60) + 1);

export default function ChartPie() {
  const chartOptions = useChart({
    labels: ['Asia', 'Africa', 'Europe', 'Latin America', 'North America'],
    legend: {
      horizontalAlign: 'center'
    },
    stroke: {
      show: false
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false
      }
    },
    tooltip: {
      fillSeriesColor: false
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false
          }
        }
      }
    }
  });

  return <Chart type="pie" series={series} options={chartOptions} height={320} />;
}
