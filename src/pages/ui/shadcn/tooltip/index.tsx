import { CircleHelp } from 'lucide-react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import CodeExample from '../components/code-example';

export default function TooltipPage() {
  const { t } = useLocale();
  const prefix = 'ui.tooltip';
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">30</Badge>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t(`${prefix}.defaultValue.trigger`)}>
                <CircleHelp />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t(`${prefix}.content`)}</TooltipContent>
          </Tooltip>
          <CodeExample
            code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon" aria-label="View help">
      <CircleHelp />
    </Button>
  </TooltipTrigger>
  <TooltipContent>This is additional information related to the current control.</TooltipContent>
</Tooltip>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
