import React, { useContext, useEffect, useState } from "react";
import lostItem1 from "../../assets/Lost-items.jpg";
import lostItem2 from "../../assets/Lost-items-2.jpg";
import { motion } from "motion/react";
import { Link } from "react-router";
import ThemeContext from "../../Provider/ThemeProvider/ThemeContext";

const AboutLostify = () => {
   // get theme control from Theme Context
   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   //set heading and title text style
   const textHT = darkMode ? "text-[#a5a4a4]" : "text-[#808080]";
   const textHT2 = darkMode ? "text-[#7fb1dc]" : "text-[#235480]";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-700";

   //set button style
   const btnStyle = darkMode
      ? "bg-primary text-gray-800 hover:bg-primary/85"
      : "bg-primary text-gray-100 hover:bg-primary/85";
   return (
      <div className="container 2xl:max-w-7xl mx-auto">
         <div className="grid grid-cols-1 xl:grid-cols-2 w-full xl:h-[480px] gap-6 lg-gap-0">
            <div className="flex flex-col justify-center items-center xl:items-start  2xl:px-20">
               <h3
                  className={`text-2.6xl lg:text-4xl !font-nunito mb-1 mt-10 ${textHT}`}
               >
                  The Online Avenue to Reunion
               </h3>
               <h1
                  className={`text-4.6xl lg:text-6xl !font-nunito leading-16 lg:leading-19 lg:mt-2 mb-2 lg:mb-7 font-medium flex xl:flex-col gap-2 ${textHT2}`}
               >
                  Lost something?
                  <span className="font-medium !font-nunito">
                     Find it here…
                  </span>
               </h1>
               <p
                  className={`!font-nunito text-sm lg:text-lg font-light lg:max-w-md leading-7 text-center xl:text-start ${pStyle}`}
               >
                  Welcome to the new online depository for missing items and
                  people. Lostify’s global platform makes it easy to find what –
                  or whoever –you’ve lost
               </p>
               <Link className="mt-7 lg:mt-10" to={"./register"}>
                  <button
                     className={`btn text-lg rounded-2xl px-8 py-5 max-w-max ${btnStyle}`}
                  >
                     Sign up now, its free!
                  </button>
               </Link>
            </div>
            <div className="xl:h-[480px] relative pl-[22px] xl:pl-0  hidden xl:block">
               <motion.img
                  src={lostItem2}
                  animate={{ y: [0, 40, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  alt=""
                  className="rounded-t-4xl rounded-br-4xl border-l-8 border-b-8 border-blue-700 w-sm  aspect-[16/12] absolute top-0"
               />
               <motion.img
                  src={lostItem1}
                  animate={{ x: [0, 80, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  alt=""
                  className="rounded-t-4xl rounded-br-4xl border-l-8 border-b-8 border-blue-700 w-md aspect-[16/8] absolute bottom-0 left-30"
               />
            </div>
         </div>
      </div>
   );
};

export default AboutLostify;
