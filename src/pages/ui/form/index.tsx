import { useForm } from 'react-hook-form';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import CodeExample from '../components/code-example';

type ExampleFormValues = { email: string };

/**
 * 展示 Form 与 React Hook Form 的字段绑定、说明和校验提示。
 * 使用提交触发校验，避免示例在用户输入首字符时过早显示错误。
 *
 * Shows Form field binding, descriptions, and validation feedback with React Hook Form.
 * Validation runs on submit so the example does not show an error after a user's first character.
 */
export default function FormPage() {
  const { t } = useLocale();
  const prefix = 'ui.form';
  const form = useForm<ExampleFormValues>({ defaultValues: { email: '' } });

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">15</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.validation.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.validation.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => undefined)} className="max-w-xl space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{ required: t(`${prefix}.validation.required`) }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`${prefix}.validation.label`)}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t(`${prefix}.validation.placeholder`)} {...field} />
                    </FormControl>
                    <FormDescription>{t(`${prefix}.validation.help`)}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{t(`${prefix}.validation.submit`)}</Button>
            </form>
          </Form>
          <CodeExample
            code={`const form = useForm({ defaultValues: { email: '' } });

<FormField control={form.control} name="email" render={({ field }) => (
  <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
)} />`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
