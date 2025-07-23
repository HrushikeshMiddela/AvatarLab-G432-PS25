import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Button } from './ui/button';
export const Navbar = ({ scrolled }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    // Modified logout handler to ensure navigation happens after logout
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const isActivePage = (path) => location.pathname === path;
    return (_jsx("nav", { className: `
        fixed top-4 left-1/2 transform -translate-x-1/2 
        w-[calc(100%-2rem)] max-w-screen-xl mx-auto z-50 
        px-6 py-4 rounded-xl transition-all duration-300
        ${scrolled ? "bg-black/70 backdrop-blur-md border border-white/10" : "bg-transparent"} 
      `, children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Link, { to: "/", className: "text-2xl font-bold text-white font-display tracking-tight hover:text-blue-400 transition-colors", children: "AI Avatar Lab" }), _jsx("div", { className: "flex items-center space-x-6", children: user ? (_jsxs(_Fragment, { children: [_jsxs(Link, { to: "/dashboard", className: "relative group px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all duration-300", children: [_jsx("span", { className: `text-sm font-medium ${isActivePage('/dashboard')
                                            ? 'text-blue-400'
                                            : 'text-gray-300 group-hover:text-blue-400'} transition-colors`, children: "Dashboard" }), isActivePage('/dashboard') && (_jsx("span", { className: "absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full transform -translate-x-1/2" }))] }), _jsxs("div", { className: "flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all duration-300 group", children: [_jsx(User, { size: 18, className: "text-gray-400 group-hover:text-blue-400" }), _jsx("span", { className: "text-sm text-white font-medium", children: user.name })] }), _jsx(Button, { onClick: handleLogout, variant: "ghost", className: "p-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300", children: _jsx(LogOut, { size: 18, className: "text-gray-400 group-hover:text-blue-400" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs(Link, { to: "/login", className: "relative group px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all duration-300", children: [_jsx("span", { className: `text-sm font-medium ${isActivePage('/login')
                                            ? 'text-blue-400'
                                            : 'text-gray-300 group-hover:text-blue-400'} transition-colors`, children: "Login" }), isActivePage('/login') && (_jsx("span", { className: "absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full transform -translate-x-1/2" }))] }), _jsx(Button, { asChild: true, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25", children: _jsx(Link, { to: "/register", children: "Register" }) })] })) })] }) }));
};
