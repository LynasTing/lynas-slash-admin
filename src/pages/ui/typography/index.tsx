import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Text, Title } from '@/ui/typography';
import CodeExample from '../components/code-example';

export default function TypographyPage() {
  const { t } = useLocale();
  const prefix = 'ui.typography';
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">31</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.headings.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.headings.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="space-y-3">
            <Title as="h2">{t(`${prefix}.headings.h2`)}</Title>
            <Title as="h3">{t(`${prefix}.headings.h3`)}</Title>
            <Title as="h4">{t(`${prefix}.headings.h4`)}</Title>
          </div>
          <CodeExample
            code={`<div className="space-y-3">
  <Title as="h2">Heading level two</Title>
  <Title as="h3">Heading level three</Title>
  <Title as="h4">Heading level four</Title>
</div>`}
          />
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.text.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.text.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="space-y-2">
            <Text variant="body1" className="block">
              {t(`${prefix}.text.body`)}
            </Text>
            <Text variant="caption" color="secondary" className="block">
              {t(`${prefix}.text.caption`)}
            </Text>
            <Text variant="code" className="block w-fit">
              {t(`${prefix}.text.code`)}
            </Text>
          </div>
          <CodeExample
            code={`<div className="space-y-2">
  <Text variant="body1" className="block">Body text presents the primary explanatory content.</Text>
  <Text variant="caption" color="secondary" className="block">Supporting text adds context.</Text>
  <Text variant="code" className="block w-fit">const value = 1;</Text>
</div>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
