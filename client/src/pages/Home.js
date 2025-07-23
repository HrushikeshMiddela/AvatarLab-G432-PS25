import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Navbar } from '../components/Navbar';
// import { Button } from '../components/ui/button';
// import { useAuth } from '../auth/AuthContext';
// import { ArrowRight } from 'lucide-react';
// export const HomePage: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [scrolled, setScrolled] = useState(false);
//   const handleGetStarted = () => {
//     if (user) {
//       navigate('/create');
//     } else {
//       navigate('/login');
//     }
//   };
//   return (
//     <div className="min-h-screen bg-black text-white relative">
//       {/* Enhanced gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
//       <Navbar scrolled={scrolled} />
//       <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-screen px-6 md:px-12 lg:px-16 gap-12 items-center max-w-7xl mx-auto">
//         {/* Left Content */}
//         <div className="flex flex-col justify-center pt-20 md:pt-0">
//           <div className="space-y-8">
//             <div className="space-y-2">
//               <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display">
//                 Create
//               </h1>
//               <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display">
//                 Your Own
//               </h1>
//               <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold italic tracking-tight text-blue-600 font-display">
//                 Digital Twin
//               </h2>
//             </div>
//             <p className="text-2xl md:text-3xl text-gray-300 max-w-xl leading-relaxed">
//              An Avatar That Looks and
//               <span className="font-medium"> Acts Like You!</span>
//             </p>
//             <Button
//               onClick={handleGetStarted}
//               className="group bg-blue-600 hover:bg-blue-700 text-white 
//                        px-8 py-4 mt-6 rounded-xl text-xl font-medium 
//                        transition-all duration-300 
//                        shadow-lg shadow-blue-500/20 
//                        flex items-center gap-3 w-fit"
//             >
//               Get Started
//               <ArrowRight className="group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </div>
//         </div>
//         {/* Right Content - Image */}
//         <div className="relative h-full w-full flex items-center justify-center">
//           <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 md:hidden" />
//           <div className="relative w-full max-w-2xl mx-auto">
//             {/* Decorative elements */}
//             <div className="absolute -inset-1 bg-blue-500/20 rounded-3xl blur-xl" />
//             <div className="absolute -inset-2 bg-blue-600/10 rounded-3xl blur-2xl" />
//             {/* Image container */}
//             <div className=" m-3 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm margin-40">
//               <img 
//                 // src="src\assets\images\neil-avatar.png" // Place your image here
//                 src="src\assets\images\ChatGPT Image Jun 9, 2025, 03_58_09 PM.png" // Place your image here
//                 alt="AI Avatar Demo"
//                 // className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/button';
import { useAuth } from '../auth/AuthContext';
import { ArrowRight } from 'lucide-react';
export const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const handleGetStarted = () => {
        if (user) {
            navigate('/dashboard'); // Redirect to dashboard if user is logged in
        }
        else {
            navigate('/login');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-black text-white relative", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" }), _jsx(Navbar, { scrolled: scrolled }), _jsxs("div", { className: "relative grid grid-cols-1 md:grid-cols-2 min-h-screen px-6 md:px-12 lg:px-16 gap-12 items-center max-w-7xl mx-auto", children: [_jsx("div", { className: "flex flex-col justify-center pt-20 md:pt-0", children: _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h1", { className: "text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display", children: "Create" }), _jsx("h1", { className: "text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display", children: "Your Own" }), _jsx("h2", { className: "text-6xl md:text-7xl lg:text-8xl font-bold italic tracking-tight text-blue-600 font-display", children: "Digital Twin" })] }), _jsxs("p", { className: "text-2xl md:text-3xl text-gray-300 max-w-xl leading-relaxed", children: ["An Avatar That Looks and", _jsx("span", { className: "font-medium", children: " Acts Like You!" })] }), _jsxs(Button, { onClick: handleGetStarted, className: "group bg-blue-600 hover:bg-blue-700 text-white \r\n                       px-8 py-4 mt-6 rounded-xl text-xl font-medium \r\n                       transition-all duration-300 \r\n                       shadow-lg shadow-blue-500/20 \r\n                       flex items-center gap-3 w-fit", children: ["Get Started", _jsx(ArrowRight, { className: "group-hover:translate-x-1 transition-transform" })] })] }) }), _jsxs("div", { className: "relative h-full w-full flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 md:hidden" }), _jsxs("div", { className: "relative w-full max-w-2xl mx-auto", children: [_jsx("div", { className: "absolute -inset-1 bg-blue-500/20 rounded-3xl blur-xl" }), _jsx("div", { className: "absolute -inset-2 bg-blue-600/10 rounded-3xl blur-2xl" }), _jsx("div", { className: "m-3 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm margin-40 cursor-pointer", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: _jsx("img", { src: isHovered ? "src/assets/57-18d7158d-unscreen.gif" : "src/assets/images/ChatGPT Image Jun 9, 2025, 03_58_09 PM.png", alt: "AI Avatar Demo", className: "w-full h-full object-cover transition-all duration-300" }) })] })] })] })] }));
};
