import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
import CodeExample from '../components/code-example';

/**
 * 展示 Dialog 的触发器、内容语义与响应式底部操作区。
 * Footer 在窄屏反向堆叠，确保主要操作保持明确且易触达。
 *
 * Shows Dialog triggers, content semantics, and a responsive footer.
 * The footer stacks in reverse on narrow screens so the primary action remains clear and reachable.
 */
export default function DialogPage() {
  const { t } = useLocale();
  const prefix = 'ui.dialog';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">13</Badge>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>{t(`${prefix}.defaultValue.trigger`)}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t(`${prefix}.content.title`)}</DialogTitle>
                <DialogDescription>{t(`${prefix}.content.description`)}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t(`${prefix}.content.cancel`)}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>{t(`${prefix}.content.confirm`)}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <CodeExample
            code={`<Dialog>
  <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
  <DialogContent><DialogHeader><DialogTitle>Confirm action</DialogTitle></DialogHeader></DialogContent>
</Dialog>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
