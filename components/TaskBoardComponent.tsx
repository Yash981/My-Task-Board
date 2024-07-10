"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import logo from '../public/Images/Logo.svg'
import { Input } from './ui/input'
import Edit from '../public/Images/Edit_duotone.svg'
import { LogOutIcon } from 'lucide-react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
type Props = {}

const TaskBoardComponent = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const HandleEdit = () => {
        if (inputRef.current) {
            const length = inputRef.current.value.length
            inputRef.current.setSelectionRange(length, length)
            inputRef.current.focus()
        }
    }
    const handleSignout = () =>{
        signOut()
        redirect('/sign-in')
    }
    return (
        <>
            <section className='mx-auto mt-10'>
                <div className='min-w-fit flex justify-center flex-col'>
                    <div className='p-2 flex gap-2 justify-center'>
                        <Image src={logo} alt="logo" />
                        <div className='flex w-1/2 '>
                            <div className=''>
                                <Input placeholder="Title" ref={inputRef} defaultValue={'My Task Board'} className='text-3xl font-medium border-none  focus-visible:ring-transparent focus-visible:ring-0 ' type='text' />
                            </div>
                            <Image src={Edit} alt="edit" onClick={HandleEdit} className='cursor-pointer' />
                        </div>
                    </div>
                    <div className='p-2 pt-0 mx-auto w-7/12 flex items-center '>
                        <Input placeholder="Search" className='border-none  focus-visible:ring-transparent focus-visible:ring-0 text-lg' type='text' defaultValue={'Tasks to keep organised'} />
                        <Button variant={'link'} className="cursor-pointer" onClick={handleSignout}>
                            <LogOutIcon />
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TaskBoardComponent