import { useChart, Chart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const series = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000) + 1);

export default function ChartBar() {
  const { t } = useLocale();

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
        t(`${CHART_PAGE_I18N_PREFIX}.countries.italy`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.japan`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.china`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.canada`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.france`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.germany`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.southKorea`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.netherlands`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.unitedStates`),
        t(`${CHART_PAGE_I18N_PREFIX}.countries.unitedKingdom`)
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
