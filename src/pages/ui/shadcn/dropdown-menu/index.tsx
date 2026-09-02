import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu';
import CodeExample from '../components/code-example';

/**
 * 展示 Dropdown Menu 的普通操作、可独立切换项和互斥选项。
 * 状态保留在页面内部，示例可直接验证菜单关闭后值是否持续存在。
 *
 * Shows Dropdown Menu actions, independent toggles, and mutually exclusive choices.
 * State stays in the page so users can verify that values persist after the menu closes.
 */
export default function DropdownMenuPage() {
  const { t } = useLocale();
  const prefix = 'ui.dropdownMenu';
  const [isEnabled, setIsEnabled] = useState(true);
  const [alignment, setAlignment] = useState('start');

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">14</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.actions.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.actions.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t(`${prefix}.actions.trigger`)}>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuLabel>{t(`${prefix}.actions.label`)}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t(`${prefix}.actions.edit`)}</DropdownMenuItem>
              <DropdownMenuItem>{t(`${prefix}.actions.duplicate`)}</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">{t(`${prefix}.actions.delete`)}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CodeExample
            code={
              '<DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon">...</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Edit</DropdownMenuItem></DropdownMenuContent></DropdownMenu>'
            }
          />
        </CardContent>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.selection.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.selection.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{t(`${prefix}.selection.trigger`)}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuCheckboxItem checked={isEnabled} onCheckedChange={setIsEnabled}>
                {t(`${prefix}.selection.enabled`)}
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={alignment} onValueChange={setAlignment}>
                <DropdownMenuLabel>{t(`${prefix}.selection.alignment`)}</DropdownMenuLabel>
                <DropdownMenuRadioItem value="start">{t(`${prefix}.selection.start`)}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="center">{t(`${prefix}.selection.center`)}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <CodeExample
            code={
              '<DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Options</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuCheckboxItem checked={isEnabled}>Enabled</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu>'
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
