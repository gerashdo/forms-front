import { LoginCodeMessages, SignUpCodeMessages } from "@/interfaces/auth";
import { ErrorCode } from "@/interfaces/errorsRequest";
import { CreateNewQuestionCodeMessage } from "@/interfaces/question";
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
