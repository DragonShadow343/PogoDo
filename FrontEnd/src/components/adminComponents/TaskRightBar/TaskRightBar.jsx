import React, { useContext, useState, useMemo } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import TaskContext from "../../../context/TaskProvider";
import TaskForm from "../../universalComponents/TaskForm";
import TaskUI from "../../universalComponents/UIComponents/TaskUI";
import "./TaskRightBar.css";

const TaskRightBar = () => {
    const { tasks, setTasks, users } = useContext(TaskContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOption, setFilterOption] = useState("All");

    const handleNewTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setIsModalOpen(false);
    };

    const handleTaskDelete = (taskID) => {
        setTasks(tasks.filter(task => task.id !== taskID));
    };

    // Filter and search logic
    const filteredTasks = useMemo(() => {
        let filtered = [...tasks];

        // Filter by dropdown
        if (filterOption === "Nearest Date") {
            filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (filterOption === "Farthest Date") {
            filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        } else if (filterOption === "Assigned Members") {
            filtered = filtered.filter(task => task.assignedTo && task.assignedTo.length > 0);
        }

        // Filter by search (username or task title)
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(task => {
                const taskTitleMatch = task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());
                const assignedUsernames = task.assignedTo?.map(id => {
                    const user = users.find(u => u.userId === id);
                    return user?.username?.toLowerCase() || "";
                });
                const assigneeMatch = assignedUsernames?.some(name => name.includes(searchQuery.toLowerCase()));
                return taskTitleMatch || assigneeMatch;
            });
        }

        return filtered;
    }, [tasks, searchQuery, filterOption, users]);

    return (
        <section className="flex-[4] ml-64 bg-[#FFFCF9] h-screen p-4 relative">
            <div className="flex justify-between items-center">
                <strong className="text-xl font-bold ml-4">Task Board</strong>

                {/* Search and Filter UI */}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border px-3 py-1 rounded-md shadow-sm focus:outline-none focus:ring"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        list="task-suggestions"
                    />
                    <datalist id="task-suggestions">
                        {tasks.map((task, idx) => (
                            <option key={idx} value={task.taskTitle} />
                        ))}
                    </datalist>

                    <select
                        className="border px-2 py-1 rounded-md shadow-sm bg-gray-200"
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Nearest Date">Nearest Date</option>
                        <option value="Farthest Date">Farthest Date</option>
                        <option value="Assigned Members">Assigned Members</option>
                    </select>
                </div>

                {/* + Button */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md transition duration-200"
                >
                    <FiPlus size={24} />
                </button>
            </div>

            {/* Task Columns */}
            <div className="p-4 overflow-hidden grid grid-cols-3 gap-4">
                <div>
                    <p className="text-xl text-red-400 font-bold m-4">High Priority</p>
                    {filteredTasks.filter(task => task.priorityStatus === 3).map((task) => (
                        <TaskUI key={task.id} task={task} onTaskDelete={handleTaskDelete} />
                    ))}
                </div>
                <div>
                    <p className="text-xl font-bold m-4 mt-8">Medium Priority</p>
                    {filteredTasks.filter(task => task.priorityStatus === 2).map((task) => (
                        <TaskUI key={task.id} task={task} onTaskDelete={handleTaskDelete} />
                    ))}
                </div>
                <div>
                    <p className="text-xl font-bold m-4 mt-8">Low Priority</p>
                    {filteredTasks.filter(task => task.priorityStatus === 1).map((task) => (
                        <TaskUI key={task.id} task={task} onTaskDelete={handleTaskDelete} />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#FFFCF9] p-6 rounded-lg shadow-lg w-1/3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Task</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="h-fit w-fit hover:bg-[#e9e3dd] text-black p-2 rounded-md"
                            >
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
