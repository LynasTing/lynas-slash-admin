import Logo from '@/components/logo';
import PlaceholderImg from '@/assets/images/background/placeholder.svg';
import { GLOBAL_CONFIG } from '@/config/global';
import { LoginProvider } from './providers/context';
import LocalePicker from '@/components/locale-picker';
import { Icon } from '@/components/icon';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';
import { useLoginStateContext } from './providers/declaration';
import { LoginStateEnum } from './providers/declaration';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

function AuthPage() {
  return (
    <div className="relative grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium cursor-pointer">
            <Logo size={28} />
            <h1>{GLOBAL_CONFIG.appName}</h1>
          </div>
        </div>
        <LoginProvider>
          <InnerAuthLayout />
        </LoginProvider>
      </div>
      <div className="relative hidden lg:block">
        <img src={PlaceholderImg} alt="placeholder img" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="absolute right-2 top-0 flex flex-row">
        <LocalePicker />
      </div>
    </div>
  );
}

function InnerAuthLayout() {
  const { t } = useTranslation();
  const { loginState, setLoginState } = useLoginStateContext();
  const navigate = useNavigate();

  /**
   * 返回登录
   */
  const backLogin = () => {
    setLoginState(LoginStateEnum.LOGIN);
    navigate(-1);
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-full max-w-xs">
        <Outlet />
        {loginState !== LoginStateEnum.LOGIN && (
          <Button variant="link" className="w-full cursor-pointer text-accent-foreground" onClick={backLogin}>
            <Icon icon="solar:alt-arrow-left-linear" size={20} />
            <span className="text-sm">{t('auth.backSignIn')}</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
