import React from 'react'
import AddTask from '@/components/AddTask';
import FetchTasks from '@/components/FetchTasks';


type Props = {}


const BoardComponent = (props: Props) => {
  return (
    <main className="w-screen h-screen flex flex-col items-center overflow-x-hidden">
    <FetchTasks/>
    <AddTask/>
    </main>
  )
}

export default BoardComponent;