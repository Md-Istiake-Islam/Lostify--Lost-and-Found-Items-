import { User } from "lucide-react";
import React from "react";

const GenderField = ({ errors, register, textHT, darkMode }) => {
   return (
      <div>
         <label
            className={`text-[13px] font-semibold  mb-2 flex items-center justify-between ${textHT}`}
         >
            Gender *
            {errors.gender && (
               <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
               </p>
            )}
         </label>
         <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
               {...register("gender", { required: "Gender is required" })}
               className={`text-[15px] w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-0 ${
                  darkMode
                     ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700"
                     : " bg-gray-50 focus:bg-white"
               }  ${errors.name ? "border-red-300" : "border-gray-200"}`}
               defaultValue=""
            >
               <option
                  value=""
                  disabled
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  Select gender
               </option>
               <option
                  value="Male"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  Male
               </option>
               <option
                  value="Female"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  Female
               </option>
               <option
                  value="Other"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  Other
               </option>
               <option
                  value="Prefer not to say"
                  className={`${darkMode ? "bg-gray-700 text-gray-300" : " "}`}
               >
                  Prefer not to say
               </option>
            </select>
         </div>
      </div>
   );
};

export default GenderField;
