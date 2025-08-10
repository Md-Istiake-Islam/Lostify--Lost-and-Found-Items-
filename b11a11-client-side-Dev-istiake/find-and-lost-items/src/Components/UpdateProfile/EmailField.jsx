import { Mail } from "lucide-react";
import React from "react";

const EmailField = ({ userInfo, darkMode, textHT }) => {
   return (
      <div>
         <label className={` block text-[13px] font-semibold  mb-2 ${textHT}`}>
            Email Address
         </label>
         <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
               type="email"
               value={userInfo?.email}
               readOnly
               className={`text-[15px] w-full pl-12 pr-4 py-3 border  rounded-xl cursor-not-allowed outline-0 focus:border-0 ${
                  darkMode
                     ? "bg-gray-600/20 text-gray-400 border-gray-700"
                     : " bg-gray-100 border-gray-200"
               }`}
            />
         </div>
      </div>
   );
};

export default EmailField;
