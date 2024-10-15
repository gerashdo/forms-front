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
import { Route as LayoutTemplatesIndexImport } from './routes/_layout/templates/index'
import { Route as LayoutTemplatesTemplateIdImport } from './routes/_layout/templates/$templateId'

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

const LayoutTemplatesIndexRoute = LayoutTemplatesIndexImport.update({
  path: '/templates/',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/templates/index.lazy').then((d) => d.Route),
)

const LayoutTemplatesTemplateIdRoute = LayoutTemplatesTemplateIdImport.update({
  path: '/templates/$templateId',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/templates/$templateId.lazy').then((d) => d.Route),
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
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/templates/$templateId': {
      id: '/_layout/templates/$templateId'
      path: '/templates/$templateId'
      fullPath: '/templates/$templateId'
      preLoaderRoute: typeof LayoutTemplatesTemplateIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/templates/': {
      id: '/_layout/templates/'
      path: '/templates'
      fullPath: '/templates'
      preLoaderRoute: typeof LayoutTemplatesIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutTemplatesTemplateIdRoute: typeof LayoutTemplatesTemplateIdRoute
  LayoutTemplatesIndexRoute: typeof LayoutTemplatesIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutTemplatesTemplateIdRoute: LayoutTemplatesTemplateIdRoute,
  LayoutTemplatesIndexRoute: LayoutTemplatesIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/auth': typeof AuthLazyRoute
  '/': typeof LayoutIndexRoute
  '/templates/$templateId': typeof LayoutTemplatesTemplateIdRoute
  '/templates': typeof LayoutTemplatesIndexRoute
}

export interface FileRoutesByTo {
  '/auth': typeof AuthLazyRoute
  '/': typeof LayoutIndexRoute
  '/templates/$templateId': typeof LayoutTemplatesTemplateIdRoute
  '/templates': typeof LayoutTemplatesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/auth': typeof AuthLazyRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/templates/$templateId': typeof LayoutTemplatesTemplateIdRoute
  '/_layout/templates/': typeof LayoutTemplatesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/auth' | '/' | '/templates/$templateId' | '/templates'
  fileRoutesByTo: FileRoutesByTo
  to: '/auth' | '/' | '/templates/$templateId' | '/templates'
  id:
    | '__root__'
    | '/_layout'
    | '/auth'
    | '/_layout/'
    | '/_layout/templates/$templateId'
    | '/_layout/templates/'
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
        "/_layout/",
        "/_layout/templates/$templateId",
        "/_layout/templates/"
      ]
    },
    "/auth": {
      "filePath": "auth.lazy.tsx"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/templates/$templateId": {
      "filePath": "_layout/templates/$templateId.tsx",
      "parent": "/_layout"
    },
    "/_layout/templates/": {
      "filePath": "_layout/templates/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */