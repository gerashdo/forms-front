import * as z from "zod";


const MAX_ALLOWED_IMAGE_SIZE = 2000000;

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const newTemplateSchema = z.object({
  title: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  tags: z.array(z.number()).min(1, { message: "You must add at least one tag" }),
  isPublic: z.boolean(),
  topicId: z.number().min(1, { message: "You must select a topic" }),
  image: z.instanceof(File).refine(
    (file) => file?.size && file.size < MAX_ALLOWED_IMAGE_SIZE,
    { message: "Image must be less than 2MB" }
  ).refine(
    (file) => file?.type && ALLOWED_IMAGE_TYPES.includes(file.type.toLocaleLowerCase()),
    { message: "File must be an png, jpg or jepg image" }
  ).optional(),
})
