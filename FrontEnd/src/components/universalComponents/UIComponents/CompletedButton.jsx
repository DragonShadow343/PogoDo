import React, { useContext } from "react";
import TaskContext from "../../../context/TaskProvider";
import { FiCheck } from "react-icons/fi";

const CompletedButton = ({ taskID, taskCompleted, taskPriority }) => {
    const { toggleTaskCompletion } = useContext(TaskContext);

    return (
        <button
            onClick={() => toggleTaskCompletion(taskID, taskCompleted)} // Pass both taskID and current status
            className={`px-3 py-1 rounded text-white hover:cursor-pointer transition-bg duration-75
                ${taskCompleted ? "bg-[#06D6A0]" : (taskPriority === 3 ? "bg-[#EF476F]" : "bg-[#26547C]")}`}>
            <FiCheck className="text-[#FFFCF9]" />
        </button>
    );
};
export default CompletedButton;