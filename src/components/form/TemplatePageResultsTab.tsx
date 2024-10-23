import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDataTable } from "@/components/form/FormDataTable";
import { useDeleteFormMutation } from "@/hooks/form/useFormMutations";
import { useUndo } from "@/hooks/useUndo";
import { getFormsQuery } from "@/queries/form";
import { initialQueryParamsToGetForms } from "@/constants/form/form";
import { useTranslation } from "react-i18next";


interface TemplatePageResultsTabProps {
  templateId: string;
  allowEdition?: boolean;
}

export const TemplatePageResultsTab = ({templateId, allowEdition}: TemplatePageResultsTabProps) => {
  const {t} = useTranslation();
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
        title: t("components.templatePageResultsTab.deleteToast.title"),
        description: t("components.templatePageResultsTab.deleteToast.description"),
      },
      7000,
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("components.templatePageResultsTab.title")}
        </CardTitle>
        <CardDescription>
          {t("components.templatePageResultsTab.description")}
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
