import { localStorageEffect } from "@/helpers/localStorageState";
import { User } from "@/interfaces/auth";
import { atom } from "recoil";

export type AuthStateType = {
  user: User | null;
  token: string | null;
}

export const AuthState = atom<AuthStateType>({
  key: 'authState',
  default: {
    user: null,
    token: null,
  },
  effects: [localStorageEffect('authState')],
})
