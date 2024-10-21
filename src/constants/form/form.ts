import { ALLOWED_FORM_ORDER_BY, ALLOWED_FORM_ORDER_BY_FIELDS, GetFormsQueryParams } from "@/interfaces/form";


export const initialQueryParamsToGetForms: GetFormsQueryParams = {
  page: 1,
  limit: 10,
  order: ALLOWED_FORM_ORDER_BY.DESC,
  orderBy: ALLOWED_FORM_ORDER_BY_FIELDS.submissionDate,
} as const;
