import { Form, FormField, FormItem, FormControl, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import Button from '@/ui/button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { signupApi } from '@/api/services/auth';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const defaultForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const form = useForm({
    defaultValues: {
      ...defaultForm
    }
  });

  const signUpmution = useMutation({
    mutationFn: signupApi
  });

  const onFinish = async (values: typeof defaultForm) => {
    try {
      await signUpmution.mutateAsync(values);
      toast.success(t('auth.registerSuccess'), {
        position: 'top-center'
      });
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center'
      });
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onFinish)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('auth.signUpFormTitle')}</h1>
        </div>
        <FormField
          control={form.control}
          name="username"
          rules={{ required: t('auth.accountPlaceholder') }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('auth.accountPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{ required: t('auth.emailPlaceholder') }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('auth.emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{ required: t('auth.accountPlaceholder') }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder={t('auth.passwordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{ required: t('auth.confirmPasswordPlaceholder') }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder={t('auth.confirmPasswordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t('auth.registerButton')}
        </Button>
        <div className="text-xs text-gray mb-2">
          <span>{t('auth.registerAndAgree')}</span>
          <a href="javascript:void(0)" className="text-sm underline! text-primary!">
            {t('auth.termsOfService')}
          </a>
          {' & '}
          <a href="javascript:void(0)" className="text-sm underline! text-primary!">
            {t('auth.privacyPolicy')}
          </a>
        </div>
      </form>
    </Form>
  );
}

export default Register;
