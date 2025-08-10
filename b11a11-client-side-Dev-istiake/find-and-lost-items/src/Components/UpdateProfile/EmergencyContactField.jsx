import { Phone } from "lucide-react";
import React from "react";

const EmergencyContactField = ({ errors, register, textHT, darkMode }) => {
   return (
      <div>
         <label
            className={`text-[13px] font-semibold mb-2 flex items-center justify-between ${textHT}`}
         >
            Emergency Contact *
            <div>
               {errors.emergencyContact && (
                  <p className="text-red-500 text-sm pl-2">
                     {errors.emergencyContact.message}
                  </p>
               )}
            </div>
         </label>
         <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
               type="tel"
               {...register("emergencyContact", { required: "**" })}
               className={`text-[15px] w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-0 ${
                  darkMode
                     ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700"
                     : " bg-gray-50 focus:bg-white"
               }  ${errors.name ? "border-red-300" : "border-gray-200"}`}
               placeholder="+91 XXXXX XXXXX"
            />
         </div>
      </div>
   );
};

export default EmergencyContactField;
