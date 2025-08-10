import React, { useContext, useEffect, useMemo, useState } from "react";
import aboutAnimationData from "../assets/animations/about.json"; // Replace with your actual animation
import Lottie from "lottie-react";
import useTitle from "../Hooks/useTitle";
import { useLocation } from "react-router";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const aboutContent = [
   {
      title: "Our Mission",
      description:
         "Lostify is built to help people reunite with their lost belongings through community-powered reporting and searching. We aim to create a trusted platform where honesty and integrity thrive.",
   },
   {
      title: "How It Works",
      description:
         "Users can report lost or found items, view recent posts, and connect with others securely to return items to their rightful owners.",
   },
   {
      title: "Why Trust Us?",
      description:
         "With verified users, transparent processes, and real success stories, Lostify has helped hundreds of people recover what matters most.",
   },
   {
      title: "Our Vision",
      description:
         "To become the most reliable lost & found network, empowering communities across the globe to look out for one another.",
   },
];

const AboutUs = () => {
   //scroll to top
   useTitle("About Us");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);
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

   // set container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";
   return (
      <div className="px-4 py-20 max-w-7xl mx-auto ">
         <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left side - animation */}
            <div className="w-full lg:w-1/2">
               {
                  <Lottie
                     animationData={aboutAnimationData}
                     loop={true}
                     className="w-full max-w-md mx-auto"
                  />
               }
            </div>

            {/* Right side - text */}
            <div className="w-full lg:w-1/2 space-y-6">
               <h1 className="text-3xl font-bold !font-source-serif mb-8 border-b border-primary border-dashed pb-3 pr-20 max-w-max">
                  About{" "}
                  <span className="text-primary !font-source-serif">Us</span>
               </h1>
               <p className={`line-clamp-2 text-sm mb-10 ${pStyle}`}>
                  We're more than a tool — we're a community committed to doing
                  the right thing.
               </p>

               <div className="space-y-5">
                  {aboutContent.map((item, index) => (
                     <div
                        key={index}
                        className="bg-base-100 border-l-4 border-[#14b1bb] p-4 shadow-sm rounded-md"
                     >
                        <h3 className="text-lg font-semibold text-[#14b1bb] mb-3">
                           {item.title}
                        </h3>
                        <p className={`text-sm ${pStyle}`}>
                           {item.description}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
