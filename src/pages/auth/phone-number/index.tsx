import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { useEffect, useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/ui/input-otp';
import { Button } from '@/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { GLOBAL_CONFIG } from '@/config/global';

interface CountdownProps {
  value: number;
  onChange: (time: number) => void;
  onFinish: () => void;
}

function Countdown({ value, onChange, onFinish }: CountdownProps) {
  useEffect(() => {
    if (value <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      onChange(value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [value, onChange, onFinish]);

  return null;
}

interface MobileFormValues {
  phone: string;
  code: string;
}

function PhoneNumberPage() {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(0);
  const [second, setSecond] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const defaultForm = {
    phone: '',
    code: ''
  };

  const form = useForm<MobileFormValues>({
    defaultValues: {
      ...defaultForm
    }
  });

  const { trigger } = form;

  const start = async () => {
    const valid = await trigger('phone');
    if (valid) {
      setCountdown(60);
      setSecond(60);
    }
  };

  const reset = () => {
    setCountdown(0);
    setSecond(60);
  };

  const onFinish = async (value: MobileFormValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(GLOBAL_CONFIG.defaultRoute, { replace: true });
      toast.success(t('auth.loginSuccessTitle'), {
        closeButton: true
      });
    }, 1500);
    console.log(`MobileFormValues + ::>>`, value);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onFinish)}>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">{t('auth.mobileSignInFormTitle')}</h1>
        </div>

        <FormField
          control={form.control}
          name="phone"
          rules={{ required: t('auth.mobilePlaceholder') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.mobile')}</FormLabel>
              <FormControl>
                <Input placeholder={t('auth.mobile')} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          rules={{ required: t('auth.smsPlaceholder') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between items-center">
                <span className="text-sm">{t('auth.smsCode')}</span>
                <span className="text-sm text-muted-foreground" onClick={start}>
                  {!countdown ? (
                    <Button variant="ghost" className="cursor-pointer">
                      {t('auth.sendSmsButton')}
                    </Button>
                  ) : (
                    <div className="flex justify-center items-center">
                      <Countdown
                        value={countdown}
                        onChange={time => {
                          setCountdown(time);
                          setSecond(time);
                        }}
                        onFinish={reset}
                      />
                      <span className="ml-1">{t('auth.sendSmsText', { second })}</span>
                    </div>
                  )}
                </span>
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 animate-spin" />}
          {t('auth.loginButton')}
        </Button>
      </form>
    </Form>
  );
}

export default PhoneNumberPage;
