import type { AppRouteObject } from './types';
import { authRoutes } from './sections/public/auth';
import { errorRoutes } from './sections/public/sys';
import { appRoutes } from './sections/protected';

export const routersSections: AppRouteObject[] = [...authRoutes, ...appRoutes, ...errorRoutes];
