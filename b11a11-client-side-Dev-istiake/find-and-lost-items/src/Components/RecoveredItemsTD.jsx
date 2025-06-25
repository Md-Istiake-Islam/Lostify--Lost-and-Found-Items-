import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

const RecoveredItemsTD = ({ item }) => {
   const { _id, name, title, images_url, category, recoveredLocation } = item;

   return (
      <tr className="bg-[#14b0bb2d]">
         <td>
            <div className="max-w-56 ">
               <img
                  className="w-full object-cover aspect-[16/13] lg:aspect-[16/7] rounded-lg"
                  src={images_url}
                  alt="Avatar"
               />
            </div>
         </td>
         <td>
            <p className="lg:text-lg font-semibold !font-source-serif">
               {title}
            </p>
         </td>
         <td>
            <p className="lg:text-base !font-source-serif">{category}</p>
         </td>
         <td className="hidden lg:table-cell">
            <p className="lg:text-base !font-source-serif">
               {recoveredLocation}
            </p>
         </td>
         <th>
            <p className="lg:text-base !font-source-serif">{name}</p>
         </th>
      </tr>
   );
};

export default RecoveredItemsTD;
