import { useTranslation } from "react-i18next";
import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";


export const useUndo = () => {
  const {t} = useTranslation();
  const { toast } = useToast();

  const showToast = (
    action: () => void,
    messge: {title: string, description: string},
    undoDuration: number = 5000,
    onUndo?: () => void,
  ) => {
    let undo = false;
    toast({
      title: messge.title,
      description: messge.description,
      action: (
        <ToastAction
          altText={t("hooks.useUndo.undo")}
          onClick={() => {
            undo = true;
            if (onUndo) onUndo();
          }}
        >{t("hooks.useUndo.undo")}</ToastAction>
      ),
      duration: undoDuration,
    });

    setTimeout(() => {
      if (!undo) action();
    }, undoDuration);
  }

  return {
    showToast,
  }
}
