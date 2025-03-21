import React from 'react'
import axios from "axios";
import { FiTrash } from "react-icons/fi";

const DeleteTaskButton = ({ taskID, taskLocked, onTaskDelete }) => {

    const handleDelete = async () => {
        if (taskLocked) {
            alert("This task is locked and cannot be deleted.");
            return;
        }
    
        try {
            await axios.delete(`http://localhost:3500/Tasks/${taskID}`);
            onTaskDelete(taskID);
            alert("Task deleted successfully!");
            // Optionally trigger a UI update (e.g., refresh task list)
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task. Please try again.");
        }
    };

    return (
        <button 
            onClick={handleDelete} 
            className="px-2 py-1 rounded hover:cursor-pointer transition-bg duration-75 hover:bg-[rgba(0,0,0,0.1)]">
            <FiTrash />
        </button>
    );
};

export default DeleteTaskButton;
