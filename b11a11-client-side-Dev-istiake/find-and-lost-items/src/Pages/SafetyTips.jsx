import React from "react";
import animationData from "../assets/animations/safety.json";
import Lottie from "lottie-react";

const tips = [
   {
      title: "Label Your Belongings",
      description:
         "Use name tags, contact info, or QR codes on your valuable items to increase the chances of being contacted if lost.",
   },
   {
      title: "Use Secure Storage",
      description:
         "Always store your essentials in zipped bags or inner compartments when in public or crowded areas.",
   },
   {
      title: "Take Photos of Important Items",
      description:
         "Keep a photo record of valuable items (e.g., passport, wallet, electronics) for easy identification and reporting.",
   },
   {
      title: "Meet in Public Places",
      description:
         "When returning or collecting lost items, always choose well-lit, public areas — ideally with surveillance.",
   },
   {
      title: "Beware of Scams",
      description:
         "Avoid sending money to strangers claiming they found your item. Use Lostify’s communication system when possible.",
   },
];

const SafetyTips = () => {
   return (
      <div className="px-4 py-20 max-w-7xl mx-auto">
         <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            {/* Left side - text */}
            <div className="w-full lg:w-1/2 space-y-6">
               <h1 className="text-4xl font-bold text-[#14b1bb]">
                  Safety Tips
               </h1>
               <p className="text-gray-600 text-base leading-relaxed">
                  Protect yourself and others by following these guidelines when
                  handling lost and found items.
               </p>

               <div className="space-y-5">
                  {tips.map((tip, index) => (
                     <div
                        key={index}
                        className="bg-base-100 border-l-4 border-[#14b1bb] p-4 shadow-sm rounded-md"
                     >
                        <h3 className="text-lg font-semibold text-[#14b1bb]">
                           {tip.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                           {tip.description}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Right side - lottie animation */}
            <div className="w-full lg:w-1/2">
               <Lottie
                  animationData={animationData}
                  loop={true}
                  className="w-full max-w-md mx-auto"
               />
            </div>
         </div>
      </div>
   );
};

export default SafetyTips;
