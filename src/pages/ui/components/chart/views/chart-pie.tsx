import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const series = Array.from({ length: 5 }, () => Math.floor(Math.random() * 60) + 1);

export default function ChartPie() {
  const { t } = useLocale();

  const chartOptions = useChart({
    labels: [
      t(`${CHART_PAGE_I18N_PREFIX}.regions.asia`),
      t(`${CHART_PAGE_I18N_PREFIX}.regions.africa`),
      t(`${CHART_PAGE_I18N_PREFIX}.regions.europe`),
      t(`${CHART_PAGE_I18N_PREFIX}.regions.latinAmerica`),
      t(`${CHART_PAGE_I18N_PREFIX}.regions.northAmerica`)
    ],
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
