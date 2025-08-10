import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../assets/Logo.png";
import { FaUser } from "react-icons/fa";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { RiAlignItemBottomFill } from "react-icons/ri";
import { TiDocumentAdd } from "react-icons/ti";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { Moon, Sun, User } from "lucide-react";
import ThemeContext from "../../Provider/ThemeProvider/ThemeContext";

const Navbar = () => {
   // get theme control from Theme Context
   const { theme, toggleTheme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   const linkStyle = darkMode ? "text-gray-400" : "text-gray-700";

   const navigate = useNavigate();
   const { user, logOut, jwtReady } = useContext(AuthContext);

   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      if (!user || !jwtReady) return;

      const fetchUserData = async () => {
         try {
            const res = await axios.get(
               `${import.meta.env.VITE_serverUrl}/users/?email=${user.email}`,
               { withCredentials: true }
            );

            if (res.data) {
               setCurrentUser(res.data);
            }
         } catch (err) {
            console.error("User fetch error:", err.message);
         }
      };

      fetchUserData();
   }, [user, jwtReady]);

   const handelLogOut = () => {
      logOut()
         .then(() => {
            Swal.fire({
               title: "logout successfully",
               icon: "success",
               draggable: true,
            });
         })
         .catch((error) => {
            Swal.fire({
               title: "Failed to logout",
               html: `<p className='swal-text'>${error.message}</p>`,
               icon: "error",
               draggable: true,
            });
         });
   };

   const navbarLinks = (
      <>
         <li>
            <NavLink
               to={"/"}
               className={
                  "!font-nunito px-4 py-0.5 rounded-lg hover:text-primary"
               }
            >
               Home
            </NavLink>
         </li>
         <li>
            <NavLink
               to={`./allItems`}
               className={
                  "!font-nunito px-4 py-0.5 rounded-lg hover:text-primary"
               }
            >
               Lost & Found Items
            </NavLink>
         </li>
         <li>
            <NavLink
               to={`./tips`}
               className={
                  "!font-nunito px-4 py-0.5 rounded-lg hover:text-primary"
               }
            >
               Safety Tips
            </NavLink>
         </li>
         <li>
            <NavLink
               to={`./about-us`}
               className={
                  "!font-nunito px-4 py-0.5 rounded-lg hover:text-primary"
               }
            >
               About Us
            </NavLink>
         </li>
         <li>
            <NavLink
               to={`./contact-us`}
               className={
                  "!font-nunito px-4 py-0.5 rounded-lg hover:text-primary"
               }
            >
               Contact Us
            </NavLink>
         </li>
      </>
   );

   const dpdNavLinks = (
      <>
         <li className="!px-2">
            <NavLink
               to={`./user-profile`}
               className={`!font-source-serif4 mt-2 mb-1 gap-3 hover:text-primary !py-2.5 rounded-lg ${linkStyle}`}
            >
               <User className="w-5 h-5" />
               View Profile
            </NavLink>
         </li>
         <li className="!px-2">
            <NavLink
               to={`./update-profile`}
               className={`!font-source-serif4 mb-1 gap-3 hover:text-primary !py-2.5 rounded-lg ${linkStyle}`}
            >
               <RiDeviceRecoverLine className="text-xl" />
               Update Profile
            </NavLink>
         </li>
         <li className="!px-2">
            <NavLink
               to={`./addItems`}
               className={`!font-source-serif4 mb-1 gap-3 hover:text-primary !py-2.5 rounded-lg ${linkStyle}`}
            >
               <TiDocumentAdd className="text-xl" />
               Add Lost Items
            </NavLink>
         </li>
         <li className="!px-2">
            <NavLink
               to={`./allRecovered`}
               className={`!font-source-serif4 mb-1 gap-3 hover:text-primary !py-2.5 rounded-lg ${linkStyle}`}
            >
               <RiDeviceRecoverLine className="text-xl" />
               All Recovered Items
            </NavLink>
         </li>
         <li
            className={`!px-2 border-b  pb-2 mb-2 ${
               darkMode ? "border-gray-700" : "border-gray-100"
            }`}
         >
            <NavLink
               to={`./myItems`}
               className={`!font-source-serif4 gap-3 hover:text-primary !py-2.5 rounded-lg ${linkStyle}`}
            >
               <RiAlignItemBottomFill className="text-xl" />
               Manage My Items
            </NavLink>
         </li>
      </>
   );

   return (
      <div className=" bg-[#032851] shadow-sm py-5">
         <div className="container mx-auto navbar items-center">
            <div className="flex-1 flex gap-2">
               <div className="hidden lg:flex">
                  <Link className="">
                     <img src={Logo} alt="" className="w-44" />
                  </Link>
               </div>
               <div className="dropdown">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost lg:hidden border-gray-100"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                     >
                        {" "}
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M4 6h16M4 12h8m-8 6h16"
                        />{" "}
                     </svg>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                     {navbarLinks}
                  </ul>
               </div>
            </div>

            <div className="flex items-center gap-8">
               <ul className="menu menu-horizontal px-1 text-lg font-medium text-gray-100 gap-1 items-center hidden lg:flex">
                  {navbarLinks}
               </ul>

               {/* Toggle theme control */}
               <button
                  onClick={() => toggleTheme()}
                  className={`p-2 rounded-lg transition-colors text-gray-400`}
               >
                  {darkMode ? <Sun size={27} /> : <Moon size={27} />}
               </button>

               {/* User login section */}
               <div className="flex items-center gap-5">
                  {user ? (
                     <div className="dropdown dropdown-end group relative">
                        <div
                           tabIndex={0}
                           role="button"
                           className="btn btn-ghost btn-circle avatar w-13 h-13 "
                        >
                           <div className="w-20 rounded-full ring-2 ring-[#545f72]">
                              <img
                                 alt="user_image"
                                 src={currentUser && currentUser.photo}
                                 data-tooltip-id="my-tooltip"
                                 data-tooltip-content={
                                    currentUser && currentUser.name
                                 }
                              />
                           </div>
                        </div>
                        <Tooltip id="my-tooltip" className="z-50 text-sm" />
                        <ul
                           tabIndex={0}
                           className={`menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 min-w-72 p-0 pb-2 shadow font-medium top-[62px]  border border-t-0 origin-top !scale-x-100 !scale-y-0 group-focus-within:!scale-y-100 !block !transition-all !duration-600 ${
                              darkMode ? "border-gray-800" : "border-gray-100"
                           }`}
                        >
                           <div
                              className={`p-4 border-b ${
                                 darkMode
                                    ? "border-gray-700"
                                    : "border-gray-100"
                              }`}
                           >
                              <div className="flex items-center space-x-3">
                                 {currentUser?.photo ? (
                                    <img
                                       src={currentUser?.photo}
                                       alt={currentUser?.name || "User"}
                                       className={`w-12 h-12 rounded-full object-cover border-2  ${
                                          darkMode
                                             ? "border-gray-600"
                                             : "border-gray-200"
                                       }`}
                                    />
                                 ) : (
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center">
                                       <User className="w-6 h-6 text-white" />
                                    </div>
                                 )}
                                 <div>
                                    <h3
                                       className={`font-semibold  text-lg ${
                                          darkMode
                                             ? "text-slate-200"
                                             : "text-slate-8000"
                                       }`}
                                    >
                                       {currentUser?.name || "User"}
                                    </h3>
                                    <p
                                       className={`text-xs  ${
                                          darkMode
                                             ? "text-gray-400"
                                             : "text-gray-600"
                                       }`}
                                    >
                                       {currentUser?.email}
                                    </p>
                                 </div>
                              </div>
                           </div>
                           {dpdNavLinks}
                           <li className="!px-2 ">
                              <button
                                 onClick={() => handelLogOut()}
                                 className={`  !py-2.5 hover:bg-red-50 rounded-lg ${
                                    darkMode ? "text-red-400" : "text-red-600"
                                 }`}
                              >
                                 <CiLogout className="text-xl font-bold" />
                                 Log out
                              </button>
                           </li>
                        </ul>
                     </div>
                  ) : (
                     <button
                        onClick={() => navigate("./login")}
                        className="btn border-none bg-[#14b1bbcc] hover:bg-[#14b1bb75] text-gray-100 outline-none shadow-none px-7 rounded-lg"
                     >
                        Login
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
