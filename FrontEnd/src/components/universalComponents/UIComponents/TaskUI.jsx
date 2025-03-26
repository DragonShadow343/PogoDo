import React, { useContext, useState } from "react";
import CompletedButton from "./CompletedButton";
import TaskContext from "../../../context/TaskProvider";
import TaskDetailsModal from "./TaskDetailsModal"; // Import the modal

const TaskUI = ({ task, onTaskDelete }) => {
    const { users, assignUsersToTask } = useContext(TaskContext);
    const [openDropdown, setOpenDropdown] = useState(null);
    // Assume task.assignedTo is an array of user IDs
    const [assignedMembers, setAssignedMembers] = useState(task.assignedTo || []);
    const [showModal, setShowModal] = useState(false); // state for modal visibility

    // Update assignment both locally and via API call
    const updateTaskAssignees = (newAssignees) => {
        setAssignedMembers(newAssignees);
        console.log("Assigning users to task:", task.id, newAssignees);
        assignUsersToTask(task.id, newAssignees);
    };

    const toggleDropdown = () => {
        setOpenDropdown(openDropdown === task.id ? null : task.id);
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
    <div key={task.id} className={`flex flex-col justify-between max-h-42 p-4 mb-2 space-y-4 rounded-lg ${task.priorityStatus === 3 ? "bg-red-50" : "bg-[#FFFCF9]"} shadow-md`}>
        <div className="flex justify-between items-center w-full">
            <p className="font-bold text-lg h-fit flex my-auto justify-start items-center w-[70%]">{task.taskTitle}</p>
            <div className="flex flex-row items-center space-x-4">
                <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priorityStatus}/>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(true)}>
                    &#8942;
                </button>
            </div>
        </div>
        <p className="font-light text-gray-500 text-md h-fit flex my-auto justify-start items-center w-[70%]">{truncateText(task.taskDescription, 70)}</p>
        {showModal && (
            <TaskDetailsModal
                task={task}
                onClose={() => setShowModal(false)}
                onTaskDelete={onTaskDelete}
                users={users}
                assignedMembers={assignedMembers}
                updateTaskAssignees={updateTaskAssignees}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
            />
        )}
    </div>
    );
};

    export default TaskUI;
