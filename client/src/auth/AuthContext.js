import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect, useContext } from 'react';
import { api } from '../api';
// Import types
const AuthContext = React.createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);
    const login = async (email, password) => {
        const userData = await api.login(email, password);
        setUser(userData);
    };
    const register = async (name, email, password) => {
        const userData = await api.register(name, email, password);
        setUser(userData);
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        // Navigate to the home page after logout
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, register, logout, loading }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
