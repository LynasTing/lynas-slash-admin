import { useChart, Chart } from '@/components/chart';

const series = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000) + 1);

export default function ChartBar() {
  const chartOptions = useChart({
    stroke: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '30%'
      }
    },
    xaxis: {
      categories: [
        'Italy',
        'Japan',
        'China',
        'Canada',
        'France',
        'Germany',
        'South Korea',
        'Netherlands',
        'United States',
        'United Kingdom'
      ]
    }
  });

  return (
    <Chart
      type="bar"
      series={[
        {
          data: series
        }
      ]}
      options={chartOptions}
      height={320}
    />
  );
}
