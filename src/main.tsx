import '@/assets/style/global.css';
import '@/theme/theme.css';
import '@/locales/i18n';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import App from './App.tsx';
import { routersSections } from './router';
import { registerLocalIcons } from '@/components/icon';
import { urlJoin } from '@/utils';
import { GLOBAL_CONFIG } from '@/config/global';
import ErrorBoundary from '@/router/components/error-boundary';
import { NavigationRegister } from '@/router/navigation/navigation-register';

registerLocalIcons();

if (import.meta.env.VITE_APP_USE_MOCK !== 'false') {
  const { worker } = await import('./_mock');

  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: urlJoin(GLOBAL_CONFIG.publicPath, 'mockServiceWorker.js')
    }
  });
}

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <NavigationRegister />
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routersSections
  }
]);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
