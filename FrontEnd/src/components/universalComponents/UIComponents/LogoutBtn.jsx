import React, {useContext} from 'react'
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AuthContext from "./../../../context/AuthProvider";

const LogoutBtn = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);


    const handleLogout = () => {
        logout(); // Call the logout function from the AuthContext
        navigate("/Home");
    }
    
    return (
        <button className='flex items-center gap-2 p-2 cursor-pointer' onClick={handleLogout}>
            <FaRegArrowAltCircleLeft className="text-lg" />
            <span>Logout</span>
        </button>
    )
}

export default LogoutBtn
