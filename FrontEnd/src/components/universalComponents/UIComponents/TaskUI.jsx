import React, { useContext, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import CompletedButton from "./CompletedButton";
import AssigneeDropdown from "../../adminComponents/TaskRightBar/TaskRightBarComponents/AssigneeDropdown";
import LockButton from "./LockButton";
import DeleteTaskButton from "./DeleteTaskButton";

const TaskUI = ({task, onTaskDelete}) => {
    const availableMembers = ["Alice", "Bob", "Charlie", "David"];
    const [openDropdown, setOpenDropdown] = useState(null);

    return (
        <div key={task.id} className={`flex justify-between p-4 mb-2 space-y-4 rounded-lg ${task.priorityStatus === 3 ? "bg-red-50": "bg-[#FFFCF9]"}  shadow-md`}>
            <h3 className="font-bold text-lg">{task.taskTitle}</h3>
            <div className="flex flex-row-reverse items-center space-x-4">
                {/* <FiMoreVertical /> */}
                <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priorityStatus} />
                <DeleteTaskButton taskID={task.id} taskLocked={task.lockStatus} taskPriority={task.priorityStatus} onTaskDelete={onTaskDelete}/>
                <LockButton taskID={task.id} taskLocked={task.lockStatus} taskPriority={task.priorityStatus} />
            </div>
            {/* <div className="flex flex-row-reverse justify-between">
                <AssigneeDropdown
                    availableMembers={availableMembers}
                    assignedMembers={task.assignedTo}
                    onAssign={(newAssignees) => updateTaskAssignees(task.id, newAssignees)}
                    isOpen={openDropdown === task.id}
                    toggleDropdown={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                />
                <p>Assigned To: {task.assignedTo?.length > 0 ? task.assignedTo.join(", ") : "None"}</p>
            </div> */}
        </div>
    )
}

export default TaskUI
