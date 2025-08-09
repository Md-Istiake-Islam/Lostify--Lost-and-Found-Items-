import { Link } from "react-router";
import { User, Edit3 } from "lucide-react";
import AccountStatusCard from "../Components/Profile/AccountStatusCard";
import PersonalInfo from "../Components/Profile/PersonalInfo";
import MedicalEmergency from "../Components/Profile/MedicalEmergency";
import AccountActivity from "../Components/Profile/AccountActivity";
import QuickActions from "../Components/Profile/QuickActions";
import useUserInfo from "../../../Hooks/useUserInfo";
import LoadingSpinner from "../../Shared/LoadingElement/LoadingSpinner";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../../Provider/ThemeProvider/ThemeContext";
import useTitle from "../../../Hooks/useTitle";

const UserProfilePage = () => {
   //scroll to top
   useTitle("Profile Status || CareConnect Medical Camp");

   const { userInfo, role, isUserLoading } = useUserInfo();

   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   // set theme
   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   // set container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";

   //set heading and title text style
   const textHT = darkMode ? "text-slate-200" : "text-slate-800";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   if (!userInfo || !role || isUserLoading) {
      return <LoadingSpinner />;
   }

   const profileData = {
      displayName: userInfo?.name || "info not provided",
      email: userInfo?.email,
      photoURL: userInfo?.photo || null,
      phone: userInfo?.phone || "info not provided",
      dateOfBirth: userInfo?.date,
      gender: userInfo?.gender || "info not provided",
      address: userInfo?.address || "info not provided",
      emergencyContact: userInfo?.emergencyContact || "info not provided",
      bloodGroup: userInfo?.bloodGroup || "info not provided",
      joinedDate: userInfo?.created_At,
      lastLogin: userInfo?.last_loggedIn,
      accountStatus: role,
   };
   return (
      <div
         className={`min-h-screen  pt-6 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
         }`}
      >
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
               <div className="flex items-center justify-between">
                  <div className="flex gap-4 space-x-3">
                     <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg mt-1">
                        <User className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h1
                           className={` text-4xl font-bold  mb-2 ${
                              darkMode ? "text-white" : "text-slate-800"
                           }`}
                        >
                           My Profile
                        </h1>
                        <p className={`${pStyle}`}>
                           View and manage your account information
                        </p>
                     </div>
                  </div>
                  <Link
                     to={`/dashboard/update-profile`}
                     className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center space-x-2"
                  >
                     <Edit3 className="w-5 h-5" />
                     <span>Edit Profile</span>
                  </Link>
               </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
               {/* Main Profile Information */}
               <div className="lg:col-span-2 space-y-8">
                  {/* Profile Card */}
                  <div
                     className={` rounded-2xl shadow-lg p-8 border ${containerStyle}`}
                  >
                     <AccountStatusCard
                        profileData={profileData}
                        pStyle={pStyle}
                        textHT={textHT}
                        darkMode={darkMode}
                     />

                     {/* Detailed Information */}
                     <div className="grid md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <PersonalInfo
                           profileData={profileData}
                           containerStyle={containerStyle}
                           pStyle={pStyle}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Medical & Emergency Information */}
                        <MedicalEmergency
                           profileData={profileData}
                           containerStyle={containerStyle}
                           pStyle={pStyle}
                           textHT={textHT}
                           darkMode={darkMode}
                        />
                     </div>
                  </div>

                  {/* Account Activity */}
                  <AccountActivity
                     profileData={profileData}
                     containerStyle={containerStyle}
                     pStyle={pStyle}
                     textHT={textHT}
                     darkMode={darkMode}
                  />
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  {/* Quick Actions */}
                  <QuickActions
                     containerStyle={containerStyle}
                     pStyle={pStyle}
                     textHT={textHT}
                     darkMode={darkMode}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfilePage;
