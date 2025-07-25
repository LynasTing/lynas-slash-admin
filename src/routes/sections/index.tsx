import { Navigate, type RouteObject } from 'react-router';
import { authRoutes } from './auth';
import { errorRoutes } from './error';

export const sectionsRoutes: RouteObject[] = [
  ...authRoutes,
  ...errorRoutes,
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
];
