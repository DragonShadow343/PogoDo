import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaUsers,
  FaCog,
  FaComments
} from "react-icons/fa";
import AuthContext from "./../../context/AuthProvider";
import NotificationCentre from "../universalComponents/NotificationComponent/NotificationCentre";
import LogoutBtn from "./../universalComponents/UIComponents/LogoutBtn";
import Chat from "../universalComponents/WebSocket(CHAT)/Chat";
import "./Sidebar.css";

const Sidebar = () => {
  const { auth } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex-[0.8] fixed min-w-64 max-w-64 h-screen bg-gray-800 text-white p-4 z-40">
      <div>
        <div className="flex justify-start">
          <p className="adminText text-xl font-bold">
            {auth.role === "admin" ? "Admin" : "User"}
          </p>
        </div>

        <ul className="ulContainer mt-4">
          <h4 className="text-gray-400 font-bold text-sm">Menu</h4>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaHome className="text-lg" />
            <Link to="/user/home">Home</Link>
          </li>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaTasks className="text-lg" />
            <Link to="/user/tasks">Daily Task</Link>
          </li>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaUsers className="text-lg" />
            <Link to="/user/team-members">Team Members</Link>
          </li>

          <li className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
            <FaCog className="text-lg" />
            <Link to="/user/settings">Settings</Link>
          </li>

          <li
            className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer"
            onClick={toggleChat}
          >
            <FaComments className="text-lg" />
            <span>Chat</span>
          </li>

          {/* Logout Button */}
          <li className="liContainer flex hover:bg-gray-700 rounded-md">
            <LogoutBtn />
          </li>
        </ul>

        <h4 className="text-gray-400 font-bold text-sm mt-6">Notifications</h4>
        <div>
          <NotificationCentre userId={auth?.id} />
        </div>
      </div>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Chat</h2>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
