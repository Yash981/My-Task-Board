import { SignIn } from '@/components/sign-in'
import React from 'react'
import logo from '@/public/Images/Logo.svg'
import Image from 'next/image'


type Props = {}

const SignInComponent = (props: Props) => {
  return (
    <div className='flex justify-center flex-col w-36 items-center mx-auto gap-3'>
      <div className="">
        <Image src={logo} alt="logo" width={40} height={40} />
      </div>
      <SignIn />
    </div>
  )
}

export default SignInComponent