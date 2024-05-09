import * as z from "zod"

export const SignupValidation = z.object({
  name: z.string().min(3, { message: 'Name should be atleast 3 characters.' }),
  username: z.string().min(3, { message: 'Username should be atleast 3 characters.' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be atleast 8 characters.' })
})


export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(5, { message: 'Password must be atleast 8 characters.' })
})


export const PostValidation = z.object({
  caption: z.string().min(1).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(1).max(100),
  tags: z.string()
})

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  username: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email(),
  bio: z.string(),
});
