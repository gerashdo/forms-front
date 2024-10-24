import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTemplate, useUpdateTemplateMutation } from "@/hooks/template/useTemplate";
import { useRecoilValue } from "recoil";
import { AuthState } from "@/state/auth";
import { newTemplateSchema } from "@/constants/templates/template";
import { NewTemplateFormValues, PatchTemplateRequest } from "@/interfaces/template";


type UseNewTemplateFormProps = {
  onSuccess: (id: number) => void;
  isEditing: boolean;
  templateId?: number;
  defaultValues?: NewTemplateFormValues;
}

export const useTemplateForm = ({onSuccess, isEditing, defaultValues, templateId}: UseNewTemplateFormProps) => {
  const authState = useRecoilValue(AuthState);

  const form = useForm<NewTemplateFormValues>({
    resolver: zodResolver(newTemplateSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      tags: [],
      topicId: undefined,
      isPublic: true,
      image: undefined,
    },
  });

  const { startCreateTemplate, isLoading: isLoadingCreation } = useCreateTemplate({ onSuccess });
  const { startUpdateTemplate, isLoading: isLoadingEdition } = useUpdateTemplateMutation({ onSuccess });

  const onSubmit = (values: NewTemplateFormValues) => {
    if (!authState.user) return;
    if (isEditing && templateId) {
      const updatedValues: PatchTemplateRequest = {};
      if (form.getFieldState('title').isDirty) updatedValues.title = values.title;
      if (form.getFieldState('description').isDirty) updatedValues.description = values.description;
      if (form.getFieldState('topicId').isDirty) updatedValues.topicId = values.topicId;
      if (form.getFieldState('tags').isDirty) updatedValues.tags = values.tags;
      if (form.getFieldState('isPublic').isDirty) updatedValues.isPublic = values.isPublic;
      if (form.getFieldState('image').isDirty) updatedValues.image = values.image;
      updateTemplate(updatedValues);
      return;
    }
    createNewTemplate(values);
  };

  const createNewTemplate = (values: NewTemplateFormValues) => {
    if (!authState.user) return;
    startCreateTemplate({...values, userId: authState.user.id});
  }

  const updateTemplate = (values: PatchTemplateRequest) => {
    if (!authState.user || !templateId) return;
    startUpdateTemplate(templateId, values);
  }

  return {
    form,
    onSubmit,
    isLoading: isLoadingCreation || isLoadingEdition,
  };
};
