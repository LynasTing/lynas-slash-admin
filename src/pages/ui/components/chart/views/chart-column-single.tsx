import { Chart, useChart } from '@/components/chart';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from '../constants';

const seriesData = Array.from({ length: 9 }, () => Math.floor(Math.random() * 300) + 1);

export default function ChartColumnSingle() {
  const { t } = useLocale();

  const series = [
    {
      name: t(`${CHART_PAGE_I18N_PREFIX}.series.netProfit`),
      data: seriesData
    }
  ];

  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: '16%'
      }
    },
    stroke: {
      show: false
    },
    xaxis: {
      categories: [
        t(`${CHART_PAGE_I18N_PREFIX}.months.feb`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.mar`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.apr`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.may`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.jun`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.jul`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.aug`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.sep`),
        t(`${CHART_PAGE_I18N_PREFIX}.months.oct`)
      ]
    },
    tooltip: {
      y: {
        formatter: (value: number) => t(`${CHART_PAGE_I18N_PREFIX}.formatters.usdThousands`, { value })
      }
    }
  });

  return <Chart type="bar" series={series} options={chartOptions} height={320} />;
}
