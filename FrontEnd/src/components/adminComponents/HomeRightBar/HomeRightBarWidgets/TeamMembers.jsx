import React from "react";

const TeamMembers = () => {
  const members = [
    { id: 1, name: "Alice Johnson", role: "Developer" },
    { id: 2, name: "Mark Lee", role: "Designer" },
    // { id: 3, name: "Krish K", role: "Developer" },
  ];

  return (
    <div className="border-2 p-4 rounded-lg shadow-md bg-white">
      <h2 className="font-bold text-lg">Team Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id} className="mb-2 p-2 border-b">
            <p><strong>{member.name}</strong></p>
            <p className="text-sm text-gray-600">{member.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
