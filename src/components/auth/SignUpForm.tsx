import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSingUp } from "@/hooks/auth";
import { signupSchema } from "@/constants/auth/auth";
import { SignupFormValues } from "@/interfaces/auth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


interface SignUpFormProps {
  onSuccess?: () => void
}

const SignUpForm = ({onSuccess}: SignUpFormProps) => {
  const {t} = useTranslation();
  const {signUpUser, success, isLoading} = useSingUp();

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (success) {
      onSuccess?.();
    }
  }, [success]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSignupSubmit = (data: SignupFormValues) => {
    signUpUser(data);
  }

  return (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
        <FormField
          control={signupForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.signupForm.name")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.signupForm.lastName")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.signupForm.email")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.signupForm.password")}
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
            t("components.signupForm.signing") :
            t("components.signupForm.signup")
          }
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm;
