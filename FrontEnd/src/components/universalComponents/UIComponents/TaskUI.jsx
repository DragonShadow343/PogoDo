import React, { useContext, useState } from "react";
import CompletedButton from "./CompletedButton";
import AssigneeDropdown from "../../adminComponents/TaskRightBar/TaskRightBarComponents/AssigneeDropdown";
import LockButton from "./LockButton";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskContext from "../../../context/TaskProvider";

const TaskUI = ({ task, onTaskDelete }) => {
    const { users, assignUsersToTask } = useContext(TaskContext);
    const [openDropdown, setOpenDropdown] = useState(null);
    // Assume task.assignedTo is an array of user IDs
    const [assignedMembers, setAssignedMembers] = useState(task.assignedTo || []);

    // Update assignment both locally and via API call
    const updateTaskAssignees = (newAssignees) => {
        setAssignedMembers(newAssignees);
        console.log("Assigning users to task:", task.id, newAssignees);
        assignUsersToTask(task.id, newAssignees);
    };

    return (
        <div key={task.id} className={`flex justify-between p-4 mb-2 space-y-4 rounded-lg ${task.priorityStatus === 3 ? "bg-red-50" : "bg-[#FFFCF9]"} shadow-md`}>
            <h3 className="font-bold text-lg">{task.taskTitle}</h3>
            <div className="flex flex-row-reverse items-center space-x-4">
                <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priorityStatus} />
                <DeleteTaskButton taskID={task.id} taskLocked={task.lockStatus} taskPriority={task.priorityStatus} onTaskDelete={onTaskDelete} />
                <LockButton taskID={task.id} taskLocked={task.lockStatus} taskPriority={task.priorityStatus} />
            </div>
            <div className="flex flex-row-reverse justify-between">
                <AssigneeDropdown
                    // Pass full user objects so that the dropdown can use the id and display username
                    availableMembers={users} 
                    assignedMembers={assignedMembers} // Array of user IDs
                    onAssign={updateTaskAssignees}
                    isOpen={openDropdown === task.id}
                    toggleDropdown={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                />
                <p>
                    Assigned To:{" "}
                    {assignedMembers.length > 0 
                        ? assignedMembers
                              .map((id) => {
                                  // Find the user by id and return their username
                                  const user = users.find((u) => u.userId === id);
                                  return user ? user.username : id;
                              })
                              .join(", ")
                        : "None"}
                </p>
            </div>
        </div>
    );
};

export default TaskUI;