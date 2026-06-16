import { Chart, useChart } from '@/components/chart';
import { formatNumber } from '@/utils';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const series = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100) + 1);

export default function ChartRadialBar() {
  const { t } = useLocale();

  const chartOptions = useChart({
    labels: [
      t(`${CHART_PAGE_I18N_PREFIX}.companies.apple`),
      t(`${CHART_PAGE_I18N_PREFIX}.companies.microsoft`),
      t(`${CHART_PAGE_I18N_PREFIX}.companies.oracle`),
      t(`${CHART_PAGE_I18N_PREFIX}.companies.amazon`)
    ],
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
