import * as z from "zod";
import i18n from "@/i18n";


const MAX_ALLOWED_IMAGE_SIZE = 2000000;

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const newTemplateSchema = z.object({
  title: z.string().min(1, { message: i18n.t("constants.newTemplateSchema.title") }),
  description: z.string().min(1, { message: i18n.t("constants.newTemplateSchema.description") }),
  tags: z.array(z.number()).min(1, { message: i18n.t("constants.newTemplateSchema.tags") }),
  isPublic: z.boolean(),
  topicId: z.number().min(1, { message: i18n.t("constants.newTemplateSchema.topic") }),
  image: z.instanceof(File).refine(
    (file) => file?.size && file.size < MAX_ALLOWED_IMAGE_SIZE,
    { message: i18n.t("constants.newTemplateSchema.imageSize") }
  ).refine(
    (file) => file?.type && ALLOWED_IMAGE_TYPES.includes(file.type.toLocaleLowerCase()),
    { message: i18n.t("constants.newTemplateSchema.imageType") }
  ).optional(),
})

export enum ALLOWED_TEMPLATE_ORDER_BY_FIELDS {
  createdAt = "createdAt",
}

export enum ALLOWED_TEMPLATE_ORDER_BY {
  ASC = "asc",
  DESC = "desc",
}

export const initialQueryParamsToGetTemplates = {
  page: 1,
  limit: 10,
  order: ALLOWED_TEMPLATE_ORDER_BY.DESC,
  orderBy: ALLOWED_TEMPLATE_ORDER_BY_FIELDS.createdAt,
} as const;
