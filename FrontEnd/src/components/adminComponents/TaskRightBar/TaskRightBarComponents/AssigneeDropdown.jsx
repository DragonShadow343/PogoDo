import { useState } from "react";

const AssigneeDropdown = ({ availableMembers, assignedMembers, onAssign, isOpen, toggleDropdown }) => {
    const handleCheckboxChange = (member) => {
        if (assignedMembers.includes(member)) {
            onAssign(assignedMembers.filter((m) => m !== member)); // Remove member
        } else {
            onAssign([...assignedMembers, member]); // Add member
        }
    };

    return (
        <div className="relative">
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Assign Members ▼
            </button>

            {/* Dropdown List */}
            {isOpen && (
                <div className="absolute bg-white border mt-2 shadow-md w-48 rounded-md z-10">
                    {availableMembers.map((member) => (
                        <label
                            key={member}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={assignedMembers.includes(member)}
                                onChange={() => handleCheckboxChange(member)}
                                className="mr-2"
                            />
                            {member}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssigneeDropdown;
