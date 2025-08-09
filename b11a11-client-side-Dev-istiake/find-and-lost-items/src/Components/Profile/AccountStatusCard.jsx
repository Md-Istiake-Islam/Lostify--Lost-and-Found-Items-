import { Camera, Shield, User } from "lucide-react";
import React from "react";

const AccountStatusCard = ({
   profileData,
   containerStyle,
   pStyle,
   textHT,
   darkMode,
}) => {
   return (
      <div className="flex items-start space-x-6 mb-8">
         {/* Profile Picture */}
         <div className="relative">
            {profileData.photoURL ? (
               <img
                  src={profileData.photoURL}
                  alt={profileData.displayName}
                  className={`w-24 h-24 rounded-2xl object-cover border-2 shadow-lg ${
                     darkMode ? "border-gray-400" : "border-blue-400"
                  }`}
               />
            ) : (
               <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
               </div>
            )}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
               <Camera className="w-4 h-4 text-gray-600" />
            </div>
         </div>

         {/* Basic Info */}
         <div className="flex-1">
            <h2 className={`text-3xl font-bold  mb-2 ${textHT}`}>
               {profileData.displayName}
            </h2>
            <p className={`${pStyle} mb-2`}>{profileData.email}</p>

            {/* Account Status */}
            <div className="flex items-center space-x-2">
               <Shield className="w-5 h-5 text-green-600" />
               <span className="text-green-600 font-semibold">
                  {profileData.accountStatus} Account
               </span>
            </div>
         </div>
      </div>
   );
};

export default AccountStatusCard;
