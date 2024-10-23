import { localStorageEffect } from "@/helpers/localStorageState";
import { atom } from "recoil";


export type Theme = 'light' | 'dark' | 'system';

interface UIState {
  theme: Theme;
}

export const UiState = atom<UIState>({
  key: 'uiState',
  default: {
    theme: 'system',
  },
  effects: [localStorageEffect('state_of_ui')],
})
