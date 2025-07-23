import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { HomePage } from './pages/Home';
import { CreatePage } from './pages/Create';
import HeygenPage from "./pages/HeygenPage";
import { PostLoginDashboard } from './pages/Dashboard'; // Import the new component
import HistoryDisplay from './pages/History';
// import Lenis from '@studio-freight/lenis';
function App() {
    // useEffect(() => {
    //   const lenis = new Lenis({
    //     duration: 1.2,
    //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://easings.net
    //     orientation: 'vertical', // or 'horizontal'
    //     gestureOrientation: 'vertical', // or 'horizontal', or 'both'
    //     smoothWheel: true,
    //     smoothTouch: false,
    //     wheelMultiplier: 1,
    //     touchMultiplier: 2,
    //     infinite: false,
    //   });
    //   function raf(time: DOMHighResTimeStamp) {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    //   }
    //   requestAnimationFrame(raf);
    //   return () => {
    //     lenis.destroy();
    //   };
    // }, []);
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/history", element: _jsx(HistoryDisplay, { API_BASE_URL: "http://localhost:5000" }) }), _jsx(Route, { path: "/create", element: _jsx(CreatePage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(PostLoginDashboard, {}) }), " ", _jsx(Route, { path: "/heygen", element: _jsx(HeygenPage, {}) }), " "] }) }) }));
}
export default App;
