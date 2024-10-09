import * as z from "zod";


export const newTemplateSchema = z.object({
  title: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  tags: z.array(z.number()).min(1, { message: "You must add at least one tag" }),
  isPublic: z.boolean(),
  topic: z.string().min(1, { message: "You must select a topic" }),
})
