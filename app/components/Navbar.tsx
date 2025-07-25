// import { FaTachometerAlt, FaVideo, FaLayerGroup, FaExclamationTriangle, FaUser } from 'react-icons/fa';
// import React from 'react';

// export default function Navbar() {
//   return (
//     <nav className="bg-[#1A2A47] px-8 py-3 flex items-center justify-between shadow-md">
//       {/* Logo and Brand */}
//       <div className="flex items-center space-x-3">
//         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-[#1A2A47] text-lg">M</div>
//         <span className="text-white text-xl font-bold tracking-wide">MANDLACX</span>
//       </div>
//       {/* Navigation icons */}
//       <div className="flex items-center space-x-8">
//         <button className="flex flex-col items-center text-yellow-400 focus:outline-none">
//           <FaTachometerAlt size={20} />
//           <span className="text-xs mt-1">Dashboard</span>
//         </button>
//         <button className="flex flex-col items-center text-white focus:outline-none">
//           <FaVideo size={20} />
//           <span className="text-xs mt-1">Cameras</span>
//         </button>
//         <button className="flex flex-col items-center text-white focus:outline-none">
//           <FaLayerGroup size={20} />
//           <span className="text-xs mt-1">Scenes</span>
//         </button>
//         <button className="flex flex-col items-center text-white focus:outline-none">
//           <FaExclamationTriangle size={20} />
//           <span className="text-xs mt-1">Incidents</span>
//         </button>
//         <button className="flex flex-col items-center text-white focus:outline-none">
//           <FaUser size={20} />
//           <span className="text-xs mt-1">Users</span>
//         </button>
//       </div>
//       {/* User info */}
//       <div className="flex items-center space-x-3">
//         <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-9 h-9 rounded-full border-2 border-white" />
//         <div className="flex flex-col text-right">
//           <span className="text-white text-sm font-semibold">User Name</span>
//           <span className="text-blue-200 text-xs">user@email.com</span>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { FaTachometerAlt, FaVideo, FaLayerGroup, FaExclamationTriangle, FaUser } from 'react-icons/fa';
import React from 'react';

const navItems = [
  { icon: <FaTachometerAlt size={16} />, label: 'Dashboard' },
  { icon: <FaVideo size={16} />, label: 'Cameras' },
  { icon: <FaLayerGroup size={16} />, label: 'Scenes' },
  { icon: <FaExclamationTriangle size={16} />, label: 'Incidents' },
  { icon: <FaUser size={16} />, label: 'Users' },
];

export default function Navbar() {
  return (
    <nav className="bg-black px-8 py-3 flex items-center justify-between shadow-md">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-black text-lg">M</div>
        <span className="text-white text-xl font-bold tracking-wide">MANDLACX</span>
      </div>
      {/* Navigation icons */}
      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <button key={item.label} className="flex items-center text-white text-sm space-x-2 focus:outline-none">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      {/* User info */}
      <div className="flex items-center space-x-3">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-9 h-9 rounded-full border-2 border-white" />
        <div className="flex flex-col text-right">
          <span className="text-white text-sm font-semibold">User Name</span>
          <span className="text-gray-400 text-xs">user@email.com</span>
        </div>
      </div>
    </nav>
  );
}