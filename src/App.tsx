import type { ReactNode } from 'react';
import { ThemeProvider } from '@/theme/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from '@/components/toast';
import { MotionLazy } from './components/animate/motion-lazy';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import LogoIMG from '@/assets/icons/ic-logo-badge.svg';
import { GLOBAL_CONFIG } from './config/global';

if (import.meta.env.DEV) {
  import('react-scan').then(({ scan }) => {
    scan({
      enabled: false,
      showToolbar: true,
      log: false,
      animationSpeed: 'fast'
    });
  });
}

interface IProps {
  children?: ReactNode;
}

function App({ children }: IProps) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider>
          <Helmet>
            <title>{GLOBAL_CONFIG.appName}</title>
            <link rel="icon" href={LogoIMG} />
          </Helmet>
          <Toast />
          <MotionLazy>{children}</MotionLazy>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
