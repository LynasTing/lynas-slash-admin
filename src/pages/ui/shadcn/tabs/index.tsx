import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import CodeExample from '../components/code-example';

export default function TabsPage() {
  const { t } = useLocale();
  const prefix = 'ui.tabs';
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">26</Badge>
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
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <Tabs defaultValue="account" className="max-w-xl">
            <TabsList>
              <TabsTrigger value="account">{t(`${prefix}.items.account`)}</TabsTrigger>
              <TabsTrigger value="settings">{t(`${prefix}.items.settings`)}</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="border border-border p-4 text-sm">
              {t(`${prefix}.content.account`)}
            </TabsContent>
            <TabsContent value="settings" className="border border-border p-4 text-sm">
              {t(`${prefix}.content.settings`)}
            </TabsContent>
          </Tabs>
          <CodeExample
            code={`<Tabs defaultValue="account" className="max-w-xl">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account" className="border border-border p-4 text-sm">
    Account information appears in this content panel.
  </TabsContent>
  <TabsContent value="settings" className="border border-border p-4 text-sm">
    Settings options appear in this content panel.
  </TabsContent>
</Tabs>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
