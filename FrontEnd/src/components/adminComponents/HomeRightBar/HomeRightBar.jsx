import React from 'react'
import "./HomeRightBar.css"
import PersonalInfo from './HomeRightBarWidgets/PersonalInfo'
import AllTasks from './HomeRightBarWidgets/AllTasks'
import PriorityTasks from './HomeRightBarWidgets/PriorityTasks'
import TeamMembers from './HomeRightBarWidgets/TeamMembers'
import ProgressBar from './HomeRightBarWidgets/ProgressBar'

const HomeRightBar = () => {
  return (
    <div className='flex-[4] bg-red-500 h-screen p-4'>
      <strong className='text-xl font-bold ml-4'>Home</strong>
      <section id="AdminContent" className='p-4 grid grid-cols-4 grid-rows-3 overflow-hidden gap-4'>
        <div className=" col-span-2"><PersonalInfo /></div>
        <div className=" col-span-2 row-span-3 max-h-[300vh]"><AllTasks /></div>
        <div className=" col-span-2"><PriorityTasks /></div>
        <div className=""><TeamMembers /></div>
        <div className=""><ProgressBar /></div>
      </section>
    </div>
  )
}

export default HomeRightBar
