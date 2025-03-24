import { useState, useRef, useEffect } from "react";

const AssigneeDropdown = ({ availableMembers, assignedMembers, onAssign, isOpen, toggleDropdown }) => {
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [positionAbove, setPositionAbove] = useState(false);

    useEffect(() => {
        if (isOpen && dropdownRef.current && buttonRef.current) {
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - buttonRect.bottom;
            const dropdownHeight = dropdownRect.height;
            setPositionAbove(spaceBelow < dropdownHeight);
        }
    }, [isOpen]);

    const handleCheckboxChange = (userId) => {
        if (assignedMembers.includes(userId)) {
            onAssign(assignedMembers.filter((id) => id !== userId)); // Remove userId
        } else {
            onAssign([...assignedMembers, userId]); // Add userId
        }
    };

    return (
        <div className="relative">
            <button ref={buttonRef} onClick={toggleDropdown} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Assign Members ▼
            </button>

            {isOpen && (
                <div ref={dropdownRef} className={`absolute bg-white border shadow-md w-48 rounded-md z-10 ${positionAbove ? "bottom-full mb-2" : "top-full mt-2"}`}>
                    {availableMembers.map((member) => (
                        <label key={member.userId} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <input
                                type="checkbox"
                                value={member.userId}
                                checked={assignedMembers.includes(member.userId)}
                                onChange={() => handleCheckboxChange(member.userId)}
                                className="mr-2"
                            />
                            {member.username}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssigneeDropdown;
