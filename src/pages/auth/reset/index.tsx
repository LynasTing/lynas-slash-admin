/**
 * @description 忘记密码
 * @author LynasTing
 */
import { LoginStateEnum, useLoginStateContext } from '../providers/declaration';
import { Icon } from '@/components/icon';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import Button from '@/ui/button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

function ResetPage() {
  const form = useForm();
  const { t } = useTranslation();
  const { loginState } = useLoginStateContext();

  const onFinish = () => {
    toast.success(t('auth.emailSent'));
  };

  if (loginState !== LoginStateEnum.RESET_PASSWORD) return null;

  return (
    <>
      <div className="mb-8 text-center">
        <Icon icon="local:ic-reset-password" size={100} className="text-primary!" />
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onFinish)}>
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-2xl font-bold">{t('auth.forgetFormTitle')}</h1>
            <p className="text-balance text-sm text-muted-foreground">{t('auth.forgetFormSecondTitle')}</p>
          </div>

          <FormField
            name="email"
            control={form.control}
            rules={{ required: t('auth.emailPlaceholder') }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('auth.email')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {t('auth.sendEmailButton')}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default ResetPage;
