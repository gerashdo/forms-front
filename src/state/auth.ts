import { localStorageEffect } from "@/helpers/localStorageState";
import { User } from "@/interfaces/auth";
import { atom } from "recoil";

type AuthState = {
  user: User | null;
  token: string | null;
}

export const AuthState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
    token: null,
  },
  effects: [localStorageEffect('authState')],
})
