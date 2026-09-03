import { Card, CardContent } from '@/ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import Button from '@/ui/button';
import useLocale from '@/locales/use-locale';
import { toast } from 'sonner';

type ChangePWDForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function SecurityPanel() {
  const { t } = useLocale();

  const form = useForm<ChangePWDForm>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const handleSaveChange = () => {
    toast.success(t('pages.management.user.account.security.toast.changedSuccess'));
  };
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSaveChange)}>
            <FormField
              control={form.control}
              name="oldPassword"
              rules={{ required: t('pages.management.user.account.security.validation.oldPasswordRequired') }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.management.user.account.security.fields.oldPassword')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              rules={{ required: t('pages.management.user.account.security.validation.newPasswordRequired') }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.management.user.account.security.fields.newPassword')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{ required: t('pages.management.user.account.security.validation.confirmPasswordRequired') }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.management.user.account.security.fields.confirmPassword')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end">
              <Button type="submit" className="cursor-pointer">
                {t('pages.management.user.account.general.saveChanges')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SecurityPanel;
