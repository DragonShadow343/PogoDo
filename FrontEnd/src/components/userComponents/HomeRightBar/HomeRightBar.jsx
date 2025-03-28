import React from 'react'
import "./HomeRightBar.css"
import Tasks from './../../universalComponents/UIComponents/Widgets/Tasks'
import PriorityTasks from './../../universalComponents/UIComponents/Widgets/PriorityTasks'
import ProgressBar from '../../universalComponents/UIComponents/Widgets/ProgressBar'

const HomeRightBar = () => {
  return (
    <section className='flex-[4] ml-64 bg-[#FFFCF9] h-screen p-4'>
      <strong className='text-xl font-bold ml-4'>Home</strong>
      <div id="AdminContent" className='p-4 grid grid-cols-2 overflow-hidden gap-4'>
        <div className="row-span-4 max-h-[90vh]"><Tasks /></div>
        <div className=""><ProgressBar /></div>
        <div className=""><PriorityTasks /></div>
      </div>
    </section>
  )
}

export default HomeRightBar