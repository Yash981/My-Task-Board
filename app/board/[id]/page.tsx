import React from 'react'
import AddTask from '@/components/AddTask';
import FetchTasks from '@/components/FetchTasks';


type Props = {}


const BoardComponent = (props: Props) => {
  return (
    <>
    <FetchTasks/>
    <AddTask/>
    </>
  )
}

export default BoardComponent;