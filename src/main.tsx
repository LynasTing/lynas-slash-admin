import '@/assets/style/global.css';
import '@/theme/theme.css';
import '@/locales/i18n';
import { worker } from './_mock';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import App from './App.tsx';
import { routersSections } from './router';
import { registerLocalIcons } from '@/components/icon';
import { urlJoin } from '@/utils';
import { GLOBAL_CONFIG } from '@/config/global';

registerLocalIcons();

await worker.start({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: urlJoin(GLOBAL_CONFIG.publicPath, 'mockServiceWorker.js')
  }
});

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    children: routersSections
  }
]);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
