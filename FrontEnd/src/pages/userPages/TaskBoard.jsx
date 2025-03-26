import React from 'react'
import Sidebar from "../../components/userComponents/Sidebar"
import TaskRightBar from '../../components/userComponents/TaskRightBar/TaskRightBar'

const TaskBoard = () => {
  return (
    <section className='flex'>
      <Sidebar/>
      <TaskRightBar />
    </section>
  )
}

export default TaskBoard

