import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { ScrollArea, ScrollBar } from '@/ui/scroll-area';
import CodeExample from '../components/code-example';

const scrollItems = Array.from({ length: 12 }, (_, index) => index + 1);

export default function ScrollAreaPage() {
  const { t } = useLocale();
  const prefix = 'ui.scrollArea';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">22</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.vertical.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.vertical.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <ScrollArea className="h-56 border border-border">
            <div className="space-y-2 p-4">
              {scrollItems.map(item => (
                <div key={item} className="border-b border-border pb-2 text-sm">
                  {t(`${prefix}.vertical.item`, { item })}
                </div>
              ))}
            </div>
          </ScrollArea>
          <CodeExample
            code={`<ScrollArea className="h-56 border border-border">
  <div className="space-y-2 p-4">
    {scrollItems.map(item => (
      <div key={item} className="border-b border-border pb-2 text-sm">
        Scrollable item {item}
      </div>
    ))}
  </div>
</ScrollArea>`}
          />
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.horizontal.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.horizontal.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <ScrollArea className="w-full border border-border">
            <div className="flex w-max gap-3 p-4">
              {scrollItems.map(item => (
                <div key={item} className="flex size-24 shrink-0 items-center justify-center border border-border text-sm">
                  {item}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <CodeExample
            code={`<ScrollArea className="w-full border border-border">
  <div className="flex w-max gap-3 p-4">
    {scrollItems.map(item => (
      <div key={item} className="flex size-24 shrink-0 items-center justify-center border border-border text-sm">
        {item}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
