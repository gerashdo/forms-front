import { MainPage } from '@/pages/MainPage';
import { createLazyFileRoute } from '@tanstack/react-router';


export const Route = createLazyFileRoute('/')({
  component: MainPage,
})
