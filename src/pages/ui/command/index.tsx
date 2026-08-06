import { FileText, Search, Settings } from 'lucide-react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/ui/command';
import CodeExample from '../components/code-example';

/**
 * 展示 Command 的本地筛选、分组和快捷键提示。
 * 内嵌模式让用户可直接验证搜索与键盘选择，不依赖全局弹窗状态。
 *
 * Shows Command local filtering, groups, and shortcut hints.
 * The inline mode lets users verify search and keyboard selection without global dialog state.
 */
export default function CommandPage() {
  const { t } = useLocale();
  const prefix = 'ui.command';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">12</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.search.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.search.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <Command className="max-w-xl border border-border">
            <CommandInput placeholder={t(`${prefix}.search.placeholder`)} />
            <CommandList>
              <CommandEmpty>{t(`${prefix}.search.empty`)}</CommandEmpty>
              <CommandGroup heading={t(`${prefix}.groups.navigation`)}>
                <CommandItem>
                  <Search />
                  {t(`${prefix}.items.search`)}
                  <CommandShortcut>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FileText />
                  {t(`${prefix}.items.pages`)}
                  <CommandShortcut>G P</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading={t(`${prefix}.groups.settings`)}>
                <CommandItem>
                  <Settings />
                  {t(`${prefix}.items.settings`)}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
          <CodeExample
            code={`<Command>
  <CommandInput placeholder="Search commands" />
  <CommandList>
    <CommandGroup heading="Navigation"><CommandItem>Go to page</CommandItem></CommandGroup>
  </CommandList>
</Command>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
