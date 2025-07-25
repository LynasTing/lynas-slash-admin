import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@/assets/styles/global.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import { sectionsRoutes } from '@/routes/sections';
import { registerIcons } from '@/components/icon';

await registerIcons();

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    children: sectionsRoutes
  }
]);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
