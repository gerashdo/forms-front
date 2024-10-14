import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTemplate } from "@/hooks/template/useTemplate";
import { useRecoilValue } from "recoil";
import { AuthState } from "@/state/auth";
import { newTemplateSchema } from "@/constants/templates/template";
import { NewTemplateFormValues, PostNewTemplateRequest } from "@/interfaces/template";


type UseNewTemplateFormProps = {
  onSuccess: (id: number) => void;
  defaultValues?: NewTemplateFormValues;
}

export const useNewTemplateForm = ({onSuccess, defaultValues}: UseNewTemplateFormProps) => {
  const authState = useRecoilValue(AuthState);

  const form = useForm<NewTemplateFormValues>({
    resolver: zodResolver(newTemplateSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      tags: [],
      topic: '',
      isPublic: true,
      image: undefined,
    },
  });

  const { startCreateTemplate } = useCreateTemplate({ onSuccess });

  const onSubmit = (values: NewTemplateFormValues) => {
    if (!authState.user) return;
    const valuesToSend: PostNewTemplateRequest = {
      userId: authState.user.id,
      title: values.title,
      description: values.description,
      topicId: parseInt(values.topic),
      tags: values.tags,
      isPublic: values.isPublic,
      image: values.image || null,
    };
    startCreateTemplate(valuesToSend);
  };

  return {
    form,
    onSubmit,
  };
};
