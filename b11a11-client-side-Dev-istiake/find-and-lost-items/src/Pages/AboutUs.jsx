import React, { useMemo } from "react";
import aboutAnimationData from "../assets/animations/about.json"; // Replace with your actual animation
import Lottie from "lottie-react";

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
               <h1 className="text-4xl font-bold text-[#14b1bb]">About Us</h1>
               <p className="text-gray-600 text-base leading-relaxed">
                  We're more than a tool — we're a community committed to doing
                  the right thing.
               </p>

               <div className="space-y-5">
                  {aboutContent.map((item, index) => (
                     <div
                        key={index}
                        className="bg-base-100 border-l-4 border-[#14b1bb] p-4 shadow-sm rounded-md"
                     >
                        <h3 className="text-lg font-semibold text-[#14b1bb]">
                           {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
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
