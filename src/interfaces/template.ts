import { newTemplateSchema } from '@/constants/templates/template';
import * as z from 'zod';


export type NewTemplateFormValues = z.infer<typeof newTemplateSchema>;

export interface PostNewTemplateResponse {
  ok:   boolean;
  data: Template;
}

export interface Template {
  id:          number;
  title:       string;
  description: string;
  image:       null;
  isPublic:    boolean;
  createdAt:   Date;
  User:        User;
  Topic:       Topic;
  Tags:        Tag[];
}

export interface GetTemplateResponse {
  ok:   boolean;
  data: Template;
}

export interface Topic {
  id:   number;
  name: string;
}

export interface User {
  id:       number;
  name:     string;
  lastName: string;
  email:    string;
}


export interface Topic {
  id:   number;
  name: string;
}

export interface User {
  id:       number;
  name:     string;
  lastName: string;
  email:    string;
}

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
