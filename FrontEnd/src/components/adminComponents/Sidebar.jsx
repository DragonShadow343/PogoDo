import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

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
            <Link to="/admin/home">
              <img src="home-icon.png" alt="Home" />
              <p>Home</p>
            </Link>
          </li>
          <li className='liContainer'>
            <Link to="/admin/daily-tasks">
              <img src="tasks-icon.png" alt="Daily Task" />
              <p>Daily Task</p>
            </Link>
          </li>
          <li className='liContainer'>
            <Link to="/admin/team-members">
              <img src="members-icon.png" alt="Team Members" />
              <p>Team members</p>
            </Link>
          </li>
          <li className='liContainer'>
            <Link to="/admin/settings">
              <img src="settings-icon.png" alt="Settings" />
              <p>Settings</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
