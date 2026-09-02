import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import CodeExample from '../components/code-example';

/**
 * 展示 Card 的信息层级、操作区和适合并排比较的紧凑布局。
 * 卡片在小屏保持单列，避免内容与操作区被压缩。
 *
 * Shows Card's information hierarchy, action area, and compact layout for side-by-side comparison.
 * Cards remain in one column on small screens so content and actions are not squeezed.
 */
export default function CardPage() {
  const { t } = useLocale();
  const prefix = 'ui.card';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">10</Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.anatomy.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.anatomy.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <Card className="gap-4 rounded-none border-border py-4 shadow-none">
            <CardHeader className="px-4">
              <div>
                <CardTitle>{t(`${prefix}.anatomy.sampleTitle`)}</CardTitle>
                <CardDescription className="mt-2">{t(`${prefix}.anatomy.sampleDescription`)}</CardDescription>
              </div>
              <CardAction>
                <Badge variant="outline" className="rounded-none">
                  {t(`${prefix}.anatomy.status`)}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="px-4 text-sm text-muted-foreground">{t(`${prefix}.anatomy.content`)}</CardContent>
            <CardFooter className="justify-end gap-2 border-t px-4 pt-4">
              <Button variant="outline">{t(`${prefix}.anatomy.secondaryAction`)}</Button>
              <Button>{t(`${prefix}.anatomy.primaryAction`)}</Button>
            </CardFooter>
          </Card>
          <CodeExample
            code={`<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter><Button>Save</Button></CardFooter>
</Card>`}
          />
        </CardContent>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.grid.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.grid.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {['first', 'second'].map(item => (
              <Card key={item} className="gap-3 rounded-none border-border py-4 shadow-none">
                <CardHeader className="px-4">
                  <CardTitle>{t(`${prefix}.grid.${item}.title`)}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 text-sm text-muted-foreground">{t(`${prefix}.grid.${item}.description`)}</CardContent>
              </Card>
            ))}
          </div>
          <CodeExample
            code={`<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter><Button>Save</Button></CardFooter>
</Card>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
