import type { RouteObject } from 'react-router';
import { Component } from './utils/dynamic';

export function GetFrontendRoutes() {
  const frontendRoutes: RouteObject[] = [
    {
      path: 'workbench',
      element: Component('/pages/dashboard/workbench')
    }
  ];
  return frontendRoutes;
}
