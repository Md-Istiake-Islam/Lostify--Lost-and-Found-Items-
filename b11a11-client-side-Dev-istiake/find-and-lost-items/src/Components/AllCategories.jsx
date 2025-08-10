import React, { useContext, useEffect, useState } from "react";

// Import icons from react-icons
import {
   FaLaptop,
   FaUserAlt,
   FaIdCard,
   FaTshirt,
   FaSuitcase,
   FaBook,
   FaBus,
   FaBoxes,
} from "react-icons/fa";
import { Link } from "react-router";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const categories = [
   { name: "Electronics", icon: <FaLaptop /> },
   { name: "Personal Accessories", icon: <FaUserAlt /> },
   { name: "Identification & Cards", icon: <FaIdCard /> },
   { name: "Clothing & Apparel", icon: <FaTshirt /> },
   { name: "Bags & Luggage", icon: <FaSuitcase /> },
   { name: "Books & Stationery", icon: <FaBook /> },
   { name: "Transport-Related", icon: <FaBus /> },
   { name: "Miscellaneous", icon: <FaBoxes /> },
];

const AllCategories = () => {
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
      <div className="container 2xl:max-w-8xl py-16 mx-auto bg-base-200">
         <div className=" flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold !font-source-serif mb-5 border-b border-primary border-dashed pb-3 min-w-sm text-center">
               Featured{" "}
               <span className="text-primary !font-source-serif">Category</span>
            </h2>
            <p className={`line-clamp-2  text-sm mb-10 text-center ${pStyle}`}>
               Get Your Desired Product from Featured Category! All item
               categories in one place — making it easier to search, post, and
               recover.
            </p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
               <Link key={idx} to={`./categorize-item/${cat.name}`}>
                  <div className="flex flex-col items-center gap-4 bg-base-100 border-l-4 border-[#14b1bb] shadow-md p-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out">
                     <div className="text-[#14b1bb] text-3xl">{cat.icon}</div>
                     <h3 className={` font-medium ${textHT}`}>{cat.name}</h3>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default AllCategories;
