import { IndexPage } from '@/pages/IndexPage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/')({
  component: IndexPage,
})
