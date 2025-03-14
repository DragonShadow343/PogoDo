import React, {useContext} from 'react'
import TaskContext from "./../../../context/TaskProvider"
import AuthContext from "./../../../context/AuthProvider"
import { FiLock, FiUnlock } from "react-icons/fi";


const LockButton = ({ taskID, taskLocked, taskPriority }) => {
    const { toggleLockCompletion } = useContext(TaskContext);
    const { auth } = useContext(AuthContext);
    
  return (
    <button
        onClick={() => toggleLockCompletion(taskID, taskLocked)} // Pass both taskID and current status
        className={`px-3 py-1 rounded text-black hover:cursor-pointer ${auth.role != "admin"? "hidden" : "block"}`}>
        {taskLocked? <FiLock /> : <FiUnlock />}
    </button>
  )
}

export default LockButton
