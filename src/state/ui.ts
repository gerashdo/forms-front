import { localStorageEffect } from "@/helpers/localStorageState";
import { atom } from "recoil";


export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es';

interface UIState {
  theme: Theme;
  language: Language;
}

export const UiState = atom<UIState>({
  key: 'uiState',
  default: {
    theme: 'system',
    language: 'en',
  },
  effects: [localStorageEffect('state_of_ui')],
})
