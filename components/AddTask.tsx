"use client"
import Image from 'next/image'
import React, {  } from 'react'
import { Button } from './ui/button'
import plus from '@/public/Images/Add_round_duotone.svg'
import { useOpenSidebar } from './use-open-sidebar'
import { useRouter } from 'next/navigation'
type Props = {}

const AddTask = (props: Props) => {
    const { onOpen } = useOpenSidebar()
    const router = useRouter()
   
    const handleOpenSidebar = () => {
        router.push(`/`)
        onOpen()  
    }
  return (
    <section className='flex justify-center mx-auto mt-3'>
        <div className="w-[500px] p-4 bg-[#F5E8D5] rounded-xl flex items-center gap-3 float-left cursor-pointer" onClick={handleOpenSidebar}>
                <div className='bg-[#E9A23B] w-14 h-14 rounded-lg flex justify-center items-center '>
                        <Image src={plus} alt="add" />
                </div>
                <Button asChild  variant={"outline"}>
                        <h1 className='text-xl font-semibold bg-transparent outline-none border-none hover:bg-transparent'>Add new task</h1>
                </Button>
        </div>
    </section>
  )
}

export default AddTask