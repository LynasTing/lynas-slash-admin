import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const series = Array.from({ length: 5 }, () => Math.floor(Math.random() * 60) + 1);

export default function ChartDonut() {
  const { t } = useLocale();

  const chartOptions = useChart({
    labels: [
      t(`${CHART_PAGE_I18N_PREFIX}.fruits.apple`),
      t(`${CHART_PAGE_I18N_PREFIX}.fruits.mango`),
      t(`${CHART_PAGE_I18N_PREFIX}.fruits.orange`),
      t(`${CHART_PAGE_I18N_PREFIX}.fruits.watermelon`),
      t(`${CHART_PAGE_I18N_PREFIX}.fruits.strawberry`)
    ],
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
