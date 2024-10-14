import { User, UserRoles } from "@/interfaces/auth";

export const user1: User = {
  id: 1,
  name: "John",
  lastName: "Doe",
  email: "john@gmail.com",
  role: UserRoles.ADMIN,
}

export const user2: User = {
  id: 2,
  name: "Lana",
  lastName: "Lane",
  email: "lana@gmai.com",
  role: UserRoles.USER,
}
