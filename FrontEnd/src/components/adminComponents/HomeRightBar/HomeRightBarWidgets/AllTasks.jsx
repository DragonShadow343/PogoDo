import React from "react";

const AllTasks = () => {
  const tasks = [
    { id: 1, title: "Update dashboard UI", status: "Pending" },
    { id: 2, title: "Review team reports", status: "In Progress" },
    { id: 3, title: "Fix API authentication", status: "Completed" },
    { id: 4, title: "Fix security vulnerabilities", status: "Pending" },
    { id: 5, title: "Prepare weekly team report", status: "Pending" },
    { id: 6, title: "Update dashboard UI", status: "Pending" },
    { id: 7, title: "Review team reports", status: "In Progress" },
    { id: 8, title: "Fix API authentication", status: "Completed" },
    { id: 9, title: "Fix security vulnerabilities", status: "Pending" },
    { id: 10, title: "Prepare weekly team report", status: "Pending" },
  ];

  return (
    <div className="border-2 p-4 rounded-lg shadow-md bg-white">
      <h2 className="font-bold text-lg mb-2">All Tasks</h2>
      <ul className="overflow-scroll max-h-[60vh] no-scrollbar">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 p-2 border-b">
            <p><strong>{task.title}</strong></p>
            <p className={`text-sm ${task.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
              {task.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
