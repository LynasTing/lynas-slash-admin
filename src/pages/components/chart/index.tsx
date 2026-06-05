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

export default function ChartPage() {
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
            <CardTitle>Area</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartArea />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Line</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartLine />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Column Single</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartColumnSingle />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Column Multiple</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartColumnMultiple />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Column Stacked</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartColumnStacked />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Column Negative</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartColumnNegative />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartBar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Column Mixed</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartMixed />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pie</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartPie />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Donut</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartDonut />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Radial Bar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartRadialBar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Radar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartRadar />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
