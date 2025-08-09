import React from "react";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const RecoveredItemsCard = ({ item }) => {
   const {
      _id,
      name,
      title,
      images_url,
      category,
      recoveredDate,
      recoveredLocation,
      userImage,
   } = item;

   return (
      <div>
         <div className="card bg-base-100 w-full shadow-sm  p-6">
            <figure className="aspect-[16/9] mb-2">
               <img
                  src={images_url}
                  alt="Shoes"
                  className="w-full h-full object-cover object-center rounded-xl"
               />
            </figure>
            <div className="card-body pb-2 pr-0.5 pl-3 ">
               <h2 className="line-clamp-1 card-title text-lg mb-1 text-gray-700">
                  {title}
               </h2>
               <p className="flex items-center gap-2 mt-1 text-xs lg:text-base text-gray-500">
                  <TbCategoryPlus className="text-primary text-lg" />
                  <span className="line-clamp-1">{category}</span>
               </p>
               <div className="flex lg:flex-col 2xl:flex-row gap-2 2xl:items-center w-full justify-between">
                  <p className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 border-b border-dashed border-primary pb-3">
                     {" "}
                     <IoLocationOutline className="text-primary text-lg" />
                     <samp className="line-clamp-1">{recoveredLocation}</samp>
                  </p>
                  <p className="flex items-center gap-2 text-xs lg:text-sm justify-end lg:justify-start 2xl:justify-end text-gray-500 pb-3 min-w-[32%]">
                     {" "}
                     <IoIosTimer className="text-primary text-lg" />
                     {recoveredDate}
                  </p>
               </div>
               <div className="card-actions justify-end">
                  <div className="mt-2 flex items-center gap-3 w-full justify-end">
                     <p className="flex items-center gap-2 mt-2 text-xs lg:text-base !font-nunito">
                        <FaRegUserCircle className="text-primary text-xl" />
                        {name}
                     </p>
                     <img
                        src={userImage}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full border-2 border-white"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RecoveredItemsCard;
