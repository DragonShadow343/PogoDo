import React, { useContext } from "react";
import TaskContext from "../../../../context/TaskProvider";
import CompletedButton from "../../../universalComponents/UIComponents/CompletedButton";

const AllTasks = () => {
  const { tasks, toggleTaskCompletion } = useContext(TaskContext);

  return (
    <div className=" p-4 rounded-lg shadow-[0px_5px_15px_#d9d6d4] bg-[#FFFCF9]">
      <h2 className="font-bold text-lg mb-2">All Tasks</h2>
      <ul className="overflow-scroll max-h-[60vh] no-scrollbar">
        {tasks.map(task => (
            <li key={task.id} className="flex justify-between items-center p-2 bg-white my-2 rounded border-b-1 border-[#ebe8e5]">
                <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
                <CompletedButton taskID={task.id} taskCompleted={task.completed}/>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
