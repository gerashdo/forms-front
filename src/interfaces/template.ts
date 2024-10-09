import { newTemplateSchema } from '@/constants/templates/template';
import * as z from 'zod';


export type NewTemplateFormValues = z.infer<typeof newTemplateSchema>;

export interface GetAllTagsResponse {
  ok:   boolean;
  data: Tag[];
}

export interface Tag {
  id:   number;
  name: string;
}

export interface GetAllTopicsResponse {
  ok:   boolean;
  data: Topic[];
}

export interface Topic {
  id:   number;
  name: string;
}
