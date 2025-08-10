import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Save, AlertCircle, UserRoundPen, Ban } from "lucide-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";
import NameField from "../Components/UpdateProfile/NameField";
import AddressField from "../Components/UpdateProfile/AddressField";
import EmailField from "../Components/UpdateProfile/EmailField";
import PhoneField from "../Components/UpdateProfile/PhoneField";
import BirthDate from "../Components/UpdateProfile/BirthDate";
import GenderField from "../Components/UpdateProfile/GenderField";
import BloodGroup from "../Components/UpdateProfile/BloodGroup";
import EmergencyContactField from "../Components/UpdateProfile/EmergencyContactField";
import axios from "axios";
import ImageField from "../Components/UpdateProfile/ImageField";
import useTitle from "../Hooks/useTitle";
import LoadingSpinner from "../Components/LoadingSpinner";

const EditProfilePage = () => {
   //scroll to top
   useTitle("Update Profile || CareConnect Medical Camp");

   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);

   // get organizer from auth context
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

   //set paragraph style
   const btnStyle = darkMode ? "text-gray-800" : "text-gray-100";

   // get update user ID

   const [isLoading, setIsLoading] = useState(false);

   //use react hook form
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      control,
   } = useForm({
      defaultValues: {
         name: "",
         photo: "",
         phone: "",
         dateObj: null,
         gender: "",
         address: "",
         emergencyContact: "",
         bloodGroup: "",
      },
   });

   useEffect(() => {
      if (!userInfo) return;

      reset({
         name: userInfo?.name || null,
         imageUrl: userInfo?.photo || null,
         phone: userInfo.phone || null,
         gender: userInfo.gender || null,
         dateObj: userInfo?.date ? new Date(userInfo.date) : null,
         address: userInfo.address || null,
         emergencyContact: userInfo.emergencyContact || null,
         bloodGroup: userInfo.bloodGroup || null,
      });
   }, [userInfo, reset]);

   if (!userInfo) {
      return <LoadingSpinner />;
   }

   // handle on submit stage
   const onSubmit = async ({
      name,
      phone,
      gender,
      imageUrl,
      dateObj,
      address,
      emergencyContact,
      bloodGroup,
   }) => {
      try {
         setIsLoading(true);

         const userData = {
            name,
            phone,
            gender,
            photo: imageUrl,
            date: dateObj,
            address,
            emergencyContact,
            bloodGroup,
         };

         console.log(userData);

         // patch user data to server
         const res = await axios.patch(
            `${import.meta.env.VITE_serverUrl}/update-user/?email=${
               user.email
            }`,
            userData,
            {
               withCredentials: true,
            }
         );
         console.log(res);

         // check if user data data is posted successfully
         if (res?.data?.acknowledged && res?.data?.modifiedCount > 0) {
            Swal.fire({
               title: "Profile Updated Successfully",
               html: `<p class='swal-text'>Your profile has been updated successfully!</p>`,
               icon: "success",
               confirmButtonText: "OK",
            });
         } else {
            Swal.fire({
               title: "Failed to Update Profile",
               html: `<p class='swal-text'> you are already upto date </p>`,
               icon: "error",
               confirmButtonText: "OK",
            });
         }
      } catch (err) {
         const errorMessage =
            err?.response?.data?.message ||
            err.message ||
            "Something went wrong";

         Swal.fire({
            title: "Wrong Credentials",
            html: `<p class='swal-text'>${errorMessage}</p>`,
            icon: "error",
            draggable: true,
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div
         className={`min-h-screen  pt-6 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
         }`}
      >
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 max-w-6xl mx-auto">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="flex gap-4 space-x-3">
                        <div>
                           <h1
                              className={`flex items-center gap-3 text-3xl font-bold mb-5 border-b border-primary border-dashed pb-3 max-w-max pr-14 !font-source-serif ${
                                 darkMode ? "text-white" : "text-slate-800"
                              }`}
                           >
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center shadow-lg mt-1">
                                 <UserRoundPen className="w-6 h-6 text-white" />
                              </div>
                              Edit
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
                  </div>
               </div>
            </div>

            <div className="max-w-6xl mx-auto">
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div
                     className={` rounded-2xl shadow-lg px-8 py-10 border ${containerStyle}`}
                  >
                     <h2 className={`text-2xl font-bold mb-8 ${textHT}`}>
                        Personal Information
                     </h2>
                     <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                        {/* Display Name */}
                        <NameField
                           errors={errors}
                           register={register}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Email (Read-only) */}
                        <EmailField
                           userInfo={userInfo}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Phone Number */}
                        <PhoneField
                           errors={errors}
                           register={register}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Date of Birth */}
                        <BirthDate
                           errors={errors}
                           control={control}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Gender */}
                        <GenderField
                           errors={errors}
                           register={register}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Blood Group */}
                        <BloodGroup
                           errors={errors}
                           register={register}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Image URL */}
                        <ImageField
                           errors={errors}
                           register={register}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Emergency Contact */}
                        <EmergencyContactField
                           errors={errors}
                           register={register}
                           containerStyle={containerStyle}
                           pStyle={pStyle}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Address */}
                        <AddressField
                           errors={errors}
                           register={register}
                           containerStyle={containerStyle}
                           pStyle={pStyle}
                           textHT={textHT}
                           darkMode={darkMode}
                        />
                     </div>

                     {/* Submit Controls */}
                     <div className="w-full flex xl:justify-end gap-5 mt-14">
                        {/* Cancel Submit  */}
                        <Link
                           to="./../user-profile"
                           className={`xl:max-w-52 flex justify-center gap-3 flex-1 py-3 rounded-lg font-semibold transition-all duration-300 text-center hover:scale-[1.02]  ${
                              darkMode
                                 ? "bg-red-600/20 hover:bg-red-600/30 text-red-400"
                                 : "bg-red-100 hover:bg-red-200 text-red-500"
                           }`}
                        >
                           <Ban className="w-5 h-5" />
                           Cancel
                        </Link>

                        {/* Submit Buttons */}
                        <button
                           type="submit"
                           disabled={isLoading}
                           className={`xl:max-w-52 flex-1 bg-primary py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${btnStyle}`}
                        >
                           {isLoading ? (
                              <>
                                 <div
                                    className={`w-5 h-5 border-2 border-white/30 rounded-full animate-spin ${btnStyle}`}
                                 ></div>
                                 <span>Updating Profile...</span>
                              </>
                           ) : (
                              <>
                                 <Save className="w-5 h-5" />
                                 <span>Save Changes</span>
                              </>
                           )}
                        </button>
                     </div>
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                     <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                           <AlertCircle className="w-6 h-6 text-red-600" />
                           <div>
                              <h3 className="font-semibold text-red-800">
                                 Error
                              </h3>
                              <p className="text-sm text-red-700">
                                 {errors.submit}
                              </p>
                           </div>
                        </div>
                     </div>
                  )}
               </form>
            </div>
         </div>
      </div>
   );
};

export default EditProfilePage;
