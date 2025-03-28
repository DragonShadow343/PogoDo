import { useState, useRef, useEffect } from "react";
import { FiUserPlus } from "react-icons/fi"; // Import the plus icon


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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                toggleDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleDropdown]);

    const handleCheckboxChange = (userId) => {
        if (assignedMembers.includes(userId)) {
            onAssign(assignedMembers.filter((id) => id !== userId)); // Remove userId
        } else {
            onAssign([...assignedMembers, userId]); // Add userId
        }
    };

    return (
        <div className="relative">
            <button ref={buttonRef} onClick={toggleDropdown} className="px-2 py-1 rounded hover:cursor-pointer transition-bg duration-75 hover:bg-[rgba(0,0,0,0.1)]">
                <FiUserPlus />
            </button>

            {isOpen && (
                <div ref={dropdownRef} className={`absolute bg-white border shadow-md w-56 rounded-md z-10 h-64 overflow-scroll ${positionAbove ? "bottom-full mb-2" : "top-full mt-2"}`}>
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
