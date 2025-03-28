import React from 'react'
import "./HomeRightBar.css"
import PersonalInfo from '../../universalComponents/PersonalInfo'
import MyTasks from './HomeRightBarWidgets/MyTasks'
import MyPriorityTasks from './HomeRightBarWidgets/MyPriorityTasks'
import ProgressBar from '../../universalComponents/UIComponents/Widgets/ProgressBar'

const HomeRightBar = () => {
  return (
    <section className='flex-[4] ml-64 bg-[#FFFCF9] h-screen p-4'>
      <strong className='text-xl font-bold ml-4'>Home</strong>
      <div id="AdminContent" className='p-4 grid grid-cols-4 grid-rows-4 overflow-hidden gap-4'>
        <div className="col-span-2"><PersonalInfo /></div>
        <div className="col-span-2 row-span-4 max-h-[90vh]"><MyTasks /></div>
        <div className="col-span-2"><MyPriorityTasks /></div>
        <div className="col-span-2"><ProgressBar /></div>
        {/* <div className="border-2 col-span-2"></div> */}
      </div>
    </section>
  )
}

export default HomeRightBar
