import { createContext, useState } from "react";

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Complete report", priority: 3, completed: false, assignedTo: [] },
        { id: 2, title: "Update dashboard UI", priority: 2, completed: false, assignedTo: [] },
        { id: 3, title: "Code review for PR #34", priority: 3, completed: false, assignedTo: [] },
        { id: 4, title: "Fix login bug", priority: 1, completed: true, assignedTo: [] }
    ]);

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
