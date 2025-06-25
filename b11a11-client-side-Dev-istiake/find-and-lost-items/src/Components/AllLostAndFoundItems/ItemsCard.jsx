import React from "react";
import { useNavigate } from "react-router";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const ItemsCard = ({ item }) => {
   const navigate = useNavigate();
   const {
      _id,
      postType,
      title,
      images_url,
      category,
      location,
      lostDate,
      foundDate,
   } = item;

   const date = postType === "Lost" ? lostDate : foundDate;

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
               <h2 className="cline-clamp-1 ard-title text-1xl lg:text-2xl mb-1 text-gray-700">
                  {title}
               </h2>
               <p className="flex items-center gap-2 mt-1 text-xs lg:text-base text-gray-500">
                  <TbCategoryPlus className="text-primary text-lg" />
                  <span className="line-clamp-1">{category}</span>
               </p>
               <div className="flex gap-2 items-center w-full justify-between mb-3">
                  <p className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 ">
                     {" "}
                     <IoLocationOutline className="text-primary text-lg" />
                     <samp className="line-clamp-1">{location}</samp>
                  </p>
                  <p className="flex items-center gap-2 text-xs lg:text-sm justify-end text-gray-500 min-w-[32%]">
                     {" "}
                     <IoIosTimer className="text-primary text-lg" />
                     {date}
                  </p>
               </div>
               <div className="card-actions justify-end">
                  <button
                     onClick={() => navigate(`./../items/${_id}`)}
                     className="btn btn-primary text-white px-6"
                  >
                     View Details
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ItemsCard;
