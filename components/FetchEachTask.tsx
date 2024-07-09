"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import nexticon from '@/public/next.svg'
import { Button } from './ui/button'
import { useOpenSidebar } from './use-open-sidebar'
import wrongIcon from '@/public/Images/close_ring_duotone.svg'
import rightIcon from '@/public/Images/Done_round_duotone.svg'
import workInprogress from '@/public/Images/Time_atack_duotone.svg'
import { TaskProps } from './FetchTasks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getIconInfo, getStatusInfo } from '@/lib/constants'

type Props = {
    task: TaskProps;
}

const FetchEachTask = ({ task }: Props) => {
    const { id, title, desc, icon, status } = task
    // const router = useRouter()
    const { onOpen } = useOpenSidebar()




    return (
        <div>
            <Link href={`/${id}`}>
                <div className={`w-[500px] p-4 ${status === 'WONT_DO' ? 'bg-[#F7D4D3]' : ""} ${status === 'COMPLETED' ? 'bg-[#A0ECB1]' : ""} ${status === 'IN_PROGRESS' ? 'bg-[#F5D565]' : ""}  ${status === 'TODO' ? 'bg-[#E3E8EF]' : ""}  rounded-2xl flex items-center gap-3 float-left cursor-pointer justify-between`} onClick={() => onOpen()}>
                    <div className="flex items-center gap-3">
                        <div className='bg-[#F8FAFC] w-14 h-14 rounded-lg flex justify-center items-center '>
                            <Image src={getIconInfo(icon).src} alt="add" width={20} height={20} />
                        </div>
                        <Button asChild variant={"outline"}>
                            <h1 className='text-xl font-semibold bg-transparent outline-none border-none hover:bg-transparent'>{getStatusInfo(status).label}</h1>
                        </Button>
                    </div>

                    {status !== 'TODO' && <div className={`size-12 ${status === 'WONT_DO' ? 'bg-red-500' : ""} ${status === 'COMPLETED' ? 'bg-green-500' : ""} ${status === 'IN_PROGRESS' ? 'bg-[#E9A23B]' : ""} p-2 rounded-2xl `}>
                        <Image src={getStatusInfo(status).src} alt="task" width={40} height={40} />
                    </div>}
                </div>
            </Link>
        </div>
    )
}

export default FetchEachTask