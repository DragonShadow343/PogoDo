import React from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem('loggedInUser');
        navigate('/home');
    }

  return (
    <div>
        <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default LogoutBtn;
