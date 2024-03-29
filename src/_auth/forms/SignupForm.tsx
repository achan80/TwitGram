import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"






const SignupForm = () => {
  const { toast } = useToast() //we need to declare it as a hook up top

  //get an object out of it
  //mutateAsync is the CreateUserAccount
  //connecting through mutateAsync via api.ts
  //we can rename it to make it clearer
  const { mutateAsync: createUserAccount, isLoading: isCreatingUser} = useCreateUserAccount() //as a hook

  //we can repeat this with the other hook
  const { mutateAsync: signInAccount, isLoading: isSigningIn} = useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // Create the user
    const newUser = await createUserAccount(values);
    //Appwrite will help us with auth
    console.log(newUser)
    //what to do after the user is created
    if(!newUser) {
      return toast( {
        title: "Sign up failed. Please try again.",
      })//if there is no new user - simply return
      //with toast message
    }
    //build a small toast - small popup
    //provides feedback on what's happening

    //if successful - sign into session
    const session = await signInAccount({
      email: values.email, //what or where is values
      password: values.password, //all of this is coming from our from
    })

    if(!session) {
      return toast({
        title: 'Sign in failed. Please try again.'
      })
    }//After we have the session - we need to store session in our react context
    //At all times we need to know we have a logged in user - in context folder

    //Authentication and creating user accounts is one of the most complicated parts of every application
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, please enter your details</p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
       
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
       
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
       
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
       
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ?(
              <div className="flex-center gap-2">
                <Loader />Loading...
              </div>
            ) : "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm