import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTemplate } from "@/hooks/template/useTemplate";
import { useRecoilValue } from "recoil";
import { AuthState } from "@/state/auth";
import { newTemplateSchema } from "@/constants/templates/template";
import { NewTemplateFormValues, PostNewTemplateRequest } from "@/interfaces/template";


type UseNewTemplateFormProps = {
  onSuccess: (id: number) => void;
  isEditing: boolean;
  defaultValues?: NewTemplateFormValues;
}

export const useTemplateForm = ({onSuccess, isEditing, defaultValues}: UseNewTemplateFormProps) => {
  const authState = useRecoilValue(AuthState);

  const form = useForm<NewTemplateFormValues>({
    resolver: zodResolver(newTemplateSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      tags: [],
      topic: undefined,
      isPublic: true,
      image: undefined,
    },
  });

  const { startCreateTemplate } = useCreateTemplate({ onSuccess });

  const onSubmit = (values: NewTemplateFormValues) => {
    if (!authState.user) return;
    if (isEditing) {
      // handle edit
      return;
    }
    createNewTemplate(values);
  };

  const createNewTemplate = (values: NewTemplateFormValues) => {
    if (!authState.user) return;
    const valuesToSend: PostNewTemplateRequest = {
      userId: authState.user.id,
      title: values.title,
      description: values.description,
      topicId: Number(values.topic),
      tags: values.tags,
      isPublic: values.isPublic,
      image: values.image || null,
    };
    startCreateTemplate(valuesToSend);
  }

  return {
    form,
    onSubmit,
  };
};
