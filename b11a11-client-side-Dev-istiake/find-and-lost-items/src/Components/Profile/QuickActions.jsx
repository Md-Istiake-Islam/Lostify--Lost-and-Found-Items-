import { BadgePlus, Boxes, Edit3, Recycle } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const QuickActions = ({ containerStyle, textHT, darkMode }) => {
   return (
      <div className={` rounded-2xl shadow-lg p-6 border ${containerStyle}`}>
         <h3 className={`text-xl font-bold  mb-6 ${textHT}`}>Quick Actions</h3>
         <div className="space-y-3">
            <Link
               to={`./../update-profile`}
               className={`w-full   py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                  darkMode
                     ? "bg-blue-800/30 hover:bg-blue-800/50 text-blue-400"
                     : "bg-blue-50 hover:bg-blue-100 text-blue-700"
               }`}
            >
               <Edit3 className="w-5 h-5" />
               <span>Update Profile</span>
            </Link>
            <Link
               to={"./../addItems"}
               className={`w-full   py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                  darkMode
                     ? "bg-green-800/30 hover:bg-green-800/50 text-green-400"
                     : "bg-green-50 hover:bg-green-100 text-green-700"
               }`}
            >
               <BadgePlus className="w-5 h-5" />
               <span>Add Lost Items</span>
            </Link>
            <Link
               to={"./../myItems"}
               className={`w-full   py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                  darkMode
                     ? "bg-blue-800/30 hover:bg-blue-800/50 text-blue-400"
                     : "bg-blue-50 hover:bg-blue-100 text-blue-700"
               }`}
            >
               <Boxes className="w-5 h-5" />
               <span>Manage My Items</span>
            </Link>
            <Link
               to="./../allRecovered"
               className={`w-full   py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                  darkMode
                     ? "bg-green-800/30 hover:bg-green-800/50 text-green-400"
                     : "bg-green-50 hover:bg-green-100 text-green-700"
               }`}
            >
               <Recycle className="w-5 h-5" />
               <span>Recovered Items</span>
            </Link>
         </div>
      </div>
   );
};

export default QuickActions;
