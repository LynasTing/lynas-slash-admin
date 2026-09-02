import { tokenExpiredApi } from '@/api/services/auth';
import Button from '@/ui/button';
import { Card, CardContent } from '@/ui/card';
import { useMutation } from '@tanstack/react-query';
import useLocale from '@/locales/use-locale';

/**
 * 模拟 token 过期的页面组件
 * 用于手动触发后端返回 401，从而测试全局鉴权逻辑（如跳转登录页）
 *
 * A page component to simulate token expiration
 * Used to manually trigger a 401 response and test global auth handling (e.g. redirect to login)
 */
export default function TokenExpired() {
  const { t } = useLocale();

  /**
   * react-query 的 mutation 实例
   * 用于执行有副作用的请求（这里是模拟 token 过期接口）
   *
   * React Query mutation instance
   * Used for side-effect requests (here: token expiration API)
   */
  const tokenExpiredMutation = useMutation({
    mutationFn: tokenExpiredApi
  });

  /**
   * 点击按钮后触发请求
   * 调用 mutate 会执行 tokenExpiredApi
   *
   * Trigger request on button click
   * Calling mutate will execute tokenExpiredApi
   */
  const mockTokenExpired = () => {
    tokenExpiredMutation.mutate();
  };

  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <p>{t('ui.functions.tokenExpired.desc')}</p>
        </div>
        <div>
          <Button className="cursor-pointer" onClick={mockTokenExpired}>
            {t('ui.functions.tokenExpired.action')}
          </Button>
        </div>
        <div />
      </CardContent>
    </Card>
  );
}
