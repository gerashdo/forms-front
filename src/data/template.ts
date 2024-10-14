import { Template } from "@/interfaces/template";
import { user1 } from "./user";
import { topic1 } from "./topic";

export const template1: Template = {
  id: 1,
  title: 'First template',
  description: 'This is template 1',
  image: null,
  isPublic: true,
  createdAt: new Date(),
  User: user1,
  Topic: topic1,
  Tags: [],
};
