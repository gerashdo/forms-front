import { createLazyFileRoute } from '@tanstack/react-router';
import ProfilePage from '@/pages/auth/ProfilePage';
import { ProtectedPage } from '@/pages/ProtectedPage';


export const Route = createLazyFileRoute('/_layout/profile')({
  component: () => <ProtectedPage><ProfilePage/></ProtectedPage>,
})
