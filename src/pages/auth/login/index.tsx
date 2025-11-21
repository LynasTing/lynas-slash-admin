import Logo from '@/components/logo';
import PlaceholderImg from '@/assets/images/background/placeholder.svg';
import { GLOBAL_CONFIG } from '@/config/global';
import { LoginProvider } from './providers/context';
import LoginForm from './login-form';
import LocalePicker from '@/components/locale-picker';

function LoginPage() {
  return (
    <div className="relative grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium cursor-pointer">
            <Logo size={28} />
            <h1>{GLOBAL_CONFIG.appName}</h1>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-xs">
            <LoginProvider>
              <LoginForm />
            </LoginProvider>
          </div>
        </div>
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

export default LoginPage;
