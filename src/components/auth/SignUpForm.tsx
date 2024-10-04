import { useState } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signupSchema } from "@/constants/auth/auth"


type SignupFormValues = z.infer<typeof signupSchema>

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  async function onSignupSubmit(data: SignupFormValues) {
    setIsLoading(true)
    try {
      // Here you would typically call your authentication API
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Signing up with:', data)
    } catch (error) {
      console.error('Signup error:', error)
      // Handle errors (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
        <FormField
          control={signupForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
