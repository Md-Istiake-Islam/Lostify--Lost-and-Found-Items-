import React from "react";
import lostItem1 from "../../assets/Lost-items.jpg";
import lostItem2 from "../../assets/Lost-items-2.jpg";
import { motion } from "motion/react";
import { Link } from "react-router";

const AboutLostify = () => {
   return (
      <div className="container 2xl:max-w-7xl mx-auto">
         <div className="grid grid-cols-1 xl:grid-cols-2 w-full h-[660px] sm:h-[780px] lg:h-[480px] gap-6 lg-gap-0">
            <div className="flex flex-col justify-center items-start  2xl:px-20">
               <h3 className="text-2.6xl lg:text-4xl !font-nunito text-[#808080]  mb-1 mt-10">
                  The Online Avenue to Reunion
               </h3>
               <h1 className="text-4.6xl lg:text-6xl !font-nunito text-[#235480] leading-16 lg:leading-19 lg:mt-2 mb-2 lg:mb-7 font-medium">
                  Lost something?
                  <br />
                  <span className="font-medium !font-nunito">
                     Find it here…
                  </span>
               </h1>
               <p className="!font-nunito text-sm lg:text-lg font-light text-gray-700 lg:max-w-lg leading-7">
                  Welcome to the new online depository for missing items and
                  people. Lostify’s global platform makes it easy to find what –
                  or whoever –you’ve lost
               </p>
               <Link className="mt-7 lg:mt-10" to={"./register"}>
                  <button className="btn text-lg bg-primary text-gray-100 rounded-2xl px-8 py-5 hover:bg-[#0e7c83] max-w-max">
                     Sign up now, its free!
                  </button>
               </Link>
            </div>
            <div className="h-[306px] sm:h-[420px] lg:h-[480px] relative pl-[22px] lg:pl-0">
               <motion.img
                  src={lostItem2}
                  animate={{ y: [0, 40, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  alt=""
                  className="rounded-t-4xl rounded-br-4xl border-l-8 border-b-8 border-blue-700 w-[240px] sm:w-xs lg:w-sm  aspect-[16/12] absolute top-0"
               />
               <motion.img
                  src={lostItem1}
                  animate={{ x: [0, 80, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  alt=""
                  className="rounded-t-4xl rounded-br-4xl border-l-8 border-b-8 border-blue-700 w-[270px] sm:w-[360px] lg:w-md aspect-[16/8] absolute bottom-0 left-30"
               />
            </div>
         </div>
      </div>
   );
};

export default AboutLostify;
