import React from 'react'
import Sidebar from "../../components/adminComponents/Sidebar"
import TaskRightBar from '../../components/adminComponents/TaskRightBar/TaskRightBar'

const TaskBoard = () => {
  return (
    <section className='flex'>
      <Sidebar/>
      <TaskRightBar />
    </section>
  )
}

export default TaskBoard
