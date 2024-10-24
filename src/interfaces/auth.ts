import * as z from "zod";
import { ALLOWED_USER_ORDER_BY, ALLOWED_USER_ORDER_BY_FIELDS, loginSchema, signupSchema } from "@/constants/auth/auth";
import { ErrorCode } from "./errorsRequest";
import i18n from "@/i18n";


export type LoginFormValues = z.infer<typeof loginSchema>;

export type SignupFormValues = z.infer<typeof signupSchema>;

export interface SignUpResponse {
  ok:   boolean;
  user: User;
}

export interface User {
  id:       number;
  name:     string;
  lastName: string;
  email:    string;
  role:     UserRoles;
  blocked:  boolean;
}

export interface LoginResponse {
  data: DataLoginResponse;
}

export interface DataLoginResponse {
  user:  User;
  token: string;
}

export interface GetUsersParams {
  page:   number;
  limit:  number;
  orderBy?: ALLOWED_USER_ORDER_BY_FIELDS.createdAt;
  order?:   ALLOWED_USER_ORDER_BY.DESC;
}

export interface GetUsersResponse {
  ok:   boolean;
  data: User[];
  meta: GetUsersResponseMeta;
}

export interface GetUsersResponseMeta {
  total:           number;
  page:            number;
  elementsPerPage: number;
  totalPages:      number;
}

export type PatchUserRequestBody = Omit<Partial<User>, 'id'>;

export interface PatchUserResponse {
  ok:   boolean;
  data: User;
}

export interface GetUserByIdResponse {
  ok:   boolean;
  data: User;
}

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export const LoginCodeMessages: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.loginCodeMessages.400"),
  404: i18n.t("errors.loginCodeMessages.404"),
  500: i18n.t("errors.loginCodeMessages.500"),
}

export const SignUpCodeMessages: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.signupCodeMessages.400"),
  409: i18n.t("errors.signupCodeMessages.409"),
  500: i18n.t("errors.signupCodeMessages.500"),
}

export const PatchUserCodeMessages: Partial<Record<ErrorCode, string>> = {
  400: i18n.t("errors.patchUserCodeMessages.400"),
  401: i18n.t("errors.patchUserCodeMessages.401"),
  403: i18n.t("errors.generalErrors.403"),
  500: i18n.t("errors.patchUserCodeMessages.500"),
}
