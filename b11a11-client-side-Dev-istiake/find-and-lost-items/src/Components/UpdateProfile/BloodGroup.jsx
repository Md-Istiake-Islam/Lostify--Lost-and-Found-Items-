import { Heart } from "lucide-react";
import React from "react";

const BloodGroup = ({ errors, register, textHT, darkMode }) => {
   return (
      <div>
         <label
            className={`text-[13px] font-semibold mb-2 flex items-center justify-between ${textHT}`}
         >
            Blood Group *
            <div>
               {errors.bloodGroup && (
                  <p className="text-red-500 text-sm pl-2">
                     {errors.bloodGroup.message}
                  </p>
               )}
            </div>
         </label>
         <div className="relative">
            <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
               name="bloodGroup"
               {...register("bloodGroup", { required: "**" })}
               className={`text-[15px] w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-0 ${
                  darkMode
                     ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700"
                     : " bg-gray-50 focus:bg-white"
               }  ${errors.name ? "border-red-300" : "border-gray-200"}`}
            >
               <option
                  value=""
                  disabled
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  Select blood group
               </option>
               <option
                  value="A+"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  A+
               </option>
               <option
                  value="A-"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  A-
               </option>
               <option
                  value="B+"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  B+
               </option>
               <option
                  value="B-"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  B-
               </option>
               <option
                  value="AB+"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  AB+
               </option>
               <option
                  value="AB-"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  AB-
               </option>
               <option
                  value="O+"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  O+
               </option>
               <option
                  value="O-"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  O-
               </option>
            </select>
         </div>
      </div>
   );
};

export default BloodGroup;
