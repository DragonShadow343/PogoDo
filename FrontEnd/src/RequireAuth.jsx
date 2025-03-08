import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from './context/AuthProvider';

const RequireAuth = ({children, allowedRoles}) => {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        return <Navigate to='/login' replace/>
    }

    if (!allowedRoles.includes(auth.role)){
        return <Navigate to='/home' replace/>
    }

    return children;
}

export default RequireAuth
