import { Link, useLocation } from "react-router";
import { User, Edit3, User2 } from "lucide-react";
import AccountStatusCard from "../Components/Profile/AccountStatusCard";
import PersonalInfo from "../Components/Profile/PersonalInfo";
import MedicalEmergency from "../Components/Profile/MedicalEmergency";
import useTitle from "../Hooks/useTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner";
import QuickActions from "../Components/Profile/QuickActions";

const UserProfilePage = () => {
   //scroll to top
   useTitle("Profile Status || CareConnect Medical Camp");

   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);

   const { user, jwtReady } = useContext(AuthContext);

   const [userInfo, setUserInfo] = useState(null);

   useEffect(() => {
      if (!user || !jwtReady) return;

      const fetchUserData = async () => {
         try {
            const res = await axios.get(
               `${import.meta.env.VITE_serverUrl}/users/?email=${user.email}`,
               { withCredentials: true }
            );

            if (res.data) {
               setUserInfo(res.data);
            }
         } catch (err) {
            console.error("User fetch error:", err.message);
         }
      };

      fetchUserData();
   }, [user, jwtReady]);

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

   if (!userInfo) {
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
               <div className="flex items-start justify-between">
                  <div className="flex gap-4 space-x-3">
                     <div>
                        <h1
                           className={`flex items-center gap-3 text-3xl font-bold mb-5 border-b border-primary border-dashed pb-3 max-w-max pr-14 !font-source-serif ${
                              darkMode ? "text-white" : "text-slate-800"
                           }`}
                        >
                           <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center shadow-lg mt-1">
                              <User className="w-6 h-6 text-white" />
                           </div>
                           My
                           <span className="text-primary !font-source-serif">
                              Profile
                           </span>
                        </h1>
                        <p className={`${pStyle}`}>
                           Your personal space to view and manage your
                           information, preferences, and account details.
                        </p>
                     </div>
                  </div>
                  <Link
                     to={`./../update-profile`}
                     className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center space-x-2"
                  >
                     <Edit3 className="w-5 h-5" />
                     <span className="hidden lg:block">Edit Profile</span>
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
