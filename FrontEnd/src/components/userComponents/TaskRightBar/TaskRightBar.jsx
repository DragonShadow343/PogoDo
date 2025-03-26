import React, { useContext, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi"; // Import the plus icon
import TaskContext from "../../../context/TaskProvider";
import "./TaskRightBar.css";
import TaskForm from "../../universalComponents/TaskForm";
import TaskUI from "./../../universalComponents/UIComponents/TaskUI"
import AuthContext from "../../../context/AuthProvider";

const TaskRightBar = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const { auth } = useContext(AuthContext);

    const handleNewTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to state
        setIsModalOpen(false); // Close modal after adding task
    };

    const handleTaskDelete = (taskID) => {
        setTasks(tasks.filter(task => task.id !== taskID));
    };

    return (
        <section className="flex-[4] ml-64 bg-[#FFFCF9] h-screen p-4 relative">
            <div className="flex justify-between items-center">
                <strong className="text-xl font-bold ml-4">Task Board</strong>
                {/* + Button to Open Modal */}
                {auth.role == "admin" && <button 
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 mr-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md transition duration-200">
                    <FiPlus size={24} />
                </button>}
            </div>

            <div className="p-4 overflow-hidden grid grid-cols-3 gap-4">
                <div>
                    <p className="text-xl text-red-400 font-bold m-4 mt-8">High Priority</p>
                    {tasks.filter(task => task.priorityStatus === 3).map((task) => (
                        <TaskUI key={task.id} task={task} onTaskDelete={handleTaskDelete} />
                    ))}
                </div>

                <div>
                    <p className="text-xl font-bold m-4 mt-8">Medium Priority</p>
                    {tasks.filter(task => task.priorityStatus === 2).map((task) => (
                        <TaskUI key={task.id} task={task} onTaskDelete={handleTaskDelete} />
                    ))}
                </div>

                <div>
                <p className="text-xl font-bold m-4 mt-8">Low Priority</p>
                {tasks.filter(task => task.priorityStatus === 1).map((task) => (
                    <TaskUI key={task.id} task={task} onTaskDelete={handleTaskDelete} />
                ))}
                </div>
            </div>

            {/* Modal for Adding New Task */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#FFFCF9] p-6 rounded-lg shadow-lg w-1/3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Task</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="h-fit w-fit hover:bg-[#e9e3dd] text-black p-2 rounded-md">
                                    <FiX />
                            </button>
                        </div>
                        <TaskForm updateTasks={handleNewTask} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default TaskRightBar;
