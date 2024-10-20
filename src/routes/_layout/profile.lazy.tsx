import { createLazyFileRoute } from '@tanstack/react-router';
import ProfilePage from '@/pages/auth/ProfilePage';


export const Route = createLazyFileRoute('/_layout/profile')({
  component: ProfilePage,
})
