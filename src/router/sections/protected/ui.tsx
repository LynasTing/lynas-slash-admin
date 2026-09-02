import { Navigate } from 'react-router';
import { Component } from '../utils/dynamic';
import type { AppRouteObject } from '@/router/types';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';

type ShadcnItem = readonly [path: string, name: string, icon: string];

const shadcnItems: readonly ShadcnItem[] = [
  ['avatar', 'avatar', 'solar:user-circle-bold-duotone'],
  ['badge', 'badge', 'solar:medal-ribbon-star-bold-duotone'],
  ['breadcrumb', 'breadcrumb', 'solar:map-point-bold-duotone'],
  ['button', 'button', 'solar:cursor-square-bold-duotone'],
  ['calendar', 'calendar', 'solar:calendar-mark-bold-duotone'],
  ['card', 'card', 'solar:card-bold-duotone'],
  ['checkbox', 'checkbox', 'solar:check-square-bold-duotone'],
  ['collapsible', 'collapsible', 'solar:mirror-left-bold-duotone'],
  ['command', 'command', 'solar:command-bold-duotone'],
  ['dialog', 'dialog', 'solar:chat-round-bold-duotone'],
  ['dropdown-menu', 'dropdownMenu', 'solar:alt-arrow-down-bold-duotone'],
  ['form', 'form', 'solar:pen-new-square-bold-duotone'],
  ['hover-card', 'hoverCard', 'solar:eye-bold-duotone'],
  ['input', 'input', 'solar:text-field-bold-duotone'],
  ['input-otp', 'inputOtp', 'solar:password-bold-duotone'],
  ['label', 'label', 'solar:tag-bold-duotone'],
  ['popover', 'popover', 'solar:chat-line-bold-duotone'],
  ['progress', 'progress', 'solar:graph-up-bold-duotone'],
  ['radio-group', 'radioGroup', 'solar:radio-bold-duotone'],
  ['scroll-area', 'scrollArea', 'solar:mouse-bold-duotone'],
  ['select', 'select', 'solar:list-check-bold-duotone'],
  ['separator', 'separator', 'solar:minus-circle-bold-duotone'],
  ['sheet', 'sheet', 'solar:document-text-bold-duotone'],
  ['slider', 'slider', 'solar:tuning-square-bold-duotone'],
  ['switch', 'switch', 'solar:power-bold-duotone'],
  ['tabs', 'tabs', 'solar:layers-bold-duotone'],
  ['textarea', 'textarea', 'solar:text-square-bold-duotone'],
  ['toggle', 'toggle', 'solar:box-minimalistic-bold-duotone'],
  ['toggle-group', 'toggleGroup', 'solar:widget-add-bold-duotone'],
  ['tooltip', 'tooltip', 'solar:info-circle-bold-duotone'],
  ['typography', 'typography', 'solar:text-bold-bold-duotone']
];

export const uiRoutes: AppRouteObject[] = [
  {
    path: 'ui',
    meta: {
      name: 'sys.nav.ui',
      code: 'ui',
      category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
      sort: 1,
      status: BOOLEAN_VALUE_MAP.TRUE,
      hidden: BOOLEAN_VALUE_MAP.FALSE,
      icon: 'solar:palette-round-bold-duotone',
      navGroup: {
        name: 'sys.nav.ui',
        sort: 2
      }
    },
    children: [
      { index: true, element: <Navigate to="components" replace /> },
      {
        path: 'components',
        meta: {
          name: 'sys.nav.components.label',
          code: 'ui-components',
          category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
          sort: 1,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE,
          description: 'sys.nav.components.description',
          icon: 'solar:widget-add-bold-duotone'
        },
        children: [
          { index: true, element: <Navigate to="toast" replace /> },
          {
            path: 'toast',
            element: Component('/pages/ui/components/toast'),
            meta: {
              name: 'sys.nav.components.toast',
              code: 'components-toast',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 1,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:chat-round-bold-duotone'
            }
          },
          {
            path: 'icon',
            element: Component('/pages/ui/components/icon'),
            meta: {
              name: 'sys.nav.components.icon',
              code: 'components-icon',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 2,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:tag-bold-duotone'
            }
          },
          {
            path: 'multi-language',
            element: Component('/pages/ui/components/multi-language'),
            meta: {
              name: 'sys.nav.components.multiLanguage',
              code: 'components-multi-language',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 3,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:map-point-bold-duotone'
            }
          },
          {
            path: 'scroll',
            element: Component('/pages/ui/components/scroll'),
            meta: {
              name: 'sys.nav.components.scroll',
              code: 'components-scroll',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 4,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:mouse-bold-duotone'
            }
          },
          {
            path: 'chart',
            element: Component('/pages/ui/components/chart'),
            meta: {
              name: 'sys.nav.components.chart',
              code: 'components-chart',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 5,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:graph-up-bold-duotone'
            }
          },
          {
            path: 'animate',
            element: Component('/pages/ui/components/animate'),
            meta: {
              name: 'sys.nav.components.animate',
              code: 'components-animate',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 6,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:mirror-left-bold-duotone'
            }
          },
          {
            path: 'upload',
            element: Component('/pages/ui/components/upload'),
            meta: {
              name: 'upload',
              code: 'components-upload',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 7,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:document-text-bold-duotone'
            }
          }
        ]
      },
      {
        path: 'shadcn',
        meta: {
          name: 'sys.nav.shadcn.label',
          code: 'ui-shadcn',
          category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
          sort: 2,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE,
          description: 'sys.nav.shadcn.description',
          icon: 'solar:code-square-bold-duotone'
        },
        children: [
          { index: true, element: <Navigate to="button" replace /> },
          ...shadcnItems.map(([path, name, icon]: ShadcnItem, index: number) => ({
            path,
            element: Component(`/pages/ui/shadcn/${path}`),
            meta: {
              name: `sys.nav.uiComponents.${name}`,
              code: `ui-${path}`,
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: index + 1,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon
            }
          }))
        ]
      }
    ]
  }
];
