import { Navigate, type RouteObject } from 'react-router';
import { Component } from '../dashboard/utils/dynamic';

export const uiRoutes: RouteObject[] = [
  {
    path: 'ui',
    children: [
      {
        index: true,
        element: <Navigate to="button" replace />
      },
      {
        path: 'button',
        element: Component('/pages/ui/button')
      },
      {
        path: 'badge',
        element: Component('/pages/ui/badge')
      },
      {
        path: 'checkbox',
        element: Component('/pages/ui/checkbox')
      },
      {
        path: 'input',
        element: Component('/pages/ui/input')
      },
      {
        path: 'select',
        element: Component('/pages/ui/select')
      },
      {
        path: 'switch',
        element: Component('/pages/ui/switch')
      },
      {
        path: 'avatar',
        element: Component('/pages/ui/avatar')
      },
      {
        path: 'breadcrumb',
        element: Component('/pages/ui/breadcrumb')
      },
      {
        path: 'calendar',
        element: Component('/pages/ui/calendar')
      },
      {
        path: 'card',
        element: Component('/pages/ui/card')
      },
      {
        path: 'collapsible',
        element: Component('/pages/ui/collapsible')
      },
      {
        path: 'command',
        element: Component('/pages/ui/command')
      },
      {
        path: 'dialog',
        element: Component('/pages/ui/dialog')
      },
      {
        path: 'dropdown-menu',
        element: Component('/pages/ui/dropdown-menu')
      },
      {
        path: 'form',
        element: Component('/pages/ui/form')
      },
      {
        path: 'hover-card',
        element: Component('/pages/ui/hover-card')
      },
      {
        path: 'input-otp',
        element: Component('/pages/ui/input-otp')
      },
      {
        path: 'label',
        element: Component('/pages/ui/label')
      },
      {
        path: 'popover',
        element: Component('/pages/ui/popover')
      },
      {
        path: 'progress',
        element: Component('/pages/ui/progress')
      },
      {
        path: 'radio-group',
        element: Component('/pages/ui/radio-group')
      },
      {
        path: 'scroll-area',
        element: Component('/pages/ui/scroll-area')
      },
      {
        path: 'separator',
        element: Component('/pages/ui/separator')
      },
      {
        path: 'sheet',
        element: Component('/pages/ui/sheet')
      },
      {
        path: 'slider',
        element: Component('/pages/ui/slider')
      },
      {
        path: 'tabs',
        element: Component('/pages/ui/tabs')
      },
      {
        path: 'textarea',
        element: Component('/pages/ui/textarea')
      },
      {
        path: 'toggle',
        element: Component('/pages/ui/toggle')
      },
      {
        path: 'toggle-group',
        element: Component('/pages/ui/toggle-group')
      },
      {
        path: 'tooltip',
        element: Component('/pages/ui/tooltip')
      },
      {
        path: 'typography',
        element: Component('/pages/ui/typography')
      }
    ]
  }
];
