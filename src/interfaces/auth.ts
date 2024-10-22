import * as z from "zod";
import { ALLOWED_USER_ORDER_BY, ALLOWED_USER_ORDER_BY_FIELDS, loginSchema, signupSchema } from "@/constants/auth/auth";
import { ErrorCode } from "./errorsRequest";

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

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export const LoginCodeMessages: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid request, please check your email or password',
  404: 'User not found',
  500: 'There was an error processing your request. Please check your email or password or try again later',
}

export const SignUpCodeMessages: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid request, please check your data',
  409: 'Email already in use',
  500: 'There was an error processing your request. Please try again later',
}

export const PatchUserCodeMessages: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid request, the data you provided is not valid',
  401: 'Please login again to continue',
  403: 'You are not allowed to perform this action',
  500: 'There was an error processing your request. Please try again later',
}
