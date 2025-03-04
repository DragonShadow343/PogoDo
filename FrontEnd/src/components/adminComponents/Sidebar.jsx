import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='flex-[0.8] h-screen'>
        <div>
            <div className='flex justify-center'>
                <p className='adminText'>Admin</p>
            </div>
            <ul className='ulContainer'>
                <h4 className="flex justify-start font-bold">Menu</h4>
                <li className='liContainer'>
                    <img src="" alt="" />
                    <p>Home</p>
                </li>
                <li className='liContainer'>
                    <img src="" alt="" />
                    <p>Daily Task</p>
                </li>
                <li className='liContainer'>
                    <img src="" alt="" />
                    <p>Team members</p>
                </li>
                <li className='liContainer'>
                    <img src="" alt="" />
                    <p>Settings</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
