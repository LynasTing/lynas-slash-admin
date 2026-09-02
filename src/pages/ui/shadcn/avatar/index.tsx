import Avatar1IMG from '@/assets/images/avatars/avatar_1.png';
import Avatar2IMG from '@/assets/images/avatars/avatar_2.png';
import Avatar3IMG from '@/assets/images/avatars/avatar_3.png';
import useLocale from '@/locales/use-locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import CodeExample from '../components/code-example';

const avatarItems = [Avatar1IMG, Avatar2IMG, Avatar3IMG] as const;

/**
 * 展示 Avatar 的图片、后备内容和尺寸组合。
 * 图片列表来自项目内置资源，示例不会依赖网络请求。
 *
 * Shows Avatar images, fallback content, and size combinations.
 * The images use bundled project assets, so the examples do not depend on network requests.
 */
export default function AvatarPage() {
  const { t } = useLocale();
  const prefix = 'ui.avatar';

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="gap-0 rounded-none border-border py-0 shadow-none">
        <CardHeader className="gap-2 px-4 py-3 sm:px-5">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl tracking-tight sm:text-2xl">{t(`${prefix}.title`)}</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-5">{t(`${prefix}.description`)}</CardDescription>
          </div>
          <CardAction>
            <Badge className="rounded-none">07</Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.images.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.images.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-3">
            {avatarItems.map((src, index) => (
              <Avatar key={src}>
                <AvatarImage src={src} alt={t(`${prefix}.images.alt`, { index: index + 1 })} />
                <AvatarFallback>{index + 1}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <CodeExample code={'<Avatar><AvatarImage src={avatarUrl} alt="Avatar" /><AvatarFallback>UI</AvatarFallback></Avatar>'} />
        </CardContent>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.fallback.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.fallback.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <Avatar>
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <Avatar className="bg-primary text-primary-foreground">
              <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
            </Avatar>
          </div>
          <CodeExample code={'<Avatar><AvatarFallback>UI</AvatarFallback></Avatar>'} />
        </CardContent>
      </Card>

      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="border-b border-border px-4 py-3 sm:px-5">
          <div>
            <CardTitle>{t(`${prefix}.sizes.title`)}</CardTitle>
            <CardDescription className="mt-2 leading-6">{t(`${prefix}.sizes.description`)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="size-8">
              <AvatarImage src={Avatar1IMG} alt={t(`${prefix}.sizes.small`)} />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
              <AvatarImage src={Avatar2IMG} alt={t(`${prefix}.sizes.medium`)} />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className="size-16">
              <AvatarImage src={Avatar3IMG} alt={t(`${prefix}.sizes.large`)} />
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>
          <CodeExample
            code={`<Avatar className="size-12">
  <AvatarImage src={avatarUrl} alt="Avatar" />
  <AvatarFallback>UI</AvatarFallback>
</Avatar>`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
