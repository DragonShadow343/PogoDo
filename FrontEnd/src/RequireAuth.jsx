import React from 'react'
import { Navigate } from 'react-router-dom';

const RequireAuth = ({children, allowedRoles}) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        return <Navigate to='/login' />
    }

    if (!allowedRoles.includes(loggedInUser.role)){
        return <Navigate to='/home' />
    }

    return children;
}

export default RequireAuth
