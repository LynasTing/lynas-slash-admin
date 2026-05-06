import { RouteObject } from 'react-router';
import { authRoutes } from './sections/auth';
import { appRoutes } from './sections/dashboard';
import { errorRoutes } from './sections/sys/error';

export const routersSections: RouteObject[] = [...authRoutes, ...appRoutes, ...errorRoutes];
