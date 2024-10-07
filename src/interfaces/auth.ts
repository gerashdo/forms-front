import * as z from "zod";
import { loginSchema, signupSchema } from "@/constants/auth/auth";
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
}

export interface LoginResponse {
  data: DataLoginResponse;
}

export interface DataLoginResponse {
  user:  User;
  token: string;
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
