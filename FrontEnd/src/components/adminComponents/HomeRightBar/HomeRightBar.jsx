import React from 'react'
import "./HomeRightBar.css"

const HomeRightBar = () => {
  return (
    <div className='mainHomeRightbar h-screen'>
      HomeRightBar
      <section id="AdminContent" className='p-4 grid grid-cols-4 grid-rows-[30vh_30vh_30vh] gap-4'>
        <div className="border-2 col-span-2">Personal info</div>
        <div className="border-2 col-span-2 row-span-3">All tasks</div>
        <div className="border-2 col-span-2">Priority Task list</div>
        <div className="border-2">Team members</div>
        <div className="border-2">Progress bar</div>
      </section>
    </div>
  )
}

export default HomeRightBar
