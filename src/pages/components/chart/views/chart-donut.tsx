import { Chart, useChart } from '@/components/chart';

const series = Array.from({ length: 5 }, () => Math.floor(Math.random() * 60) + 1);

export default function ChartDonut() {
  const chartOptions = useChart({
    labels: ['Apple', 'Mongo', 'Orange', 'Watermelon', 'Strawberry'],
    stroke: {
      show: false
    },
    legend: {
      horizontalAlign: 'center'
    },
    tooltip: {
      fillSeriesColor: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%'
        }
      }
    }
  });

  return <Chart type="donut" series={series} options={chartOptions} height={320} />;
}
