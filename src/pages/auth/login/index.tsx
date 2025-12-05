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
import { useLoginStateContext } from '../providers/declaration';
import { LoginStateEnum } from '../providers/declaration';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { GLOBAL_CONFIG } from '@/config/global';
import { Checkbox } from '@/ui/checkbox';
import { Icon } from '@/components/icon';

/**
 * ComponentPropsWithoutRef React 内置的类型工具
 * - 获取某个组件的 props 类型，但去掉 ref 属性
 */
function LoginForm({ className, ...props }: ComponentPropsWithoutRef<'form'>) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  /** 记住我 / remeberme */
  const [remember, setRemember] = useState(true);

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  const form = useForm<SignInRequest>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  /** 渲染条件 / render condition */
  if (loginState !== LoginStateEnum.LOGIN) {
    return null;
  }

  /**
   * 忘记密码
   * forget password
   */
  const forgetPassword = () => {
    setLoginState(LoginStateEnum.RESET_PASSWORD);
    navigate('/auth/reset');
  };

  /**
   * 手机号登录
   * login by phone number
   */
  const phoneNumber = () => {
    setLoginState(LoginStateEnum.MOBILE);
    navigate('/auth/phone-number');
  };

  /**
   * 注册
   * register
   */
  const register = () => {
    setLoginState(LoginStateEnum.REGISTER);
    navigate('/auth/register');
  };

  /**
   * 提交登录
   * submit
   */
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
          {/* 记住我/忘记密码 */}
          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                // indeterminate 是 Shadcn UI 自带的枚举值之一，表示部分选中
                onCheckedChange={checked => setRemember(checked === 'indeterminate' ? false : checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('auth.rememberMe')}
              </label>
            </div>
            <Button variant="link" onClick={forgetPassword}>
              {t('auth.forgetPassword')}
            </Button>
          </div>

          {/* 登录按钮 */}
          <Button type="submit" className="w-full">
            {loading && <Loader2 className="mr-2 animate-spin" />}
            {t('auth.loginButton')}
          </Button>
          {/* 手机号登录/二维码登录 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" className="w-full" onClick={phoneNumber}>
              <Icon icon="uil:mobile-android" size={20} />
              {t('auth.mobileSignInFormTitle')}
            </Button>
            <Button variant="outline">
              <Icon icon="uil:qrcode-scan" size={20} />
              {t('auth.qrSignInFormTitle')}
            </Button>
          </div>
          {/* 注册 */}
          <div className="text-sm text-center">
            {t('auth.noAccount')}
            <Button variant="link" className="px-1" onClick={register}>
              {t('auth.signUpFormTitle')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
