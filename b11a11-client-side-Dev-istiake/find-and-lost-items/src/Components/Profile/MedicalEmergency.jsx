import { Heart, Phone, Shield } from "lucide-react";
import React from "react";

const MedicalEmergency = ({ profileData, pStyle, textHT }) => {
   return (
      <div>
         <h3 className={`text-lg font-bold mb-4 ${textHT}`}>
            Medical & Emergency
         </h3>
         <div className="space-y-4">
            <div className="flex items-center space-x-3">
               <Phone className="w-5 h-5 text-gray-400" />
               <div>
                  <p className={`text-sm ${pStyle}`}>Emergency Contact</p>
                  <p className={`font-medium ${textHT}`}>
                     {profileData.emergencyContact}
                  </p>
               </div>
            </div>
            <div className="flex items-center space-x-3">
               <Heart className="w-5 h-5 text-gray-400" />
               <div>
                  <p className={`text-sm ${pStyle}`}>Blood Group</p>
                  <p className={`font-medium ${textHT}`}>
                     {profileData.bloodGroup}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MedicalEmergency;
