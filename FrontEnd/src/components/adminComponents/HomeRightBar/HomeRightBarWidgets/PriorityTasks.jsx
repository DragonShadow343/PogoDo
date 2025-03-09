import React, { useContext } from "react";
import CompletedButton from "../../../universalComponents/UIComponents/CompletedButton";
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
              <CompletedButton taskID={task.id} taskCompleted={task.completed} taskPriority={task.priority} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PriorityTasks;
