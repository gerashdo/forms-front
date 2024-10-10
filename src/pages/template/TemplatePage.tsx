import { getTemplateByIdQuery } from "@/queries/template"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"


const route = getRouteApi('/templates/$templateId')

export const TemplatePage = () => {
  const {templateId} = route.useParams()
  const templateQuery = useSuspenseQuery(getTemplateByIdQuery(templateId))
  console.log({data: templateQuery.data.data.data})
  return (
    <div>
      Hello /templates/$templateId!
    </div>
  )
}
