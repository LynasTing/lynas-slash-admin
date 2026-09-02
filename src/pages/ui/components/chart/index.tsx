import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import Button from '@/ui/button';
import ChartArea from './views/chart-area';
import ChartLine from './views/chart-line';
import ChartColumnSingle from './views/chart-column-single';
import ChartColumnMultiple from './views/chart-column-multiple';
import ChartColumnStacked from './views/chart-column-stacked';
import ChartColumnNegative from './views/chart-column-negative';
import ChartBar from './views/chart-bar';
import ChartMixed from './views/chart-mixed';
import ChartPie from './views/chart-pie';
import ChartDonut from './views/chart-donut';
import ChartRadialBar from './views/chart-radial-bar';
import ChartRadar from './views/chart-radar';
import useLocale from '@/locales/use-locale';
import { CHART_PAGE_I18N_PREFIX } from './constants';

export default function ChartPage() {
  const { t } = useLocale();

  return (
    <>
      <Button variant="link" asChild>
        <a href="https://apexcharts.com" target="_blank" rel="noreferrer">
          https://apexcharts.com
        </a>
      </Button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.area`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartArea />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.line`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartLine />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.columnSingle`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartColumnSingle />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.columnMultiple`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartColumnMultiple />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.columnStacked`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartColumnStacked />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.columnNegative`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartColumnNegative />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.bar`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartBar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.columnMixed`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartMixed />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.pie`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartPie />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.donut`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartDonut />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.radialBar`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartRadialBar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t(`${CHART_PAGE_I18N_PREFIX}.cards.radar`)}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartRadar />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
