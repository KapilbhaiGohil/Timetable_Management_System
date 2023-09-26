import React, { createContext, useState } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    isLoading:false,
    setIsLoading:()=>{}
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,isLoading,setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
