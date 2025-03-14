import React, { useContext } from "react";
import TaskContext from "../../../context/TaskProvider";

const CompletedButton = ({ taskID, taskCompleted, taskPriority }) => {
    const { toggleTaskCompletion } = useContext(TaskContext);
    
    return (
        <button
            onClick={() => toggleTaskCompletion(taskID, taskCompleted)} // Pass both taskID and current status
            className={`px-3 py-1 w-28 rounded text-white hover:cursor-pointer 
                ${taskCompleted ? "bg-[#06D6A0]" : taskPriority === 3 ? "bg-[#EF476F]" : "bg-[#26547C]"}`}>
            {taskCompleted ? "Completed" : "Mark done"}
        </button>
    );
};
export default CompletedButton;