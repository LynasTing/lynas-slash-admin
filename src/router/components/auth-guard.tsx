import { useUserToken } from '@/store/user';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { accessToken } = useUserToken();
  const navigate = useNavigate();

  /**
   * 检查是否登录
   *
   * 为什么用 useCallback ?
   * - 保证 check 的引用稳定，不会因为每次组件渲染而重新创建函数
   */
  const check = useCallback(() => {
    console.log(`accessToken + ::>>`, accessToken);
    if (!accessToken) {
      navigate('/auth/login', { replace: true });
    }
  }, [accessToken, navigate]);

  /**
   * 当组件第一次渲染或 accessToken 发生变化时，执行 check
   */
  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
