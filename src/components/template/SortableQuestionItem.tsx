import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { questionTypeLabels } from "@/constants/templates/question";
import { GripHorizontal, PencilIcon, X } from "lucide-react";
import { Question } from "@/interfaces/question";


interface SortableQuestionItemProps {
  question: Question;
  onRemove: () => void;
  onEdit: () => void;
  allowEdition?: boolean;
}

export const SortableQuestionItem = ({ question, onRemove, onEdit, allowEdition }: SortableQuestionItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes}>
      {allowEdition && (
        <CardHeader className="flex flex-row items-center justify-between px-5 pt-3 pb-0">
          <div {...listeners}>
            <GripHorizontal className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1">
            <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      )}
      <CardContent className="grid grid-cols-3 space-y-2 p-5 pt-5">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Title:</h3>
          <p className="text-sm text-muted-foreground">{question.title}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Type:</h3>
          <p className="text-sm text-muted-foreground">{questionTypeLabels[question.type]}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Is Visible:</h3>
          <p className="text-sm text-muted-foreground">{question.visible ? "Yes" : "No"}</p>
        </div>
        <div className="space-y-1 col-span-2">
          <h3 className="text-sm font-medium">Description:</h3>
          <p className="text-sm text-muted-foreground">{question.description || "No description provided"}</p>
        </div>
      </CardContent>
    </Card>
  );
};
