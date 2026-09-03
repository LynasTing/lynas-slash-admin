import { Card, CardContent, CardFooter } from '@/ui/card';
import { faker } from '@faker-js/faker';
import { Switch } from '@/ui/switch';
import Button from '@/ui/button';
import useLocale from '@/locales/use-locale';

export default function NotificationsPanel() {
  const { t } = useLocale();

  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex-1">
          <h4>{t('pages.management.user.account.notifications.activity.title')}</h4>
          <p className="text-text-secondary">{faker.lorem.sentence()}</p>
        </div>
        <div className="flex-2">
          <div className="flex w-full flex-col gap-4 rounded-lg bg-bg-neutral px-6 py-8">
            <div className="flex w-full justify-between">
              <div>{t('pages.management.user.account.notifications.activity.items.answerForm')}</div>
              <Switch defaultChecked />
            </div>
            <div className="flex w-full justify-between">
              <div>{t('pages.management.user.account.notifications.activity.items.commentArticle')}</div>
              <Switch />
            </div>
            <div className="flex w-full justify-between">
              <div>{t('pages.management.user.account.notifications.activity.items.followMe')}</div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h4>{t('pages.management.user.account.notifications.applications.title')}</h4>
          <p className="text-text-secondary">{faker.lorem.sentence()}</p>
        </div>
        <div className="flex-2">
          <div className="flex w-full flex-col gap-4 rounded-lg bg-bg-neutral px-6 py-8">
            <div className="flex w-full justify-between">
              <div>{t('pages.management.user.account.notifications.applications.items.news')}</div>
              <Switch />
            </div>
            <div className="flex w-full justify-between">
              <div>{t('pages.management.user.account.notifications.applications.items.productUpdates')}</div>
              <Switch defaultChecked />
            </div>
            <div className="flex w-full justify-between">
              <div>{t('pages.management.user.account.notifications.applications.items.blogDigest')}</div>
              <Switch />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="cursor-pointer">{t('pages.management.user.account.general.saveChanges')}</Button>
      </CardFooter>
    </Card>
  );
}
