// import React, { useState } from "react";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { Link, Navigate, NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../../store/auth-slice"; // Adjust path as needed
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const user = useSelector((state) => state.auth.user);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     dispatch(logoutUser());
//     toast.success("Logged out successfully!");
//     navigate("/login");
//   };

//   return (
//     <header className="sticky z-10 text-white shadow-lg bg-cyan-950/100">
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <div className="flex">
//           <img
//             src="src/assets/HomeImages/Logo.png"
//             alt="Rental Car Logo"
//             className="w-[110px] pl-3"
//           />
//         </div>

//         {/* Navigation Links (Desktop) */}
//         <nav className="items-center hidden md:flex gap-x-8">
//           {[
//             { to: "/", label: "Home" },
//             { to: "/explore", label: "Explore Cars" },
//             { to: "/about", label: "About Us" },
//             { to: "/contact", label: "Contact" },
//             { to: "/reviews", label: "Reviews" },
//           ].map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               className={({ isActive }) =>
//                 `transition duration-200 ${
//                   isActive
//                     ? "text-yellow-300 underline underline-offset-4"
//                     : "hover:text-yellow-300"
//                 }`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Profile or Login */}
//         <div className="flex items-center space-x-4">
//           {isAuthenticated ? (
//             <div className="relative">
//               <div
//                 className="flex items-center cursor-pointer"
//                 onClick={() => setIsDropdownOpen((prev) => !prev)}
//               >
//                 {user?.photo ? (
//                   <img
//                     src={user.photo}
//                     alt="User Profile"
//                     className="w-10 h-10 border border-gray-300 rounded-full"
//                   />
//                 ) : (
//                   <FaUserCircle size={40} className="text-gray-300" />
//                 )}
//               </div>

//               {/* Dropdown Menu */}
//               {isDropdownOpen && (
//                 <div className="absolute right-0 w-48 mt-2 text-black bg-white rounded-lg shadow-lg">
//                   <Link
//                     to="/user"
//                     className="block px-4 py-2 text-sm hover:bg-gray-200"
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login">
//               <button className="px-4 py-2 text-white transition bg-yellow-600 rounded-md hover:bg-yellow-700">
//                 Login
//               </button>
//             </Link>
//           )}
//           {/* Mobile Menu Icon */}
//           <div
//             className="text-2xl cursor-pointer md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <FaTimes /> : <FaBars />}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <nav className="text-white bg-black bg-opacity-20 md:hidden">
//           <ul className="flex flex-col items-center py-6 space-y-6">
//             {[
//               { to: "/", label: "Home" },
//               { to: "/explore", label: "Explore Cars" },
//               { to: "/about", label: "About Us" },
//               { to: "/contact", label: "Contact" },
//               { to: "/reviews", label: "Reviews" },
//             ].map((link) => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 className={({ isActive }) =>
//                   `text-lg transition ${
//                     isActive
//                       ? "text-yellow-300 underline underline-offset-4"
//                       : "hover:text-yellow-300"
//                   }`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 text-white transition bg-red-600 rounded-md hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link to="/login">
//                 <button className="px-4 py-2 transition bg-yellow-600 rounded-md text-white-700 hover:bg-yellow-700">
//                   Login
//                 </button>
//               </Link>
//             )}
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// }

// export default Header;
import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, Navigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth-slice"; // Adjust path as needed
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleDashboardNavigation = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <header className="sticky z-10 text-white shadow-lg bg-gradient-to-r from-cyan-900 to-blue-900">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex">
          <img
            src="src/assets/HomeImages/Logo.png"
            alt="Rental Car Logo"
            className="w-[110px] pl-3"
          />
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="items-center hidden md:flex gap-x-8">
          {[
            { to: "/", label: "Home" },
            { to: "/explore", label: "Explore Cars" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact" },
            { to: "/reviews", label: "Reviews" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition duration-200 ${
                  isActive
                    ? "text-yellow-300 underline underline-offset-4"
                    : "hover:text-yellow-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Profile or Login */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt="User Profile"
                    className="w-10 h-10 border border-gray-300 rounded-full"
                  />
                ) : (
                  <FaUserCircle size={40} className="text-gray-300" />
                )}
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 text-black bg-white rounded-lg shadow-lg">
                  <button
                    onClick={handleDashboardNavigation}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 text-white transition bg-yellow-600 rounded-md hover:bg-yellow-700">
                Login
              </button>
            </Link>
          )}
          {/* Mobile Menu Icon */}
          <div
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="text-white bg-black bg-opacity-20 md:hidden">
          <ul className="flex flex-col items-center py-6 space-y-6">
            {[
              { to: "/", label: "Home" },
              { to: "/explore", label: "Explore Cars" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
              { to: "/reviews", label: "Reviews" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-lg transition ${
                    isActive
                      ? "text-yellow-300 underline underline-offset-4"
                      : "hover:text-yellow-300"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white transition bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 transition bg-yellow-600 rounded-md text-white-700 hover:bg-yellow-700">
                  Login
                </button>
              </Link>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
