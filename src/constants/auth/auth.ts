import * as z from "zod";
import { GetUsersParams } from "@/interfaces/auth";


export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export const signupSchema = loginSchema.extend({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  lastName: z.string().min(3, { message: "Last name must be at least 3 characters" }),
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
