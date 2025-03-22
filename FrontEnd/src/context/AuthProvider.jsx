import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedUser = sessionStorage.getItem("loggedInUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const logout = async () => {
        // try {
        //     // Optional: Notify the backend (only if using sessions or blacklisting JWTs)
        //     await axios.post("http://localhost:3500/logout", {}, { withCredentials: true });
        // } catch (error) {
        //     console.error("Logout failed:", error);
        // }

        // Clear authentication state
        setAuth(null); // Fix: Change setUser(null) → setAuth(null)

        // Remove stored user data from sessionStorage
        sessionStorage.removeItem("loggedInUser"); // Fix: Remove correct storage key
    };

    useEffect(() => {
        if (auth) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(auth));
        } else {
            sessionStorage.removeItem("loggedInUser");
        }
    }, [auth]);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;