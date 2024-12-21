"use client"
import { createContext, useState, useEffect, useContext } from 'react';

const Context = createContext();
export const useAuth = () => {
    return useContext(Context);
};

export const Provider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const res = await fetch(process.env.BASE_URL+'/api/me' , { method: 'GET' });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }

            setIsLoading(false);
        };

        checkUserLoggedIn();
    }, []);


    const value = {
        user,
        isLoggedIn: !!user,
        isLoading,
        setUser
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};