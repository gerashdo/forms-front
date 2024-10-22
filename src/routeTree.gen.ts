/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutProfileImport } from './routes/_layout/profile'
import { Route as LayoutUsersIndexImport } from './routes/_layout/users/index'
import { Route as LayoutTemplatesIndexImport } from './routes/_layout/templates/index'
import { Route as LayoutUsersUserIdImport } from './routes/_layout/users/$userId'
import { Route as LayoutTemplatesTemplateIdImport } from './routes/_layout/templates/$templateId'
import { Route as LayoutFormsFormIdImport } from './routes/_layout/forms/$formId'
import { Route as LayoutTemplatesTemplateIdFormsSubmitImport } from './routes/_layout/templates_/$templateId.forms.submit'

// Create Virtual Routes

const AuthLazyImport = createFileRoute('/auth')()

// Create/Update Routes

const AuthLazyRoute = AuthLazyImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth.lazy').then((d) => d.Route))

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() => import('./routes/_layout/index.lazy').then((d) => d.Route))

const LayoutProfileRoute = LayoutProfileImport.update({
  path: '/profile',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/profile.lazy').then((d) => d.Route),
)

const LayoutUsersIndexRoute = LayoutUsersIndexImport.update({
  path: '/users/',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/users/index.lazy').then((d) => d.Route),
)

const LayoutTemplatesIndexRoute = LayoutTemplatesIndexImport.update({
  path: '/templates/',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/templates/index.lazy').then((d) => d.Route),
)

const LayoutUsersUserIdRoute = LayoutUsersUserIdImport.update({
  path: '/users/$userId',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/users/$userId.lazy').then((d) => d.Route),
)

const LayoutTemplatesTemplateIdRoute = LayoutTemplatesTemplateIdImport.update({
  path: '/templates/$templateId',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/templates/$templateId.lazy').then((d) => d.Route),
)

const LayoutFormsFormIdRoute = LayoutFormsFormIdImport.update({
  path: '/forms/$formId',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/forms/$formId.lazy').then((d) => d.Route),
)

const LayoutTemplatesTemplateIdFormsSubmitRoute =
  LayoutTemplatesTemplateIdFormsSubmitImport.update({
    path: '/templates/$templateId/forms/submit',
    getParentRoute: () => LayoutRoute,
  } as any).lazy(() =>
    import('./routes/_layout/templates_/$templateId.forms.submit.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLazyImport
      parentRoute: typeof rootRoute
    }
    '/_layout/profile': {
      id: '/_layout/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof LayoutProfileImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/forms/$formId': {
      id: '/_layout/forms/$formId'
      path: '/forms/$formId'
      fullPath: '/forms/$formId'
      preLoaderRoute: typeof LayoutFormsFormIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/templates/$templateId': {
      id: '/_layout/templates/$templateId'
      path: '/templates/$templateId'
      fullPath: '/templates/$templateId'
      preLoaderRoute: typeof LayoutTemplatesTemplateIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/users/$userId': {
      id: '/_layout/users/$userId'
      path: '/users/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof LayoutUsersUserIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/templates/': {
      id: '/_layout/templates/'
      path: '/templates'
      fullPath: '/templates'
      preLoaderRoute: typeof LayoutTemplatesIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/users/': {
      id: '/_layout/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof LayoutUsersIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/templates/$templateId/forms/submit': {
      id: '/_layout/templates/$templateId/forms/submit'
      path: '/templates/$templateId/forms/submit'
      fullPath: '/templates/$templateId/forms/submit'
      preLoaderRoute: typeof LayoutTemplatesTemplateIdFormsSubmitImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutProfileRoute: typeof LayoutProfileRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutFormsFormIdRoute: typeof LayoutFormsFormIdRoute
  LayoutTemplatesTemplateIdRoute: typeof LayoutTemplatesTemplateIdRoute
  LayoutUsersUserIdRoute: typeof LayoutUsersUserIdRoute
  LayoutTemplatesIndexRoute: typeof LayoutTemplatesIndexRoute
  LayoutUsersIndexRoute: typeof LayoutUsersIndexRoute
  LayoutTemplatesTemplateIdFormsSubmitRoute: typeof LayoutTemplatesTemplateIdFormsSubmitRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutProfileRoute: LayoutProfileRoute,
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutFormsFormIdRoute: LayoutFormsFormIdRoute,
  LayoutTemplatesTemplateIdRoute: LayoutTemplatesTemplateIdRoute,
  LayoutUsersUserIdRoute: LayoutUsersUserIdRoute,
  LayoutTemplatesIndexRoute: LayoutTemplatesIndexRoute,
  LayoutUsersIndexRoute: LayoutUsersIndexRoute,
  LayoutTemplatesTemplateIdFormsSubmitRoute:
    LayoutTemplatesTemplateIdFormsSubmitRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/auth': typeof AuthLazyRoute
  '/profile': typeof LayoutProfileRoute
  '/': typeof LayoutIndexRoute
  '/forms/$formId': typeof LayoutFormsFormIdRoute
  '/templates/$templateId': typeof LayoutTemplatesTemplateIdRoute
  '/users/$userId': typeof LayoutUsersUserIdRoute
  '/templates': typeof LayoutTemplatesIndexRoute
  '/users': typeof LayoutUsersIndexRoute
  '/templates/$templateId/forms/submit': typeof LayoutTemplatesTemplateIdFormsSubmitRoute
}

export interface FileRoutesByTo {
  '/auth': typeof AuthLazyRoute
  '/profile': typeof LayoutProfileRoute
  '/': typeof LayoutIndexRoute
  '/forms/$formId': typeof LayoutFormsFormIdRoute
  '/templates/$templateId': typeof LayoutTemplatesTemplateIdRoute
  '/users/$userId': typeof LayoutUsersUserIdRoute
  '/templates': typeof LayoutTemplatesIndexRoute
  '/users': typeof LayoutUsersIndexRoute
  '/templates/$templateId/forms/submit': typeof LayoutTemplatesTemplateIdFormsSubmitRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/auth': typeof AuthLazyRoute
  '/_layout/profile': typeof LayoutProfileRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/forms/$formId': typeof LayoutFormsFormIdRoute
  '/_layout/templates/$templateId': typeof LayoutTemplatesTemplateIdRoute
  '/_layout/users/$userId': typeof LayoutUsersUserIdRoute
  '/_layout/templates/': typeof LayoutTemplatesIndexRoute
  '/_layout/users/': typeof LayoutUsersIndexRoute
  '/_layout/templates/$templateId/forms/submit': typeof LayoutTemplatesTemplateIdFormsSubmitRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/auth'
    | '/profile'
    | '/'
    | '/forms/$formId'
    | '/templates/$templateId'
    | '/users/$userId'
    | '/templates'
    | '/users'
    | '/templates/$templateId/forms/submit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/auth'
    | '/profile'
    | '/'
    | '/forms/$formId'
    | '/templates/$templateId'
    | '/users/$userId'
    | '/templates'
    | '/users'
    | '/templates/$templateId/forms/submit'
  id:
    | '__root__'
    | '/_layout'
    | '/auth'
    | '/_layout/profile'
    | '/_layout/'
    | '/_layout/forms/$formId'
    | '/_layout/templates/$templateId'
    | '/_layout/users/$userId'
    | '/_layout/templates/'
    | '/_layout/users/'
    | '/_layout/templates/$templateId/forms/submit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
  AuthLazyRoute: typeof AuthLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
  AuthLazyRoute: AuthLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout",
        "/auth"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/profile",
        "/_layout/",
        "/_layout/forms/$formId",
        "/_layout/templates/$templateId",
        "/_layout/users/$userId",
        "/_layout/templates/",
        "/_layout/users/",
        "/_layout/templates/$templateId/forms/submit"
      ]
    },
    "/auth": {
      "filePath": "auth.lazy.tsx"
    },
    "/_layout/profile": {
      "filePath": "_layout/profile.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/forms/$formId": {
      "filePath": "_layout/forms/$formId.tsx",
      "parent": "/_layout"
    },
    "/_layout/templates/$templateId": {
      "filePath": "_layout/templates/$templateId.tsx",
      "parent": "/_layout"
    },
    "/_layout/users/$userId": {
      "filePath": "_layout/users/$userId.tsx",
      "parent": "/_layout"
    },
    "/_layout/templates/": {
      "filePath": "_layout/templates/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/users/": {
      "filePath": "_layout/users/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/templates/$templateId/forms/submit": {
      "filePath": "_layout/templates_/$templateId.forms.submit.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
