import { useState, useContext } from "react";
import axios from "./../../api/axios";
import AuthContext from "./../../context/AuthProvider";


const TaskForm = ({ updateTasks }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [priorityStatus, setPriorityStatus] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [lockStatus, setLockStatus] = useState(false);
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) return;

        const newTask = {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            priorityStatus,
            dueDate,
            completionStatus: false, // Default to false
            lockStatus,
        };

        try {
            const response = await axios.post("/Tasks/createtask", newTask, { withCredentials: true });
            const createdTask = response.data
            
            updateTasks(createdTask); // Update parent component

            const assignmentResponse = await axios.post(`/Tasks/${createdTask.id}/assign`,
                JSON.stringify([auth.id]),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            console.log("Task created and assigned:", assignmentResponse.data);

            resetForm(); // Clear input fields
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const resetForm = () => {
        setTaskTitle("");
        setTaskDescription("");
        setPriorityStatus(1);
        setDueDate("");
        setLockStatus(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-white rounded-md shadow-md">
            {/* Task Title */}
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                className="p-2 border rounded-md w-full"
                required
            />

            {/* Task Description */}
            <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
                className="p-2 border rounded-md w-full"
                rows="3"
                required
            />

            {/* Priority Status Dropdown */}
            <select
                value={priorityStatus}
                onChange={(e) => setPriorityStatus(parseInt(e.target.value))}
                className="p-2 border rounded-md w-full"
            >
                <option value={1}>Low Priority</option>
                <option value={2}>Medium Priority</option>
                <option value={3}>High Priority</option>
            </select>

            {/* Due Date Picker */}
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="p-2 border rounded-md w-full"
                required
            />

            {/* Lock Status Checkbox */}
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={lockStatus}
                    onChange={() => setLockStatus(!lockStatus)}
                />
                Lock Task
            </label>

            {/* Submit Button */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
