import React from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const ImageSlider = ({ item, index, sliderLength }) => {
   const { title, subtitle, buttonText, description, backgroundImage } = item;
   return (
      <div id={`slide${index + 1}`} className="carousel-item relative w-full">
         <div
            className="hero min-h-[70vh]"
            style={{
               backgroundImage: `url(${backgroundImage})`,
            }}
         >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content justify-center text-center lg:text-start lg:justify-start items-start  md:min-w-xl lg:min-w-3xl xl:min-w-5xl 2xl:min-w-7xl ">
               <div className="w-full flex flex-col items-center lg:items-start">
                  <h1 className="mb-1 xl:mb-3 text-lg xl:text-2.6xl font-semibold">
                     {title}
                  </h1>
                  <h1 className="mb-8 text-[28px] lg:text-3xl xl:text-5xl font-extrabold !font-nunito">
                     {subtitle}
                  </h1>
                  <p className="line-clamp-2 mb-2 max-w-xl lg:max-w-4xl text-sm lg:text-base ">
                     {description}
                  </p>
                  <button className="btn border border-white bg-transparent text-white shadow-none hover:bg-primary hover:border-primary px-5 xl:px-8 py-3 xl:py-6 mt-4">
                     {buttonText}
                  </button>
               </div>
            </div>
         </div>
         <div className="absolute left-3 md:left-10 right-3 md:right-10 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
               onClick={(e) => {
                  e.preventDefault();
                  document
                     .querySelector(
                        `#slide${index === 0 ? sliderLength : index}`
                     )
                     ?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                     });
               }}
               className="btn bg-transparent border border-white rounded-xl py-3 lg:py-6 px-2 hover:bg-white group shadow-none"
            >
               <FaCaretLeft className="text-white text-xl lg:text-3xl group-hover:text-gray-900" />
            </a>
            <a
               onClick={(e) => {
                  e.preventDefault();
                  document
                     .querySelector(
                        `#slide${
                           index === sliderLength - 1
                              ? sliderLength - index
                              : index + 2
                        }`
                     )
                     ?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                     });
               }}
               className="btn bg-transparent border border-white rounded-xl py-3 lg:py-6 px-2 hover:bg-white group shadow-none "
            >
               <FaCaretRight className="text-white text-xl lg:text-3xl group-hover:text-gray-900" />
            </a>
         </div>
      </div>
   );
};

export default ImageSlider;
