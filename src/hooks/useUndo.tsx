import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";


export const useUndo = () => {
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
          altText="Undo"
          onClick={() => {
            undo = true;
            if (onUndo) onUndo();
          }}
        >Undo</ToastAction>
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
