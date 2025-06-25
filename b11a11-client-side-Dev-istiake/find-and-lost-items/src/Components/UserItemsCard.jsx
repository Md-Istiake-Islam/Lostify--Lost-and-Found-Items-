import React from "react";
import { useNavigate } from "react-router";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { motion } from "motion/react";

const UserItemsCard = ({ item, handelDelete }) => {
   const navigate = useNavigate();
   const { _id, title, images_url, category, location } = item;

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
            <p className="lg:text-base !font-source-serif">{location}</p>
         </td>
         <th>
            <div className="flex justify-center gap-3">
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`../updateItems/${_id}`)}
                  className="py-2 px-4 text-center text-base bg-primary hover:bg-[#5bc8cf] rounded-sm group"
               >
                  <motion.p
                     animate={{ rotate: 180 }}
                     transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                     }}
                  >
                     <GrUpdate className="text-gray-900" />
                  </motion.p>
               </motion.button>
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                     handelDelete(_id);
                  }}
                  className="py-1 px-4 text-center text-base bg-red-400 hover:bg-red-400 rounded-sm"
               >
                  <MdDeleteForever className="text-gray-800 text-2xl" />
               </motion.button>
            </div>
         </th>
      </tr>
   );
};

export default UserItemsCard;
