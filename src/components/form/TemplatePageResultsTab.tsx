import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDataTable } from "@/components/form/FormDataTable";
import { useDeleteFormMutation } from "@/hooks/form/useFormMutations";
import { useUndo } from "@/hooks/useUndo";
import { getFormsQuery } from "@/queries/form";
import { initialQueryParamsToGetForms } from "@/constants/form/form";


interface TemplatePageResultsTabProps {
  templateId: string;
  allowEdition?: boolean;
}

export const TemplatePageResultsTab = ({templateId, allowEdition}: TemplatePageResultsTabProps) => {
  const [page, setPage] = useState<number>(initialQueryParamsToGetForms.page);
  const {showToast} = useUndo();
  const {startDeleteForm} = useDeleteFormMutation();
  const navigation = useNavigate();
  const formsQuery = useSuspenseQuery(getFormsQuery({
    ...initialQueryParamsToGetForms,
    page: page,
    templateId: Number(templateId),
  }))
  const forms = formsQuery.data.data
  const totalPages = Math.ceil(formsQuery.data.meta.total / initialQueryParamsToGetForms.limit);

  const handleDeleteForm = (formId: number) => {
    showToast(
      () => startDeleteForm(formId),
      {
        title: 'Form is being deleted',
        description: 'The form and all its answers will be deleted',
      },
      7000,
    )
  }

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
          includeActions={allowEdition}
          onViewDetails={(formId) => navigation({to: `/forms/${formId}`})}
          onDelete={handleDeleteForm}
        />
      </CardContent>
    </Card>
  );
}
