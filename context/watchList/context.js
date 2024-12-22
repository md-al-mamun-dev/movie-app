"use client"
import { createContext, useState, useContext } from 'react';

const Context = createContext();

export const useWatchListStore = () => {
    return useContext(Context);
};

export const Provider = ({ children }) => {
    const [info, setInfo] = useState({
                                        isLoading: false,
                                        isError: false,
                                        data: [],
                                        error: null,
                                    });

    const value =   {
                        info,
                        setInfo,
                    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};