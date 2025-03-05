import React from "react";

const TeamMembers = () => {
  const members = [
    { id: 1, name: "Alice Johnson", role: "Developer" },
    { id: 2, name: "Mark Lee", role: "Designer" },
    // { id: 3, name: "Krish K", role: "Developer" },
  ];

  return (
    <div className="p-4 rounded-lg shadow-[0px_5px_15px_#d9d6d4] bg-[#FFFCF9]">
      <h2 className="font-bold text-lg">Team Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id} className="mb-2 p-2 rounded border-b-1 border-[#ebe8e5]">
            <p><strong>{member.name}</strong></p>
            <p className="text-sm text-gray-600">{member.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
