import { createLazyFileRoute } from '@tanstack/react-router';
import AuthPage from '@/pages/auth/AuthPage';


export const Route = createLazyFileRoute('/auth')({
  component: AuthPage,
})
