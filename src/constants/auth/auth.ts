import * as z from "zod";
import { GetUsersParams } from "@/interfaces/auth";
import i18n from "@/i18n";


export const loginSchema = z.object({
  email: z.string().email({ message: i18n.t("constants.loginSchema.email") }),
  password: z.string().min(6, { message: i18n.t("constants.loginSchema.password") }),
})

export const signupSchema = loginSchema.extend({
  name: z.string().min(1, { message: i18n.t("constants.signupSchema.name") }),
  lastName: z.string().min(1, { message: i18n.t("constants.signupSchema.lastName") }),
})

export enum ALLOWED_USER_ORDER_BY_FIELDS {
  createdAt = "createdAt",
  email = "email",
  role = "role",
}

export enum ALLOWED_USER_ORDER_BY {
  ASC = "asc",
  DESC = "desc",
}

export const initialGetUsersParams: GetUsersParams = {
  page: 1,
  limit: 10,
  orderBy: ALLOWED_USER_ORDER_BY_FIELDS.createdAt,
  order: ALLOWED_USER_ORDER_BY.DESC,
}
