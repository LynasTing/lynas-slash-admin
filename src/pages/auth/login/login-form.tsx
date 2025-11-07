import * as React from 'react';
import { cn } from '@/utils';
// import { useTranslation } from "react-i18next";
// import { useState } from "react";
// import {  LoginProvider } from './providers/context'
// import type { LoginStateEnum } from './providers/declaration';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/ui/form';
import { Input } from '@/ui/input';
import { useForm } from 'react-hook-form';
import type { SignInRequest } from '@/api/services/auth';
// import { DB_USER } from '@/_mock/_backup';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';

/**
 * ComponentPropsWithoutRef React 内置的类型工具
 * - 获取某个组件的 props 类型，但去掉 ref 属性
 */
function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { t } = useTranslation();

  const form = useForm<SignInRequest>({
    defaultValues: {
      // username: DB_USER[0].username,
      // password: DB_USER[0].password
      username: '',
      password: ''
    }
  });

  // const finish = (value: )

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <Form {...form} {...props}>
        <form className="space-y-4">
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
              </FormItem>
            )}
          />

          {/* 登录按钮 */}
          <Button type="submit" className="w-full">
            {t('auth.loginButton')}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
