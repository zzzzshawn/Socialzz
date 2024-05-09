import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutation"
import { useUserContext } from "@/context/AuthContext"





 
const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();

  const {mutateAsync: signInAccount} = useSignInAccount(); // to create a session

  // 1. Define your form. // boiler code for zod
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: "",
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    //create user
    const newUser = await createUserAccount(values);
    if(!newUser){
      return  toast({
        title: "Sign-Up failed, try again"
      })
    }
    

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({title: 'Sign-In failed, try again'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      
      navigate('/')
    }else{
      toast({title: 'Sign-up failed. Try again'})
    }

  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col max-sm:w-[300px] max-sm:p-5">
        <img src="/assets/images/logo.svg" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account.</h2>
        <p className="text-slate-400 small-medium md:base-regular mt-2">To use Socialzz enter your account details</p>



        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' className="shad-input" {...field} />
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
                  <Input type='text' className="shad-input" {...field} />
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
                  <Input type='email' className="shad-input" {...field} />
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
                  <Input type='password' className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-white text-black font-bold mt-2 hover:bg-gray-300 ">
            {isCreatingAccount? (
              <div className="flex-center gap-2">
                <Loader/>Loading...
              </div>
            ): "Create Account"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link to='/sign-in' className="text-white body-bold underline text-small-semibold ml-1" >Log in</Link>

          </p>

        </form>
      </div>
    </Form>
  )
}


export default SignupForm