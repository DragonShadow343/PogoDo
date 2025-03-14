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
    const toggleTaskCompletion = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, toggleTaskCompletion }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
