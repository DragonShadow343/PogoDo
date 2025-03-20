import { useContext, useState } from "react";
import axios from "./../../api/axios";
import AuthContext from '../../context/AuthProvider';

const TaskForm = ({ updateTasks }) => {
    const { auth } = useContext(AuthContext);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [priorityStatus, setPriorityStatus] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [lockStatus, setLockStatus] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) return;
        console.log(auth.username);
        if (!auth || !auth.username) {
            console.error("User is not authenticated or does not have a username.");
            return; 
        }

        const newTask = {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            priorityStatus,
            dueDate,
            completionStatus: false, // Default to false
            lockStatus,
        };


        try {
            const response = await axios.post("/Tasks/createtask", newTask ,{ withCredentials: true }); //passes username from AuthContext so we can retrieve userId in backend

            const createdTask = response.data;

            console.log("Assigning task with username: ", auth.username);
            console.log("Assigning task with taskTitle: ", createdTask.taskTitle);

            //pushes username and created task Id to backend to store assignment in UserTasks
            try {
              await axios.post("/Tasks/addAssignment", null, {
                params:{
                    username: auth.username,
                    taskTitle: createdTask.taskTitle
                },
                withCredentials:true
            });
            } catch (error) {
                console.error("Error assigning task.")
           } 
            


            updateTasks(response.data); // Update parent component



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
