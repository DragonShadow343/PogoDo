import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaUsers, FaCog } from "react-icons/fa"; // Importing icons
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="flex-[0.8] h-screen bg-gray-800 text-white p-4">
      <div>
        <div className="flex justify-start">
          <p className="adminText text-xl font-bold">Admin</p>
        </div>
        <ul className="ulContainer mt-4">
          <h4 className="text-gray-400 font-bold text-sm">Menu</h4>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaHome className="text-lg" />
            <Link to="/admin/home">Home</Link>
          </li>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaTasks className="text-lg" />
            <Link to="/admin/daily-tasks">Daily Task</Link>
          </li>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaUsers className="text-lg" />
            <Link to="/admin/team-members">Team Members</Link>
          </li>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaCog className="text-lg" />
            <Link to="/admin/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
