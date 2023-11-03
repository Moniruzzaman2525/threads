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
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user'
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { isBase64Image } from "@/lib/utils"
import { updateUser } from "@/lib/actions/user.actions"
import { useUploadThing } from '@/lib/uploadthing'
import { usePathname, useRouter } from "next/navigation"
import { ThreadValidation } from "@/lib/validations/thread"
import { createThread } from "@/lib/actions/thread.action"
import { useOrganization } from "@clerk/nextjs"

interface Props {
    user: {
        id: string,
        object: string,
        username: string,
        name: string,
        bio: string,
        image: string
    }
    btnTitle: string
}



function PostThread({ userId }: { userId: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const { organization } = useOrganization()

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: "",
            accountId: userId
        }
    })


    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread, author: userId, communityId: organization ? organization.id : null , path: pathname
        })
        router.push('/')
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex mt-10 flex-col justify-start gap-10">

                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel className="text-base-semibold text-light-2">
                                    Content
                                </FormLabel>
                                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                    <Textarea rows={15} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="bg-primary-500" type="submit">Post Thread</Button>
                </form>
            </Form>
        </>
    )
}

export default PostThread