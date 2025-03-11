import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './context/AuthProvider';

const RequireAuth = ({ children, allowedRoles }) => {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        console.log("Redirecting to login - No auth found.");
        return <Navigate to='/login' replace />;
    }

    if (!auth.role || !allowedRoles.includes(auth.role)) {
        if (auth.role === 'admin') {
            return <Navigate to='/admin' replace />;
        } else if (auth.role === 'user') {
            return <Navigate to='/user' replace />;
        } else {
            return <Navigate to='/home' replace />;
        }
    }

    return children;
};

export default RequireAuth;
