import { createContext, useState, useEffect } from "react";
import axios from "./../api/axios"

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("/Tasks"); // Fetch all tasks
                setTasks(response.data); // Update state with fetched tasks
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Toggle task completion
    const toggleTaskCompletion = async (taskId, currentStatus) => {
        // Find the full task object
        const taskToUpdate = tasks.find(task => task.id === taskId);
        if (!taskToUpdate) return console.error("Task not found in state");
    
        // Optimistically update UI
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !currentStatus } : task
            )
        );
    
        try {
            // ✅ Send the full task object
            await axios.put(`/Tasks/${taskId}`, {
                ...taskToUpdate, // Keep all fields
                completed: !currentStatus, // Only toggle completed
            });
    
            console.log("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
    
            // ❌ Rollback UI update if request fails
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, completed: currentStatus } : task
                )
            );
    
            alert("Error updating task. Please try again.");
        }
    };


    return (
        <TaskContext.Provider value={{ tasks, setTasks, toggleTaskCompletion }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
