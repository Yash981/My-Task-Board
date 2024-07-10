"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import Image from 'next/image'
import teaIcon from '@/public/Images/tea1.png'
import laptopIcon from '@/public/Images/laptop.png'
import messageIcon from '@/public/Images/message.png'
import gymIcon from '@/public/Images/gym.png'
import bookIcon from '@/public/Images/book.png'
import clockIcon from '@/public/Images/clock.png'
import wrongIcon from '@/public/Images/close_ring_duotone.svg'
import rightIcon from '@/public/Images/Done_round_duotone.svg'
import workInprogress from '@/public/Images/Time_atack_duotone.svg'
import { Button } from './ui/button'
import { Check, Loader2, Trash, X } from 'lucide-react'
import { useOpenSidebar } from './use-open-sidebar'
import { useGetTask } from './api/use-get-task'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEditTask } from './api/use-edit-task'
import { useDeleteTask } from './api/use-delete-task'
import { useCreateTask } from './api/use-create-task'

type Props = {}

const icons = [
    { value: 'COFFEE_CUP', src: teaIcon, label: 'Tea' },
    { value: 'OFFICE_WORK', src: laptopIcon, label: 'Working on Laptop' },
    { value: 'MESSAGE', src: messageIcon, label: 'Message' },
    { value: 'WEIGHT_LIFT', src: gymIcon, label: 'Gym' },
    { value: 'BOOK', src: bookIcon, label: 'Book' },
    { value: 'ALARM_CLOCK', src: clockIcon, label: 'Clock' },
];

const status = [
    { value: 'IN_PROGRESS', src: workInprogress, label: 'Task In Progress' },
    { value: 'COMPLETED', src: rightIcon, label: 'Task Completed' },
    { value: "WONT_DO", src: wrongIcon, label: "Task Won't do" },
]
export const formSchema = z.object({
    title: z.string().min(1, { message: 'Task name is required' }),
    desc: z.string().optional(),
    icon: z.enum(["COFFEE_CUP", "OFFICE_WORK", "MESSAGE", "WEIGHT_LIFT", "BOOK", "ALARM_CLOCK"]),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "WONT_DO", "TODO"]).optional(),
});

export type FormValues = z.infer<typeof formSchema>;


const TaskDetails = (props: Props) => {
    const { onClose } = useOpenSidebar();
    const params = useParams()
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)
    // console.log(params)
    const GetTask = useGetTask(params?.id as string);

    const SpecificTask = GetTask.data

    const isLoading = GetTask.isLoading

    const editTask = useEditTask(params?.id as string);

    const deleteTask = useDeleteTask(params?.id as string);

    const createTask = useCreateTask();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            desc: '',
            icon: "COFFEE_CUP",
            status: "TODO",
        },
    })
    
    const { setValue, reset } = form

    useEffect(() => {
        if (SpecificTask) {
            reset({
                title: SpecificTask.title,
                desc: SpecificTask.desc ?? '',
                icon: SpecificTask.icon,
                status: SpecificTask.status,
            });
        }
    }, [SpecificTask, reset]);
    const handleIconSelect = (value: "COFFEE_CUP" | "OFFICE_WORK" | "MESSAGE" | "WEIGHT_LIFT" | "BOOK" | "ALARM_CLOCK") => {
        setValue('icon', value);
    };
    const handleStatusSelect = (value: "IN_PROGRESS" | "COMPLETED" | "WONT_DO") => {
        setValue('status', value);
    };

    const isPending = editTask.isPending || deleteTask.isPending || createTask.isPending
    const onSubmit = (formData: FormValues) => {
        // console.log(formData,params?.id)
        const mappedData = {
            title: formData.title,
            desc: formData.desc ?? '',
            icon: formData.icon as "COFFEE_CUP" | "OFFICE_WORK" | "MESSAGE" | "WEIGHT_LIFT" | "BOOK" | "ALARM_CLOCK",
            status: formData.status as "IN_PROGRESS" | "COMPLETED" | "WONT_DO",
        };
        if (params?.id) {
            editTask.mutate(mappedData, {
                onSuccess: () => {
                    onClose()
                    router.push(`/`)
                }
            })
        } else{
            createTask.mutate(mappedData, {
                onSuccess: () => {
                    onClose();
                    router.push(`/`)
                }
            })
        }
    }
    const handleDelete = () => {
        if(!params?.id) {
            onClose();
            router.push(`/`)
            return
        }
        deleteTask.mutate(undefined, {
            onSuccess: () => {
                onClose();
                router.push(`/`)
            }

        })
    }

    return (
        <>
            {isLoading ? (<div className="absolute inset-0 flex items-center justify-center ">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
            ) : (
                <section >
                    <h1 className='text-xl font-medium'>Task Details</h1>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 pt-4">
                                <FormField
                                    name="title"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Task name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Enter a Task Name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="desc"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter a Short Description"
                                                    className="resize-none"
                                                    {...field}
                                                    disabled={isPending}
                                                    rows={8}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="icon"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon</FormLabel>
                                            <FormControl>
                                                <div className="flex space-x-4">
                                                    {icons.map((icon) => (
                                                        <div
                                                            key={icon.value}
                                                            className={`cursor-pointer  p-0.5 rounded-xl ${field.value === icon.value ? 'border-2 border-[#3662E3]' : ''}`}
                                                            onClick={() => handleIconSelect(icon.value as "COFFEE_CUP" | "OFFICE_WORK" | "MESSAGE" | "WEIGHT_LIFT" | "BOOK" | "ALARM_CLOCK")}
                                                        >
                                                            <Image src={icon.src} alt={icon.label} className={`w-10 h-10 rounded-lg inline-block bg-gray-200   p-2 
                                                    
                                                    `}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="status"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <div className="flex  flex-wrap gap-2">
                                                    {status.map((icon) => (
                                                        <div
                                                            key={icon.value}
                                                            className={`cursor-pointer  p-0.5 w-[49%] rounded-xl flex items-center pr-20  ${field.value === icon.value ? 'border-2 border-[#3662E3]' : 'border-2 border-gray-400'}`}
                                                            onClick={() => {
                                                                const validStatus = ["IN_PROGRESS", "COMPLETED", "WONT_DO"];
                                                                if (validStatus.includes(icon.value)) {
                                                                    handleStatusSelect(icon.value as "IN_PROGRESS" | "COMPLETED" | "WONT_DO");
                                                                }
                                                            }}
                                                        >
                                                            <Image src={icon.src} alt={icon.label} className={`w-10 h-10 rounded-lg inline-block ${icon.value === 'WONT_DO' ? 'bg-red-500' : ""}
                                                    ${icon.value === 'COMPLETED' ? 'bg-green-500' : ""}
                                                    ${icon.value === 'IN_PROGRESS' ? 'bg-yellow-500' : ""}
                                                       p-2 
                                                    `} />
                                                            <h2 className='ml-2'>{icon.label}</h2>
                                                        </div>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end space-x-4 my-auto ">
                                    <Button variant={"secondary"} type='button' onClick={handleDelete} disabled={isPending}>
                                        {deleteTask.isPending ? "Deleting..." : params?.id ? "Delete" : "Cancel"}
                                        {!params?.id ? <X className="ml-2 size-4" /> : <Trash className="ml-2 size-4" />}

                                    </Button>
                                    <Button variant={"primary"} disabled={isPending}>
                                        {editTask.isPending ? "Saving..." :  params?.id ?    "Save" : "Create"}
                                        <Check className="ml-2 size-4" />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </section>
            )}
        </>
    )
}

export default TaskDetails