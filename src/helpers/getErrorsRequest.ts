import { PatchAnswerCodeMessage } from "@/interfaces/answer";
import { LoginCodeMessages, PatchUserCodeMessages, SignUpCodeMessages } from "@/interfaces/auth";
import { ErrorCode } from "@/interfaces/errorsRequest";
import { DeleteFormCodeMessage, PostFormCodeMessage } from "@/interfaces/form";
import { CreateNewQuestionCodeMessage, DeleteQuestionFromTemplateCodeMessage, ReorderQuestionsCodeMessage, UpdateQuestionsCodeMessage } from "@/interfaces/question";
import { CreateNewTemplateCodeMessage, DeleteTemplateErrorCodeMessage } from "@/interfaces/template";
import i18n from "@/i18n";


export const getLoginError = (errorCode: number | string): string => {
  return LoginCodeMessages[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getSignUpError = (errorCode: number | string): string => {
  return SignUpCodeMessages[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getPostNewTemplateError = (errorCode: number | string): string => {
  return CreateNewTemplateCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getDeleteTemplateError = (errorCode: number | string): string => {
  return DeleteTemplateErrorCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getPostNewQuestionError = (errorCode: number | string): string => {
  return CreateNewQuestionCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getDeleteQuestionError = (errorCode: number | string): string => {
  return DeleteQuestionFromTemplateCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getReorderQuestionsError = (errorCode: number | string): string => {
  return ReorderQuestionsCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getUpdateQuestionError = (errorCode: number | string): string => {
  return UpdateQuestionsCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getPostFormError = (errorCode: number | string): string => {
  return PostFormCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getDeleteFormError = (errorCode: number | string): string => {
  return DeleteFormCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getPatchAnswerError = (errorCode: number | string): string => {
  return PatchAnswerCodeMessage[errorCode as ErrorCode] || i18n.t('errors.general');
}

export const getPatchUserError = (errorCode: number | string): string => {
  return PatchUserCodeMessages[errorCode as ErrorCode] || i18n.t('errors.general');
}
