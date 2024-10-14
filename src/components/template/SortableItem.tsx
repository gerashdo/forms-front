import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { questionTypeLabels } from "@/constants/templates/question";
import { GripHorizontal, X } from "lucide-react";
import { Question } from "@/interfaces/question";


// Change question tytpe to question
interface SortableItemProps {
  question: Question;
  onRemove: () => void;
}

export const SortableItem = ({ question, onRemove }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="p-4 border rounded-md">
      <div className="flex items-center justify-between mb-2">
        <div {...listeners}>
          <GripHorizontal className="h-5 w-5" />
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <div>
          <span>
            <strong>Title:</strong> {question.title}
          </span>
        </div>
        <div>
          <strong>Description:</strong> {question.description || "N/A"}
        </div>
        <div className="flex gap-4">
          <span>
            <strong>Type:</strong> {questionTypeLabels[question.type]}
          </span>
          <span>
            <strong>Visible:</strong> {question.visible ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
};
