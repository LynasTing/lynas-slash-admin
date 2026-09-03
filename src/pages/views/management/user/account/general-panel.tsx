import { Card, CardContent, CardFooter } from '@/ui/card';
import { useUserInfo } from '@/store/user';
import { AvatarUpload } from '@/components/upload/avatar-upload';
import { Text } from '@/ui/typography';
import { Switch } from '@/ui/switch';
import Button from '@/ui/button';
import { useForm } from 'react-hook-form';
import { faker } from '@faker-js/faker';
import { Form, FormField, FormControl, FormItem, FormLabel } from '@/ui/form';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import useLocale from '@/locales/use-locale';
import { toast } from 'sonner';

type FromField = {
  /**
   * 用户名称
   * User name
   */
  name?: string;

  /**
   * 用户邮箱
   * User email
   */
  email?: string;

  /**
   * 用户电话
   * User phone number
   */
  phone?: string;

  /**
   * 用户地址
   * User address
   */
  address?: string;

  /**
   * 所在城市
   * City
   */
  city?: string;

  /**
   * 邮政编码
   * Postal code
   */
  code?: string;

  /**
   * 个人简介
   * Personal bio
   */
  about: string;
};

/**
 * 账户通用信息面板。
 * Account general information panel.
 */
export default function GeneralPanel() {
  const { t } = useLocale();
  const { avatar, username, email } = useUserInfo();
  const form = useForm<FromField>({
    defaultValues: {
      name: username,
      email,
      phone: faker.phone.number(),
      address: faker.location.county(),
      city: faker.location.city(),
      code: faker.location.zipCode(),
      about: faker.lorem.paragraphs()
    }
  });

  const handleSaveChange = () => {
    toast.success(t('pages.management.user.account.general.toast.savedChanges'));
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="col-span-1">
        <Card className="flex-col items-center px-6 pt-20 pb-10">
          <AvatarUpload defaultAvatar={avatar} />
          <div className="flex w-40 items-center gap-2 py-6">
            <Text variant="body1">{t('pages.management.user.account.general.publicProfile')}</Text>
            <Switch />
          </div>
          <Button variant="destructive" className="w-40">
            {t('pages.management.user.account.general.deleteUser')}
          </Button>
        </Card>
      </div>
      <div className="col-span-1">
        <Card>
          <CardContent>
            <Form {...form}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pages.management.user.account.general.fields.username')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pages.management.user.account.general.fields.email')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pages.management.user.account.general.fields.phone')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pages.management.user.account.general.fields.address')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pages.management.user.account.general.fields.city')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pages.management.user.account.general.fields.code')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pages.management.user.account.general.fields.about')}</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="cursor-pointer" onClick={handleSaveChange}>
              {t('pages.management.user.account.general.saveChanges')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
