import React, { useContext, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi"; // Import the plus icon
import TaskContext from "../../../context/TaskProvider";
import AssigneeDropdown from "./TaskRightBarComponents/AssigneeDropdown";
import "./TaskRightBar.css";
import TaskForm from "../../universalComponents/TaskForm";
import CompletedButton from "../../universalComponents/UIComponents/CompletedButton";

const TaskRightBar = () => {
    const { tasks, setTasks, toggleTaskCompletion } = useContext(TaskContext);
    const availableMembers = ["Alice", "Bob", "Charlie", "David"];
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    const updateTaskAssignees = (taskId, newAssignees) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, assignedTo: newAssignees } : task
            )
        );
    };

    const handleNewTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to state
        setIsModalOpen(false); // Close modal after adding task
    };

    return (
        <section className="flex-[4] ml-64 bg-[#FFFCF9] h-screen p-4 relative">
            <div className="flex justify-between items-center">
                <strong className="text-xl font-bold ml-4">Task Board</strong>
                {/* + Button to Open Modal */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 mr-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md transition duration-200">
                    <FiPlus size={24} />
                </button>
            </div>

            <div className="p-4 overflow-hidden gap-4">
                <p className="text-xl text-red-400 font-bold m-4">High Priority</p>
                {tasks.filter(task => task.priority === 3).map((task) => (
                    <div key={task.id} className="p-4 mb-2 space-y-4 rounded-lg bg-red-50 shadow-md">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-lg">{task.taskTitle}</h3>
                            <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priority} />
                        </div>
                        <div className="flex flex-row-reverse justify-between">
                            <AssigneeDropdown
                                availableMembers={availableMembers}
                                assignedMembers={task.assignedTo}
                                onAssign={(newAssignees) => updateTaskAssignees(task.id, newAssignees)}
                                isOpen={openDropdown === task.id}
                                toggleDropdown={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                            />
                            <p>Assigned To: {task.assignedTo?.length > 0 ? task.assignedTo.join(", ") : "None"}</p>
                        </div>
                    </div>
                ))}

                <p className="text-xl font-bold m-4 mt-8">Remaining Tasks</p>
                {tasks.filter(task => task.priority !== 3).map((task) => (
                    <div key={task.id} className="p-4 mb-2 space-y-4 rounded-lg shadow-md">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-lg">{task.taskTitle}</h3>
                            <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priority} />
                        </div>
                        <div className="flex flex-row-reverse justify-between">
                            <AssigneeDropdown
                                availableMembers={availableMembers}
                                assignedMembers={task.assignedTo}
                                onAssign={(newAssignees) => updateTaskAssignees(task.id, newAssignees)}
                                isOpen={openDropdown === task.id}
                                toggleDropdown={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                            />
                            <p>Assigned To: {task.assignedTo?.length > 0 ? task.assignedTo.join(", ") : "None"}</p>
                        </div>
                    </div>
                ))}
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
