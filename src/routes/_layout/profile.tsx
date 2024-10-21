import { createFileRoute, redirect } from '@tanstack/react-router';
import { snapshot_UNSTABLE } from 'recoil';
import { AuthState } from '@/state/auth';
import { getTemplatesQuery } from '@/queries/template';
import { ALLOWED_TEMPLATE_ORDER_BY, ALLOWED_TEMPLATE_ORDER_BY_FIELDS } from '@/constants/templates/template';


export const Route = createFileRoute('/_layout/profile')({
  beforeLoad: async ({location}) => {
    const snapshot = snapshot_UNSTABLE();
    const authState = snapshot.getLoadable(AuthState).getValue();
    if (!authState.user) {
      throw redirect({
        to: '/auth',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  loader: async ({context: {queryClient}})  => {
    const snapshot = snapshot_UNSTABLE();
    const authState = snapshot.getLoadable(AuthState).getValue();
    const userId = authState.user!.id;
    queryClient.ensureQueryData(getTemplatesQuery({
      limit: 10,
      page: 1,
      orderBy: ALLOWED_TEMPLATE_ORDER_BY_FIELDS.createdAt,
      order: ALLOWED_TEMPLATE_ORDER_BY.DESC,
      userId,
    }))
  },
})
