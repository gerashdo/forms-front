import { createFileRoute, redirect } from '@tanstack/react-router';
import { snapshot_UNSTABLE } from 'recoil';
import { AuthState } from '@/state/auth';
import { getTagsQuery, getTemplatesQuery, getTopicsQuery } from '@/queries/template';
import { getFormsQuery } from '@/queries/form';
import { initialQueryParamsToGetTemplates } from '@/constants/templates/template';
import { initialQueryParamsToGetForms } from '@/constants/form/form';


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
    queryClient.ensureQueryData(getTopicsQuery)
    queryClient.ensureQueryData(getTagsQuery)
    const snapshot = snapshot_UNSTABLE();
    const authState = snapshot.getLoadable(AuthState).getValue();
    const userId = authState.user!.id;
    queryClient.ensureQueryData(getTemplatesQuery({
      ...initialQueryParamsToGetTemplates,
      userId,
    }))
    queryClient.ensureQueryData(getFormsQuery({
      ...initialQueryParamsToGetForms,
      userId,
    }))
  },
})
