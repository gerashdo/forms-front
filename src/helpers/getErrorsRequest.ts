import { PatchAnswerCodeMessage } from "@/interfaces/answer";
import { LoginCodeMessages, PatchUserCodeMessages, SignUpCodeMessages } from "@/interfaces/auth";
import { ErrorCode } from "@/interfaces/errorsRequest";
import { PostFormCodeMessage } from "@/interfaces/form";
import { CreateNewQuestionCodeMessage, DeleteQuestionFromTemplateCodeMessage, ReorderQuestionsCodeMessage, UpdateQuestionsCodeMessage } from "@/interfaces/question";
import { CreateNewTemplateCodeMessage } from "@/interfaces/template";


export const getLoginError = (errorCode: number | string): string => {
  return LoginCodeMessages[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getSignUpError = (errorCode: number | string): string => {
  return SignUpCodeMessages[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getPostNewTemplateError = (errorCode: number | string): string => {
  return CreateNewTemplateCodeMessage[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getPostNewQuestionError = (errorCode: number | string): string => {
  return CreateNewQuestionCodeMessage[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getDeleteQuestionError = (errorCode: number | string): string => {
  return DeleteQuestionFromTemplateCodeMessage[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getReorderQuestionsError = (errorCode: number | string): string => {
  return ReorderQuestionsCodeMessage[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getUpdateQuestionError = (errorCode: number | string): string => {
  return UpdateQuestionsCodeMessage[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getPostFormError = (errorCode: number | string): string => {
  return PostFormCodeMessage[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getPatchAnswerError = (errorCode: number | string): string => {
  return PatchAnswerCodeMessage[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getPatchUserError = (errorCode: number | string): string => {
  return PatchUserCodeMessages[errorCode as ErrorCode] || 'An error occurred, please try again later';
}
