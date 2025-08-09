import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { User, Save, AlertCircle } from "lucide-react";
import useUserInfo from "../../../Hooks/useUserInfo";
import useTitle from "../../../Hooks/useTitle";
import { useForm } from "react-hook-form";
import ImageField from "../Components/UpdateProfile/ImageField";
import NameField from "../Components/UpdateProfile/NameField";
import EmailField from "../Components/UpdateProfile/EmailField";
import PhoneField from "../Components/UpdateProfile/PhoneField";
import BirthDate from "../Components/UpdateProfile/BirthDate";
import GenderField from "../Components/UpdateProfile/GenderField";
import BloodGroup from "../Components/UpdateProfile/BloodGroup";
import AddressField from "../Components/UpdateProfile/AddressField";
import EmergencyContactField from "../Components/UpdateProfile/EmergencyContactField";
import { useUploadImgToImgBB } from "../../../Hooks/useUploadImgToImgBB";
import LoadingSpinner from "../../Shared/LoadingElement/LoadingSpinner";
import Swal from "sweetalert2";
import AuthContext from "../../../Provider/AuthProvider/AuthContext";
import useUpdateUserData from "../../../Hooks/useUpdateUserData";
import ThemeContext from "../../../Provider/ThemeProvider/ThemeContext";

const EditProfilePage = () => {
   //scroll to top
   useTitle("Update Profile || CareConnect Medical Camp");

   // get organizer from auth context
   const { userInfo, isUserLoading } = useUserInfo();
   const { user } = useContext(AuthContext);

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

   // get update user ID

   const [isLoading, setIsLoading] = useState(false);
   const { mutateAsync } = useUpdateUserData(user.email);

   //use react hook form
   const {
      register,
      handleSubmit,
      watch,
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

   // hooks for image upload
   const {
      uploadImage,
      loading: imageLoading,
      error: imgError,
   } = useUploadImgToImgBB();

   useEffect(() => {
      if (!userInfo || isUserLoading) return;

      reset({
         name: userInfo?.name || "info not provided",
         photo: null,
         phone: userInfo.phone || "info not provided",
         gender: userInfo.gender || "info not provided",
         dateObj: userInfo?.date ? new Date(userInfo.date) : null,
         address: userInfo.address || "info not provided",
         emergencyContact: userInfo.emergencyContact || "info not provided",
         bloodGroup: userInfo.bloodGroup || "info not provided",
      });
   }, [userInfo, reset]);

   if (!userInfo || isUserLoading) {
      return <LoadingSpinner />;
   }

   // handle on submit stage
   const onSubmit = async ({
      name,
      phone,
      gender,
      image,
      dateObj,
      address,
      emergencyContact,
      bloodGroup,
   }) => {
      try {
         setIsLoading(true);

         //Upload the image
         const file = image?.[0];
         let imageUrl = userInfo.photo;
         console.log("imageUrl 3");

         if (file) {
            imageUrl = await uploadImage(file);
         }

         // guard for check if image upload failed
         if (!imageUrl) {
            Swal.fire({
               title: "Failed to upload Image! Try again",
               html: `<p class='swal-text'>${imgError}</p>`,
               icon: "error",
               draggable: true,
            });
            return;
         }

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

         // patch user data to server
         const res = await mutateAsync(userData);

         // check if user data data is posted successfully
         if (res?.acknowledged && res?.modifiedCount > 0) {
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
            <div className="mb-8 max-w-4xl mx-auto">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
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
                              Edit Profile
                           </h1>
                           <p className={`${pStyle}`}>
                              Update your personal information
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="max-w-4xl mx-auto">
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Profile Picture Section */}
                  <div
                     className={`rounded-2xl shadow-lg p-8 border ${containerStyle}`}
                  >
                     <h2 className={`text-2xl font-bold mb-6 ${textHT}`}>
                        Profile Picture
                     </h2>
                     {/* Image Upload */}
                     <ImageField
                        errors={errors}
                        register={register}
                        watch={watch}
                        darkMode={darkMode}
                        pStyle={pStyle}
                        imagePreviewUrl={userInfo?.photo}
                     />
                  </div>

                  {/* Personal Information */}
                  <div
                     className={` rounded-2xl shadow-lg p-8 border ${containerStyle}`}
                  >
                     <h2 className={`text-2xl font-bold mb-6 ${textHT}`}>
                        Personal Information
                     </h2>
                     <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Display Name */}
                        <NameField
                           errors={errors}
                           register={register}
                           containerStyle={containerStyle}
                           pStyle={pStyle}
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
                           containerStyle={containerStyle}
                           pStyle={pStyle}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Date of Birth */}
                        <BirthDate
                           errors={errors}
                           control={control}
                           containerStyle={containerStyle}
                           pStyle={pStyle}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Gender */}
                        <GenderField
                           errors={errors}
                           register={register}
                           containerStyle={containerStyle}
                           pStyle={pStyle}
                           textHT={textHT}
                           darkMode={darkMode}
                        />

                        {/* Blood Group */}
                        <BloodGroup
                           errors={errors}
                           register={register}
                           containerStyle={containerStyle}
                           pStyle={pStyle}
                           textHT={textHT}
                           darkMode={darkMode}
                        />
                     </div>

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

                  {/* Submit Buttons */}
                  <div className="flex space-x-4">
                     <Link
                        to="/dashboard/profile-status"
                        className={`flex-1  py-4 rounded-xl font-semibold transition-all duration-300 text-center ${
                           darkMode
                              ? "bg-gray-600/30 hover:bg-gray-600/40 text-gray-400"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                     >
                        Cancel
                     </Link>
                     <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                     >
                        {isLoading ? (
                           <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
