import React, { useContext } from "react";
import TaskContext from "../../../../context/TaskProvider";

const PriorityTasks = () => {
  const { tasks, toggleTaskCompletion } = useContext(TaskContext);

  return (
    <div className="p-4 border rounded-lg shadow-[0px_5px_15px_rgba(197,25,25,0.3)] bg-red-100">
      <h2 className="text-xl font-bold mb-2">Priority Tasks</h2>
      <ul>
        {tasks
          .filter(task => task.priority === 3)
          .map(task => (
            <li key={task.id} className="flex justify-between items-center p-2 bg-white my-2 rounded shadow">
              <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
              <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`px-3 py-1 rounded text-white ${task.completed ? "bg-[#06D6A0]" : "bg-[#EF476F]"}`}>
                  {task.completed ? "Completed" : "Mark Done"}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PriorityTasks;
