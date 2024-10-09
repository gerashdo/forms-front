import { newTemplateSchema } from '@/constants/templates/template';
import * as z from 'zod';


export type NewTemplateFormValues = z.infer<typeof newTemplateSchema>;
