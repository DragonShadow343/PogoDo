import React, { useContext } from "react";
import TaskContext from "../../../../context/TaskProvider";

const ProgressBar = () => {
  const { tasks } = useContext(TaskContext);

  const taskLength = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const progress = parseInt(completedTasks/taskLength*100);

  return (
    <div className="p-4 rounded-lg shadow-[0px_5px_15px_#d9d6d4] bg-[#FFFCF9]">
      <div className="flex justify-between">
        <h2 className="py-1 font-bold text-lg">My Progress</h2>
      </div>
      <div>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div className={`${(progress != 100) ? "bg-blue-600" : "bg-[#06D6A0]"} h-4 rounded-full transition-all duration-500`} style={{ width: `${progress || 0}%`}}></div>
        </div>
        {progress 
        ? (<p className="text-sm text-gray-600 mt-2">{progress}% completed</p>)
        : (<p className="text-sm text-gray-600 mt-2">No Tasks Assigned</p>)
        }
      </div>
    </div>
  );
};

export default ProgressBar;
