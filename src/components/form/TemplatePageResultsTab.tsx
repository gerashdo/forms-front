import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDataTable } from "@/components/form/FormDataTable";
import { initialQueryParamsToGetForms } from "@/constants/form/form";
import { getFormsQuery } from "@/queries/form";


interface TemplatePageResultsTabProps {
  templateId: string
}

export const TemplatePageResultsTab = ({templateId}: TemplatePageResultsTabProps) => {
  const [page, setPage] = useState<number>(initialQueryParamsToGetForms.page);
  const navigation = useNavigate();
  const formsQuery = useSuspenseQuery(getFormsQuery({
    ...initialQueryParamsToGetForms,
    page: page,
    templateId: Number(templateId),
  }))
  const forms = formsQuery.data.data
  const totalPages = Math.ceil(formsQuery.data.meta.total / initialQueryParamsToGetForms.limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          Filled out forms for this template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormDataTable
          forms={forms}
          currentPage={page}
          totalPages={totalPages}
          onNextPage={() => setPage((prev) => prev + 1)}
          onPreviousPage={() => setPage((prev) => prev - 1)}
          onViewDetails={(formId) => navigation({to: `/forms/${formId}`})}
          onDelete={(formId) => console.log('delete', formId)}
        />
      </CardContent>
    </Card>
  );
}
