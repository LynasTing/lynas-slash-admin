import { RouteObject } from 'react-router';
import { authRoutes } from './sections/auth';
import { appRoutes } from './sections';

export const routersSections: RouteObject[] = [...authRoutes, ...appRoutes];
