import { MapPin } from "lucide-react";
import React from "react";

const AddressField = ({ errors, register, textHT, darkMode }) => {
   return (
      <div className="col-span-2 xl:col-span-1">
         <label
            className={`text-[13px] font-semibold mb-2 flex items-center justify-between ${textHT}`}
         >
            Address *
            <div>
               {errors.address && (
                  <p className="text-red-500 text-sm pl-2">
                     {errors.address.message}
                  </p>
               )}
            </div>
         </label>
         <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
               name="address"
               {...register("address", { required: "**" })}
               rows={3}
               className={`text-[15px] w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-0 ${
                  darkMode
                     ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700"
                     : " bg-gray-50 focus:bg-white"
               }  ${errors.name ? "border-red-300" : "border-gray-200"}`}
               placeholder="Enter your full address"
            />
         </div>
      </div>
   );
};

export default AddressField;
