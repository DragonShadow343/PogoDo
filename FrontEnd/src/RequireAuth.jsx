import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './context/AuthProvider';

const RequireAuth = ({ children, allowedRoles }) => {
    const { auth } = useContext(AuthContext);

    console.log("RequireAuth - Auth Context:", auth); // Debugging

    if (!auth) {
        console.log("Redirecting to login - No auth found.");
        return <Navigate to='/login' replace />;
    }

    if (!auth.role || !allowedRoles.includes(auth.role)) {
        console.log("Redirecting to home - Unauthorized role:", auth.role);
        return <Navigate to='/home' replace />;
    }

    return children;
};

export default RequireAuth;
