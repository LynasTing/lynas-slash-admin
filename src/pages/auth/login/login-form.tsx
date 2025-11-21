/**
 * @description 账号 + 密码 登录表单
 * @author LynasTing
 * @date 2025-11-21
 */

import { cn } from '@/utils';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { useForm } from 'react-hook-form';
import type { SignInRequest } from '@/api/services/auth';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';
import { useState, type ComponentPropsWithoutRef } from 'react';
import { useSignIn } from '@/store/user';
import { toast } from 'sonner';
import { useLoginStateContext } from './providers/declaration';
import { LoginStateEnum } from './providers/declaration';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { GLOBAL_CONFIG } from '@/config/global';

/**
 * ComponentPropsWithoutRef React 内置的类型工具
 * - 获取某个组件的 props 类型，但去掉 ref 属性
 */
function LoginForm({ className, ...props }: ComponentPropsWithoutRef<'form'>) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loginState } = useLoginStateContext();
  const signIn = useSignIn();

  const form = useForm<SignInRequest>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  if (loginState !== LoginStateEnum.LOGIN) {
    return null;
  }

  const finish = async (values: SignInRequest) => {
    setLoading(true);
    try {
      await signIn(values);
      navigate(GLOBAL_CONFIG.defaultRoute, { replace: true });
      toast.success(t('auth.loginSuccessTitle'), {
        closeButton: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <Form {...form} {...props}>
        <form className="space-y-4" onSubmit={form.handleSubmit(finish)}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">{t('auth.signInFormTitle')}</h1>
            <p className="text-balance text-sm text-muted-foreground">{t('auth.signInFormDescription')}</p>
          </div>

          <FormField
            control={form.control}
            name="username"
            rules={{ required: t('auth.accountPlaceholder') }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.userName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('auth.accountPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{ required: t('auth.passwordPlaceholder') }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.password')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={t('auth.passwordPlaceholder')} {...field} suppressHydrationWarning />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 登录按钮 */}
          <Button type="submit" className="w-full">
            {loading && <Loader2 className="mr-2 animate-spin" />}
            {t('auth.loginButton')}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
