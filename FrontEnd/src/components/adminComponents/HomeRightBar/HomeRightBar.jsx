import React from 'react'
import "./HomeRightBar.css"
import PersonalInfo from './../../universalComponents/PersonalInfo'
import AllTasks from './HomeRightBarWidgets/AllTasks'
import PriorityTasks from './HomeRightBarWidgets/PriorityTasks'
import TeamMembers from './HomeRightBarWidgets/TeamMembers'
import ProgressBar from './../../universalComponents/UIComponents/Widgets/ProgressBar'

const HomeRightBar = () => {
  return (
    <section className='flex-[4] ml-64 bg-[#FFFCF9] h-screen p-4'>
      <strong className='text-xl font-bold ml-4'>Home</strong>
      <div id="AdminContent" className='p-4 grid grid-cols-4 grid-rows-4 overflow-hidden gap-4'>
        <div className=" col-span-2"><PersonalInfo /></div>
        <div className=" col-span-2 row-span-3 max-h-[300vh]"><AllTasks /></div>
        <div className=" col-span-2"><PriorityTasks /></div>
        <div className="col-span-2"><TeamMembers /></div>
        <div className="col-span-2"><ProgressBar /></div>
      </div>
    </section>
  )
}

export default HomeRightBar
