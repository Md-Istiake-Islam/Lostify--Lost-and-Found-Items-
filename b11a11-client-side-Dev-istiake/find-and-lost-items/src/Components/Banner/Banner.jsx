import React from "react";
import ImageSlider from "./ImageSlider";

const Banner = ({ sliderData }) => {
   const sliderLength = sliderData.length;

   return (
      <div className="carousel w-full">
         {sliderData.map((item, index) => {
            return (
               <ImageSlider
                  key={index}
                  item={item}
                  index={index}
                  sliderLength={sliderLength}
               />
            );
         })}
      </div>
   );
};

export default Banner;
