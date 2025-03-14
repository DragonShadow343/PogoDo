import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaUsers, FaCog, FaComments } from "react-icons/fa"; // Added FaComments for the chat icon
import "./Sidebar.css";
import AuthContext from "../../context/AuthProvider";
import Chat from "../universalComponents/WebSocket(CHAT)/Chat"; // Import the Chat component

const Sidebar = () => {
  const { auth } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat sidebar visibility

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat sidebar visibility
  };

  return (
    <div className="flex-[0.8] fixed min-w-64 max-w-64 h-screen bg-gray-800 text-white p-4">
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

          {/* Add Chat Button */}
          <li
            className="liContainer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer"
            onClick={toggleChat}
          >
            <FaComments className="text-lg" />
            <span>Chat</span>
          </li>
        </ul>
      </div>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Chat</h2>
          <Chat /> {/* Render the Chat component */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;