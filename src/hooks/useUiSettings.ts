import { useEffect } from "react";
import { useRecoilState,  } from "recoil";
import { useTranslation } from "react-i18next";
import { Language, Theme, UiState } from "@/state/ui";
import "../i18n";


export const useUiSettings = () => {
  const {i18n} = useTranslation();
  const [uiState, setUiState] = useRecoilState(UiState);
  const { theme, language } = uiState;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const setTheme = (theme: Theme) => {
    setUiState((prev) => ({
      ...prev,
      theme,
    }));
  };

  const setLanguage = (language: Language) => {
    setUiState((prev) => ({
      ...prev,
      language,
    }));
  };

  return {
    theme,
    setTheme,
    language,
    setLanguage,
  };
};
