import { useState } from 'react';
import useLocale from '@/locales/use-locale';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/ui/input-otp';
import CodeExample from '../components/code-example';

/**
 * 展示 Input OTP 的受控验证码与分组结构。
 * 值由页面保存，以便示例同时覆盖输入、粘贴和完成态。
 *
 * Shows Input OTP controlled verification input and grouped slots.
 * The page stores its value so the example covers typing, paste, and completion states.
 */
export default function InputOtpPage() {
  const { t } = useLocale();
  const prefix = 'ui.inputOtp';
  const [value, setValue] = useState('');
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">17</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.controlled.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.controlled.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="mt-3 text-sm text-muted-foreground">
            {value ? t(`${prefix}.controlled.value`, { value }) : t(`${prefix}.controlled.empty`)}
          </p>
          <CodeExample
            code={`<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup><InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /></InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup><InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} /></InputOTPGroup>
</InputOTP>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
