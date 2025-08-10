import { Calendar } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

const BirthDate = ({ errors, control, textHT, darkMode }) => {
   // control datepicker open and close
   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const wrapperRef = useRef(null);

   useEffect(() => {
      const handelClickOutSideWrapper = (e) => {
         if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setIsDatePickerOpen(false);
         }
      };
      const cleanClickEventListener = () => {
         document.addEventListener("click", handelClickOutSideWrapper);
      };

      return () => cleanClickEventListener();
   }, []);
   return (
      <div>
         <label
            className={`text-[13px] font-semibold  mb-2 flex items-center justify-between ${textHT}`}
         >
            Date of Birth *
            {errors.dateObj && (
               <p className="text-red-500 text-sm mt-1">
                  {errors.dateObj.message}
               </p>
            )}
         </label>
         <div
            ref={wrapperRef}
            className={`relative border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200  ${
               darkMode
                  ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700 "
                  : " bg-gray-50 focus:bg-white border-gray-300 hover:border-gray-400"
            }`}
         >
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Controller
               name="dateObj"
               control={control}
               rules={{
                  required: "Date & Time is required",
               }}
               render={({ field }) => (
                  <>
                     <DatePicker
                        {...field}
                        selected={field.value}
                        onChange={(date) => {
                           field.onChange(date);
                        }}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select date and time"
                        open={isDatePickerOpen}
                        popperClassName="!z-50"
                        className="w-full pl-12 px-4 py-3 focus:border-0 focus:outline-0 z-50 text-[15px]"
                     />

                     {/* clickable calendar icon */}
                     <button
                        type="button"
                        onClick={() => {
                           setIsDatePickerOpen((prev) => !prev);
                           setIsClicked((pre) => !pre);
                           setTimeout(() => {
                              setIsClicked((pre) => !pre);
                           }, 100);
                        }}
                        className={`${
                           isClicked ? "scale-95" : "scale-100"
                        } absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none`}
                     >
                        <Calendar />
                     </button>
                  </>
               )}
            />
         </div>
      </div>
   );
};

export default BirthDate;
