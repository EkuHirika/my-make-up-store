import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("userData");

    if (token && savedUser) {
        try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
    }
    }
    }, []);
    
    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
