import type { ReactNode } from 'react';
import { ThemeProvider } from '@/theme/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from '@/components/toast';
import { MotionLazy } from './components/animate/motion-lazy';

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
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <Toast />
        <MotionLazy>{children}</MotionLazy>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
