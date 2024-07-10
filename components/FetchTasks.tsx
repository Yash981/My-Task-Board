"use client"
import React from 'react'
import FetchEachTask from './FetchEachTask'
import { useGetTasks } from './api/use-get-tasks'
import { Skeleton } from './ui/skeleton'

type Props = {}

export interface TaskProps{
    id: string;
    title: string;
    desc: string | null;
    icon: string;
    status: string;
    userId:string;
    createdAt: string;
}[]

const FetchTasks = (props: Props) => {
    const TaskQuery = useGetTasks();
    const TasksData = TaskQuery.data;
    const length = TasksData?.tasks.length ?? 5
    return (
        <section className='flex justify-center mx-auto flex-col gap-3 '>
            {
                TaskQuery.isLoading &&
                 <>
                    { Array.from({ length }, (_, i) => ( 
                        <div className="w-[500px] rounded-xl flex items-center gap-3 float-left cursor-pointer" key={i}>
                        <Skeleton className='w-full h-20' />
                    </div>
                    ))
                    }
                </>
            }
            {TasksData && TasksData.tasks.map((task: TaskProps) => (
                <FetchEachTask key={task.id} task={task} />
            ))}
        </section>
    )
}

export default FetchTasks