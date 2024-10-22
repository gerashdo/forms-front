import { User, UserRoles } from "@/interfaces/auth";
import { AuthState, AuthStateType } from "@/state/auth";
import { snapshot_UNSTABLE } from "recoil";


export const isUserAdmin = (user?: User) => {
  return user?.role === UserRoles.ADMIN;
}

export const isAuthenticated = (authState: AuthStateType) => {
  return !!authState.user;
}

export const getAuthStateSnapshot = () => {
  const snapshot = snapshot_UNSTABLE();
  return snapshot.getLoadable(AuthState).getValue();
}
