import React, {useContext} from 'react'
import TaskContext from "./../../../context/TaskProvider"
import AuthContext from "./../../../context/AuthProvider"
import { FiLock, FiUnlock } from "react-icons/fi";


const LockButton = ({ taskID, taskLocked, taskPriority }) => {
    const { toggleLockCompletion } = useContext(TaskContext);
    
  return (
    <button
        onClick={() => toggleLockCompletion(taskID, taskLocked)} // Pass both taskID and current status
        className="px-2 py-1 rounded hover:cursor-pointer transition-bg duration-75 hover:bg-[rgba(0,0,0,0.1)]">
        {taskLocked? <FiLock /> : <FiUnlock />}
    </button>
  )
}

export default LockButton
