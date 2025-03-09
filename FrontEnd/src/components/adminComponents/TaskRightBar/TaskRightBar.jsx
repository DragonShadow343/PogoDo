import React, { useContext, useState } from "react";
import TaskContext from "../../../context/TaskProvider";
import AssigneeDropdown from "./TaskRightBarComponents/AssigneeDropdown";
import './TaskRightBar.css';
import CompletedButton from "../../universalComponents/UIComponents/CompletedButton";

const TaskRightBar = () => {
    const { tasks, setTasks, toggleTaskCompletion } = useContext(TaskContext);
    const availableMembers = ["Alice", "Bob", "Charlie", "David"]; // Replace with real data
    const [openDropdown, setOpenDropdown] = useState(null); // Tracks open dropdown

    const updateTaskAssignees = (taskId, newAssignees) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, assignedTo: newAssignees } : task
            )
        );
    };

    return (
        <section className="flex-[4] ml-64 bg-[#FFFCF9] h-screen p-4">
            <div>
                <strong className="text-xl font-bold ml-4">Task Board</strong>
            </div>
            <div className="p-4 overflow-hidden gap-4">
                <p className="text-xl text-red-400 font-bold m-4">High Priority</p>
                {tasks
                    .filter(task => task.priority === 3)
                    .map((task) => (
                        <div key={task.id} className="p-4 mb-2 space-y-4 rounded-lg bg-red-50 shadow-[0px_5px_15px_rgba(197,25,25,0.3)]">
                            <div className="flex justify-between">
                                <h3 className="font-bold text-lg">{task.title}</h3>
                                <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priority} />
                            </div>

                            <div className="flex flex-row-reverse justify-between">
                                {/* Assignee Dropdown */}
                                <AssigneeDropdown
                                    availableMembers={availableMembers}
                                    assignedMembers={task.assignedTo}
                                    onAssign={(newAssignees) => updateTaskAssignees(task.id, newAssignees)}
                                    isOpen={openDropdown === task.id} // Open only if it matches the task id
                                    toggleDropdown={() =>
                                        setOpenDropdown(openDropdown === task.id ? null : task.id)
                                    }
                                    />

                                {/* Display Assigned Members */}
                                <p>Assigned To: {task.assignedTo?.length > 0 ? task.assignedTo.join(", ") : "None"}</p>
                            </div>
                        </div>
                ))}
                <p className="text-xl font-bold m-4 mt-8">Remaining Tasks</p>
                {tasks
                    .filter(task => task.priority != 3)
                    .map((task) => (
                        <div key={task.id} className="p-4 mb-2 space-y-4 rounded-lg shadow-[0px_5px_15px_#d9d6d4]">

                            <div className="flex justify-between">
                                <h3 className="font-bold text-lg">{task.title}</h3>
                                <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priority} />
                            </div>

                            <div className="flex flex-row-reverse justify-between">
                                {/* Assignee Dropdown */}
                                <AssigneeDropdown
                                    availableMembers={availableMembers}
                                    assignedMembers={task.assignedTo}
                                    onAssign={(newAssignees) => updateTaskAssignees(task.id, newAssignees)}
                                    isOpen={openDropdown === task.id} // Open only if it matches the task id
                                    toggleDropdown={() =>
                                        setOpenDropdown(openDropdown === task.id ? null : task.id)
                                    }
                                    />

                                {/* Display Assigned Members */}
                                <p>Assigned To: {task.assignedTo?.length > 0 ? task.assignedTo.join(", ") : "None"}</p>
                            </div>
                        </div>
                ))}
            </div>
        </section>
    );
};

export default TaskRightBar;
