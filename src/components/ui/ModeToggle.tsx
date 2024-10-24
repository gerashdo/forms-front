import { useUiSettings } from "@/hooks/useUiSettings";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { Globe, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";


export const ModeToggle = () => {
  const {t} = useTranslation();
  const {setTheme, theme} = useUiSettings();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">
            {t('components.modeToggle.mode')}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t("components.modeToggle.light")} {theme === "light" && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
        {t("components.modeToggle.dark")} {theme === "dark" && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
        {t("components.modeToggle.system")} {theme === "system" && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const LanguageToggle = () => {
  const {t} = useTranslation();
  const {setLanguage, language} = useUiSettings();

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('components.languageToggle.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          {t("components.languageToggle.english")} {language === 'en' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('es')}>
          {t("components.languageToggle.spanish")} {language === 'es' && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
