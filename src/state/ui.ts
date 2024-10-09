import { atom } from "recoil";


interface UIState {
  isCreateTemplateDialogOpen: boolean;
}

export const uiState = atom<UIState>({
  key: 'uiState',
  default: {
    isCreateTemplateDialogOpen: false,
  }
})
