import React from "react";
import { useNavigate } from "react-router";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const LatestItemsCard = ({ item, darkMode, textHT, pStyle }) => {
   const navigate = useNavigate();
   const { _id, title, images_url, description } = item;

   return (
      <div>
         <div className="card bg-base-100 w-full shadow-sm  p-4">
            <figure className="aspect-[16/9] mb-1">
               <img
                  src={images_url}
                  alt="Shoes"
                  className="w-full h-full object-cover object-center rounded-xl"
               />
            </figure>
            <div className="card-body pb-1 pr-0.5 pl-3 ">
               <h2
                  className={` ${pStyle}line-clamp-1 ard-title text-xl lg:text-1xl ${textHT}`}
               >
                  {title}
               </h2>
               <p
                  className={`flex items-center gap-2 mt-1 text-xs lg:text-sm min-h-10 ${pStyle}`}
               >
                  <span className="line-clamp-2">{description}</span>
               </p>

               <div className="card-actions justify-end mt-4">
                  <button
                     onClick={() => navigate(`./../items/${_id}`)}
                     className={`btn btn-primary  px-3 ${
                        darkMode ? "text-gray-800" : "text-gray-100"
                     }`}
                  >
                     View Details
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LatestItemsCard;
