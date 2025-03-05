import React from "react";

const PriorityTasks = () => {
  const priorityTasks = [
    { id: 1, title: "Fix security vulnerabilities", dueDate: "Mar 5" },
    { id: 2, title: "Prepare weekly team report", dueDate: "Mar 7" },
  ];

  return (
    <div className="border-2 p-4 rounded-lg shadow-md bg-white">
      <h2 className="font-bold text-lg">Priority Tasks</h2>
      <ul>
        {priorityTasks.map((task) => (
          <li key={task.id} className="mb-2 p-2 border-b">
            <p><strong>{task.title}</strong></p>
            <p className="text-sm text-red-600">Due: {task.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriorityTasks;
