import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbCurrentPage,
  BreadcrumbSeparator
} from '@/ui/breadcrumb';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import CodeExample from '../components/code-example';

/**
 * 展示 Breadcrumb 的基础路径、当前页和较长路径的省略形式。
 * 窄屏下列表允许换行，避免深层级路径挤出容器。
 *
 * Shows Breadcrumb's basic path, current page, and ellipsis form for deep paths.
 * The list wraps on narrow screens so deep paths do not overflow their container.
 */
export default function BreadcrumbPage() {
  const { t } = useLocale();
  const prefix = 'ui.breadcrumb';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">08</Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.defaultValue.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.defaultValue.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 overflow-x-auto px-4 py-4 sm:px-5">
          <Breadcrumb>
            <BreadcrumbList className="min-w-max sm:min-w-0">
              <BreadcrumbItem>
                <BreadcrumbLink href="/ui">{t(`${prefix}.items.home`)}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/ui">{t(`${prefix}.items.components`)}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbCurrentPage>{t(`${prefix}.items.current`)}</BreadcrumbCurrentPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <CodeExample
            code={`<Breadcrumb>
  <BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/ui">UI</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem></BreadcrumbList>
</Breadcrumb>`}
          />
        </CardContent>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.ellipsis.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.ellipsis.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 overflow-x-auto px-4 py-4 sm:px-5">
          <Breadcrumb>
            <BreadcrumbList className="min-w-max sm:min-w-0">
              <BreadcrumbItem>
                <BreadcrumbLink href="/ui">{t(`${prefix}.items.home`)}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
                <span className="sr-only">{t(`${prefix}.ellipsis.more`)}</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/ui">{t(`${prefix}.items.components`)}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbCurrentPage>{t(`${prefix}.items.current`)}</BreadcrumbCurrentPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <CodeExample code={'<BreadcrumbEllipsis />'} />
          <CodeExample
            code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/ui">UI</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
