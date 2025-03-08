import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedUser = sessionStorage.getItem("loggedInUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    useEffect(() => {
        console.log(auth)
        if (auth) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(auth));
        } else {
            sessionStorage.removeItem("loggedInUser");
        }
    }, [auth]);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;