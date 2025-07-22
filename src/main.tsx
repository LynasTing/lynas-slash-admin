import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import { authRoutes } from '@/routes/sections/auth';

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    children: authRoutes
  }
]);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
