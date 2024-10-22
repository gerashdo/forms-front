import { createLazyFileRoute } from '@tanstack/react-router';
import { UsersPage } from '@/pages/auth/UsersPage';
import { ProtectedPage } from '@/pages/ProtectedPage';


export const Route = createLazyFileRoute('/_layout/users/')({
  component: () => <ProtectedPage><UsersPage/></ProtectedPage>,
})
