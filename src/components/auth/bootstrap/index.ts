import { getUserToken, setUserInfo, setAuthBootstrapStatus } from '@/store/user';
import { useEffect } from 'react';
import { getPublicUserInfoApi } from '@/api/auth';
import type { ReactNode } from 'react';

interface AuthBootstrapProps {
  children: ReactNode;
}

export default function AuthBootstrap({ children }: AuthBootstrapProps) {
  useEffect(() => {
    /**
     * 获取用户公开信息
     * Fetch public user information.
     */
    const fetcHUserInfo = async () => {
      try {
        setAuthBootstrapStatus('loading');
        const userInfo = await getPublicUserInfoApi();
        setUserInfo(userInfo);
        setAuthBootstrapStatus('ready');
      } catch (error) {
        console.error('获取用户信息失败:', error);
        setAuthBootstrapStatus('failed');
        // 不允许因为 /auth/me error 就清空用户信息，这会打断 request.ts 中的 refresh token 处理
        // clearUserAuth();
      }
    };

    if (getUserToken()) {
      fetcHUserInfo();
    }
  }, []);

  return children;
}
