import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaUsers, FaCog } from "react-icons/fa"; // Importing icons
import AuthContext from "./../../context/AuthProvider";
import NotificationCentre from "../universalComponents/NotificationComponent/NotificationCentre";
import "./Sidebar.css";

const Sidebar = () => {

  const { auth } = useContext(AuthContext)

  return (
    <div className="flex-[0.8] fixed min-w-64 max-w-64 h-screen bg-gray-800 text-white p-4">
      <div>
        <div className="flex justify-start">
      <p className="adminText text-xl font-bold">{(auth.role) === 'admin' ? "Admin" : "User"}</p>
        </div>
        <ul className="ulContainer mt-4">
          <h4 className="text-gray-400 font-bold text-sm">Menu</h4>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaHome className="text-lg" />
            <Link to="/admin/home">Home</Link>
          </li>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaTasks className="text-lg" />
            <Link to="/admin/tasks">Daily Task</Link>
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

        <h4 className="text-gray-400 font-bold text-sm">Notifications</h4>
        <div className="">
          <NotificationCentre userId={auth?.id} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
