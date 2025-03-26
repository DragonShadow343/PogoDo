import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider';
import axios from "./../api/axios";

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedAssignees, setSelectedAssignees] = useState({}); // Tracks assigned users per task
    const { auth } = useContext(AuthContext);
    console.log(auth);
    const userId = auth?.id;

    // Fetch tasks from backend
    useEffect(() => {
        if (!userId) return; // Don't fetch tasks if user isn't logged in
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/Tasks/filtered?userId=${userId}`);
                setTasks(response.data); // Update state with fetched tasks
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [userId]);

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/Users"); // Adjust endpoint as needed
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Assign users to a task
    const assignUsersToTask = async (taskId, assignedUsers) => {
        try {
            // Call the backend assignment endpoint
            await axios.post(`/Tasks/${taskId}/assign`, assignedUsers, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // Update local state only if the call is successful
            setSelectedAssignees((prev) => ({
                ...prev,
                [taskId]: assignedUsers,
            }));
            console.log(`Task ${taskId} assigned to users:`, assignedUsers);
        } catch (error) {
            console.error("Error assigning users:", error);
        }
    };

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
                ...taskToUpdate,
                completed: !currentStatus,
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

    // Toggle task lock status
    const toggleLockCompletion = async (taskId, currentStatus) => {
        // Find the full task object
        const taskToUpdate = tasks.find(task => task.id === taskId);
        if (!taskToUpdate) return console.error("Task not found in state");
    
        // Optimistically update UI
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, lockStatus: !currentStatus } : task
            )
        );
    
        try {
            // ✅ Send the full task object
            await axios.put(`/Tasks/${taskId}`, {
                ...taskToUpdate,
                lockStatus: !currentStatus,
            });
    
            console.log("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
    
            // ❌ Rollback UI update if request fails
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, lockStatus: currentStatus } : task
                )
            );
    
            alert("Error updating task. Please try again.");
        }
    };


    return (
        <TaskContext.Provider value={{ tasks, setTasks, users, selectedAssignees, assignUsersToTask, toggleTaskCompletion, toggleLockCompletion }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
