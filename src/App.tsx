import type { ReactNode } from 'react';
import { ThemeProvider } from '@/theme/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from '@/components/toast';

interface IProps {
  children?: ReactNode;
}

function App({ children }: IProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <Toast />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
