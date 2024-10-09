import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { MainPage } from '@/pages/MainPage'


export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
  component: MainPage
})
