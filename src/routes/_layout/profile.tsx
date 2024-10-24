import { createFileRoute, redirect } from '@tanstack/react-router';
import { getTagsQuery, getTemplatesQuery, getTopicsQuery } from '@/queries/template';
import { getFormsQuery } from '@/queries/form';
import { getAuthStateSnapshot } from '@/helpers/auth';
import { initialQueryParamsToGetTemplates } from '@/constants/templates/template';
import { initialQueryParamsToGetForms } from '@/constants/form/form';


export const Route = createFileRoute('/_layout/profile')({
  beforeLoad: async ({location}) => {
    const authState = getAuthStateSnapshot();
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
    const authState = getAuthStateSnapshot();
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
