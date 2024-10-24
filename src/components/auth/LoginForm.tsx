import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth";
import { loginSchema } from "@/constants/auth/auth";
import { LoginFormValues } from "@/interfaces/auth";
import { useTranslation } from "react-i18next";


interface LoginFormProps {
  onSuccess?: () => void
}

const LoginForm = ({onSuccess}: LoginFormProps) => {
  const {t} = useTranslation();
  const {loginUser, isLoading, success} = useLogin()
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (success && onSuccess) {
      onSuccess();
    }
  }, [success]) // eslint-disable-line

  useEffect(() => {
    if (success) loginForm.reset();
  }, [success]) // eslint-disable-line

  async function onLoginSubmit(data: LoginFormValues) {
    loginUser(data);
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.loginForm.email")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.loginForm.password")}
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ?
            t("components.loginForm.logining") :
            t("components.loginForm.login")
          }
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm