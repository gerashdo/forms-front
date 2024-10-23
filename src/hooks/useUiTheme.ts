import { useRecoilState,  } from "recoil";
import { useEffect } from "react";
import { Theme, UiState } from "@/state/ui";


export const useUiTheme = () => {
  const [uiState, setUiState] = useRecoilState(UiState);
  const {theme} = uiState;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setTheme = (theme: Theme) => {
    setUiState((prev) => ({
      ...prev,
      theme,
    }));
  }

  return {
    theme: uiState.theme,
    setTheme,
  }
}
