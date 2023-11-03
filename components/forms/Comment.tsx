interface Props {
    threadId: string
    currentUserImg: string
    currentUserId: string
}
"use client"

import * as z from "zod"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user'
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { isBase64Image } from "@/lib/utils"
import { updateUser } from "@/lib/actions/user.actions"
import { useUploadThing } from '@/lib/uploadthing'
import { usePathname, useRouter } from "next/navigation"
import { commentValidation } from "@/lib/validations/thread"
import { addCommentToThread, createThread } from "@/lib/actions/thread.action"

const Comment = ({ threadId, currentUserId, currentUserImg }: Props) => {
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: "",
        }
    })


    const onSubmit = async (values: z.infer<typeof commentValidation>) => {

        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
        form.reset()
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="comment-form ">

                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-3 w-full">
                                <FormLabel>
                                    <Image src={currentUserImg} alt='Profile image' width={48} height={48}
                                    className="rounded-full object-cover"
                                    />
                                </FormLabel>
                                <FormControl className="border-none bg-transparent">
                                    <Input className="no-focus text-light-1 outline-none" placeholder="Comment..." type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button className="comment-form_btn" type="submit">Reply</Button>
                </form>
            </Form>
        </div>
    )
}


export default Comment