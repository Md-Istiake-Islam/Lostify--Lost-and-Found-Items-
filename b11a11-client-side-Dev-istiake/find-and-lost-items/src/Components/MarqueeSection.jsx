import React from "react";
import Marquee from "react-fast-marquee";
import {
   FaRegSmileBeam,
   FaSearch,
   FaBoxOpen,
   FaMapMarkedAlt,
   FaHandshake,
} from "react-icons/fa";

const marqueeItems = [
   {
      icon: <FaRegSmileBeam />,
      text: "Thousands of items recovered through community effort",
   },
   {
      icon: <FaSearch />,
      text: "Easily search lost and found items near you",
   },
   {
      icon: <FaBoxOpen />,
      text: "Report found items and help someone today",
   },
   {
      icon: <FaMapMarkedAlt />,
      text: "Track items with smart location tagging",
   },
   {
      icon: <FaHandshake />,
      text: "Trusted platform powered by honest people",
   },
];

const MarqueeSection = () => {
   return (
      <div className="bg-base-100 container 2xl:max-w-8xl mx-auto py-4 rounded-full px-6">
         <Marquee gradient={false} speed={60} pauseOnHover={true}>
            {marqueeItems.map((item, index) => (
               <div
                  key={index}
                  className="flex items-center font-light gap-3 px-4 leading-8"
               >
                  <span className="text-lg">{item.icon}</span>
                  <span className="!font-nunito">{item.text}</span>
               </div>
            ))}
         </Marquee>
      </div>
   );
};

export default MarqueeSection;
