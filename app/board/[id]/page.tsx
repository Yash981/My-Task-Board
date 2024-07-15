import React from 'react'
import AddTask from '@/components/AddTask';
import FetchTasks from '@/components/FetchTasks';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';


type Props = {}


const BoardComponent = async  (props: Props) => {
  const session = await auth();

  if (!session) {
    // console.log("Authentication failed")
    redirect("/sign-in");
  }
  return (
    <main className="w-screen h-screen flex flex-col items-center overflow-x-hidden">
    <FetchTasks/>
    <AddTask/>
    </main>
  )
}

export default BoardComponent;