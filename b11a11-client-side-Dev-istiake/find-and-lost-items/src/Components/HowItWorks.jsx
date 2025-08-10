import React, { useContext, useEffect, useState } from "react";
import {
   FaSearch,
   FaHandHoldingHeart,
   FaHandshake,
   FaBell,
   FaShieldAlt,
   FaHistory,
} from "react-icons/fa";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const HowItWorks = () => {
   // get theme control from Theme Context
   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   //set heading and title text style
   const textHT = darkMode ? "text-gray-200" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   return (
      <div className="relative">
         <div className="custom-shape-divider-bottom-1750006689">
            <svg
               data-name="Layer 1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 1200 120"
               preserveAspectRatio="none"
            >
               <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  className="shape-fill"
               ></path>
               <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  className="shape-fill"
               ></path>
               <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  className="shape-fill"
               ></path>
            </svg>
         </div>
         <div className="pb-30">
            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
               <div className=" flex flex-col justify-center items-center">
                  <h1 className="text-3xl font-bold !font-source-serif mb-5 border-b border-primary border-dashed pb-3 min-w-sm text-center">
                     How Lostify{" "}
                     <span className="text-primary !font-source-serif">
                        Helps
                     </span>
                  </h1>
                  <p
                     className={`line-clamp-2  text-sm mb-10 text-center ${pStyle}`}
                  >
                     Lostify is your bridge to reuniting lost items with their
                     owners. Here's how we make that easier, safer, and smarter.
                  </p>
               </div>

               <div className="grid gap-8 md:grid-cols-3 text-center mt-8">
                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
                     <div
                        className={`w-16 h-16 flex items-center justify-center  rounded-full mb-6 ${
                           darkMode ? "bg-blue-400/20" : "bg-blue-100"
                        }`}
                     >
                        <FaSearch
                           className={` text-2xl ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                           }`}
                        />
                     </div>
                     <h3 className={`text-xl font-semibold mb-2 ${textHT}`}>
                        Report a Lost Item
                     </h3>
                     <p className={`text-sm ${pStyle}`}>
                        Share item details like location and description to help
                        others assist in the search.
                     </p>
                  </div>

                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
                     <div
                        className={`w-16 h-16 flex items-center justify-center  rounded-full mb-6 ${
                           darkMode ? "bg-green-400/20" : "bg-green-100"
                        }`}
                     >
                        <FaHandHoldingHeart
                           className={` text-2xl ${
                              darkMode ? "text-green-400" : "text-green-600"
                           }`}
                        />
                     </div>
                     <h3 className={`text-xl font-semibold mb-2 ${textHT}`}>
                        Post a Found Item
                     </h3>
                     <p className={`text-sm ${pStyle}`}>
                        Help others by listing found items with photos and
                        recovery details.
                     </p>
                  </div>

                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
                     <div
                        className={`w-16 h-16 flex items-center justify-center  rounded-full mb-6 ${
                           darkMode ? "bg-yellow-400/20" : "bg-yellow-100"
                        }`}
                     >
                        <FaHandshake
                           className={` text-2xl ${
                              darkMode ? "text-yellow-400" : "text-yellow-600"
                           }`}
                        />
                     </div>
                     <h3 className={`text-xl font-semibold mb-2 ${textHT}`}>
                        Reconnect Securely
                     </h3>
                     <p className={`text-sm ${pStyle}`}>
                        Once verified, Lostify helps both parties arrange return
                        securely and respectfully.
                     </p>
                  </div>

                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
                     <div
                        className={`w-16 h-16 flex items-center justify-center  rounded-full mb-6 ${
                           darkMode ? "bg-indigo-400/20" : "bg-indigo-100"
                        }`}
                     >
                        <FaBell
                           className={` text-2xl ${
                              darkMode ? "text-indigo-400" : "text-indigo-600"
                           }`}
                        />
                     </div>
                     <h3 className={`text-xl font-semibold mb-2 ${textHT}`}>
                        Real-Time Notifications
                     </h3>
                     <p className={`text-sm ${pStyle}`}>
                        Stay updated when someone posts a matching item or sends
                        a recovery request.
                     </p>
                  </div>

                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
                     <div
                        className={`w-16 h-16 flex items-center justify-center  rounded-full mb-6 ${
                           darkMode ? "bg-red-400/20" : "bg-red-100"
                        }`}
                     >
                        <FaShieldAlt
                           className={` text-2xl ${
                              darkMode ? "text-red-400" : "text-red-600"
                           }`}
                        />
                     </div>
                     <h3 className={`text-xl font-semibold mb-2 ${textHT}`}>
                        Privacy First
                     </h3>
                     <p className={`text-sm ${pStyle}`}>
                        Your data is secure with us. We keep your personal
                        information protected and confidential.
                     </p>
                  </div>

                  <div className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
                     <div
                        className={`w-16 h-16 flex items-center justify-center  rounded-full mb-6 ${
                           darkMode ? "bg-orange-400/20" : "bg-orange-100"
                        }`}
                     >
                        <FaHistory
                           className={`text-2xl ${
                              darkMode ? "text-orange-400" : "text-orange-600"
                           }`}
                        />
                     </div>
                     <h3 className={`text-xl font-semibold mb-2 ${textHT}`}>
                        Recovery History
                     </h3>
                     <p className={`text-sm ${pStyle}`}>
                        Access your item recovery history anytime to track
                        progress and updates easily.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HowItWorks;
