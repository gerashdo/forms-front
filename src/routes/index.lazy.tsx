import { IndexPage } from '@/pages/IndexPage';
import { createLazyFileRoute } from '@tanstack/react-router';


export const Route = createLazyFileRoute('/')({
  component: IndexPage,
})
