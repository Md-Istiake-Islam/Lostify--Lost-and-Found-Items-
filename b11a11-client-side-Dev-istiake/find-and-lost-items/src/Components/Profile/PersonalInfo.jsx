import { Calendar, MapPin, Phone, User } from "lucide-react";
import React from "react";
import useFormatDate from "../../Hooks/useFormatDate";

const PersonalInfo = ({ profileData, pStyle, textHT }) => {
   const { formattedDate } = useFormatDate(profileData.dateOfBirth);
   return (
      <div>
         <h3 className={`text-lg font-bold mb-4 ${textHT}`}>
            Personal Information
         </h3>
         <div className="space-y-4">
            <div className="flex items-center space-x-3">
               <Phone className="w-5 h-5 text-gray-400" />
               <div>
                  <p className={`text-sm ${pStyle}`}>Phone Number</p>
                  <p className={`font-medium ${textHT}`}>{profileData.phone}</p>
               </div>
            </div>
            <div className="flex items-center space-x-3">
               <Calendar className="w-5 h-5 text-gray-400" />
               <div>
                  <p className={`text-sm ${pStyle}`}>Date of Birth</p>
                  <p className={`font-medium ${textHT}`}>{formattedDate}</p>
               </div>
            </div>
            <div className="flex items-center space-x-3">
               <User className="w-5 h-5 text-gray-400" />
               <div>
                  <p className={`text-sm ${pStyle}`}>Gender</p>
                  <p className={`font-medium ${textHT}`}>
                     {profileData.gender}
                  </p>
               </div>
            </div>
            <div className="flex items-center space-x-3">
               <MapPin className="w-5 h-5 text-gray-400" />
               <div>
                  <p className={`text-sm ${pStyle}`}>Address</p>
                  <p className={`font-medium ${textHT}`}>
                     {profileData.address}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PersonalInfo;
