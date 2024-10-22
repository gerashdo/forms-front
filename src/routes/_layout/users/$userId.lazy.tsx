import { createLazyFileRoute } from '@tanstack/react-router';
import { ProtectedPage } from '@/pages/ProtectedPage';
import { UserPage } from '@/pages/user/UserPage';


export const Route = createLazyFileRoute('/_layout/users/$userId')({
  component: () => (
    <ProtectedPage>
      <UserPage />
    </ProtectedPage>
  ),
})
