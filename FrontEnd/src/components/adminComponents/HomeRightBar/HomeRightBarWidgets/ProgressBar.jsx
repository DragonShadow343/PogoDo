import React from "react";

const ProgressBar = () => {
  const progress = 70; // Example: 70% progress

  return (
    <div className="border-2 p-4 rounded-lg shadow-md bg-white">
      <h2 className="font-bold text-lg">Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{progress}% completed</p>
    </div>
  );
};

export default ProgressBar;
