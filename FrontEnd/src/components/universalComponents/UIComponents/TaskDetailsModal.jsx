import React, { useContext } from "react";
import ReactDOM from "react-dom";
import AssigneeDropdown from "../../adminComponents/TaskRightBar/TaskRightBarComponents/AssigneeDropdown";
import LockButton from "./LockButton";
import DeleteTaskButton from "./DeleteTaskButton";
import CompletedButton from "./CompletedButton";
import AuthContext from "../../../context/AuthProvider";

const TaskDetailsModal = ({
  task,
  onClose,
  onTaskDelete,
  users,
  assignedMembers,
  updateTaskAssignees,
  openDropdown,
  toggleDropdown,
}) => {

    const { auth } = useContext(AuthContext);
    const userRole = auth.role;

    function daysUntilDue(dueDateInput) {
        // Ensure dueDateInput is a Date object
        const dueDate = new Date(dueDateInput);
        const now = new Date();
      
        // Calculate the difference in milliseconds
        const diffInMs = dueDate - now;
      
        // Convert milliseconds to days (1 day = 86,400,000 ms)
        const daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      
        return daysRemaining;
      }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
        <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={onClose}
        ></div>
        {/* Modal content */}
        {console.log(task)}
        <div className="bg-white rounded-lg shadow-lg p-6 relative z-10 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Task Details</h2>
                <div className="flex items-center space-x-2">
                    {userRole == "admin" && <DeleteTaskButton
                        taskID={task.id}
                        taskLocked={task.lockStatus}
                        taskPriority={task.priorityStatus}
                        onTaskDelete={onTaskDelete}
                    />}
                    {userRole == "admin" && <LockButton
                        taskID={task.id}
                        taskLocked={task.lockStatus}
                        taskPriority={task.priorityStatus}
                    />}
                    <div className={`flex flex-row-reverse justify-between`}>
                        {userRole == "admin" && <AssigneeDropdown
                            availableMembers={users}
                            assignedMembers={assignedMembers}
                            onAssign={updateTaskAssignees}
                            isOpen={openDropdown === task.id}
                            toggleDropdown={toggleDropdown}
                        />}
                    </div>
                    <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priorityStatus}/>
                </div>
            </div>
            <p>
                <strong>Title:</strong> {task.taskTitle}
            </p>
            <p>
                <strong>Description:</strong>{" "}
                {task.taskDescription || "No description available"}
            </p>
            <p>
                <strong>Priority:</strong>{" "}
                {task.priorityStatus === 3
                    ? "High"
                    : task.priorityStatus === 2
                    ? "Medium"
                    : "Low"}
            </p>
            <p>
                <strong>Due in:</strong>{" "}
                <span className={`${daysUntilDue(task.dueDate) > 2 ? "text-green-500" : (daysUntilDue(task.dueDate) > 0 ?"text-amber-500" : "text-red-500")}`}>
                    {daysUntilDue(task.dueDate) > 0
                        ? ((daysUntilDue(task.dueDate) == 1 
                        ? "Due in 1 day" 
                        : `${daysUntilDue(task.dueDate)} days till due`))
                        : (daysUntilDue(task.dueDate) == 0 
                        ? "Due today" 
                        : `${-1*(daysUntilDue(task.dueDate))} days overdue`)
                    }
                    </span>
            </p>
            <p>
                <strong>Assigned To:</strong>{" "}
                {assignedMembers.length > 0 
                    ? assignedMembers
                            .map((id) => {
                                // Find the user by id and return their username
                                const user = users.find((u) => u.userId === id);
                                return user ? user.username : id;
                            })
                            .join(", ")
                    : "No one"}
            </p>
            <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
            Close
            </button>
        </div>
        </div>,
        document.body
    );
};

export default TaskDetailsModal;
