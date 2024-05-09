import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutation"
import Loader from "../shared/Loader"

type PostFormProps = { //define the prop type
    post?:Models.Document;    //post? -> means post might or might not be there.  Models is from appwrite
    action: 'Create' | 'Update';
}

const PostForm = ({post, action}: PostFormProps) => { //gave prop (posts) a type
    
    const { mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate} = useUpdatePost();
    const {user} = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post? post?.caption : '',
            file: [],
            location: post? post?.location : '',
            tags: post? post.tags.join(',') : ''
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {

        if(post && action === 'Update'){ //if its a post update this if loop will execute
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl,
            })
            if(!updatedPost){
                toast({title: 'Please try again.'})
            }

            return navigate(`/posts/${post.$id}`)
        }


        const newPost = await createPost({ //if its not update it will create new post
            ...values,
            userId: user.id,
        })

        if(!newPost){
            toast({
                title: 'Please try again.'
            })
        }

        navigate('/');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                               <FileUploader
                               fieldChange={field.onChange}
                               mediaUrl={post?.imageUrl}
                               />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                               <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Tags (seperated by comma " , ")</FormLabel>
                            <FormControl>
                               <Input type="text" className="shad-input" {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                <Button type="button" className=" hover:scale-110 transition hover:bg-dark-4 hover:text-white">Cancel</Button>
                <Button className="bg-dark-4 hover:bg-white hover:text-black transition text-white" type="submit" 
                disabled={isLoadingCreate || isLoadingUpdate}>
                    {(isLoadingCreate || isLoadingUpdate)?<Loader/>: `${action}`}
                </Button>
                </div>
            </form>
        </Form>
    )
}

export default PostForm