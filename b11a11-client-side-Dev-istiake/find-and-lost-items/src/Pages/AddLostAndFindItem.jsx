import React, { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";
import formBg from "../assets/form-bg.png";
import axios from "axios";
import useTitle from "../Hooks/useTitle";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const categories = [
   "Electronics",
   "Personal Accessories",
   "Identification & Cards",
   "Clothing & Apparel",
   "Bags & Luggage",
   "Books & Stationery",
   "Transport-Related",
   "Miscellaneous",
   "Other",
];

const AddLostAndFindItem = () => {
   //page title
   useTitle("Add Lost or Found Items");

   // get theme control from Theme Context
   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   //set heading and title text style
   const textHT = darkMode ? "text-gray-200" : "text-gray-900";

   //set paragraph style
   const btnStyle = darkMode ? "text-gray-800" : "text-gray-100";

   //set paragraph style
   const inputStyle = darkMode
      ? "bg-gray-600/20 hover:bg-gray-600/30 border-gray-700 text-gray-300"
      : "bg-gray-50 border-gray-200 text-gray-900";

   // set container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";

   //context api

   const { user, jwtReady } = useContext(AuthContext);

   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      if (!user || !jwtReady) return;

      const fetchUserData = async () => {
         try {
            const res = await axios.get(
               `${import.meta.env.VITE_serverUrl}/users/?email=${user.email}`,
               { withCredentials: true }
            );

            if (res.data) {
               setCurrentUser(res.data);
            }
         } catch (err) {
            console.error("User fetch error:", err.message);
         }
      };

      fetchUserData();
   }, [user, jwtReady]);

   //state control
   const [postTypeValue, setPostTypeValue] = useState("Lost");
   const [thumbnailValue, setThumbnailValue] = useState("");
   const [titleValue, setTitleValue] = useState("");
   const [categoryValue, setCategoryValue] = useState("");
   const [locationValue, setLocationValue] = useState("");
   const [descriptionValue, setDescriptionValue] = useState("");

   //Configuration for react date-picker
   const [selectedDate, setSelectedDate] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const datePickerRef = useRef(null);
   const wrapperRef = useRef(null);

   useEffect(() => {
      const handelClickOutSideWrapper = (e) => {
         if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setIsOpen(false);
         }
      };
      const cleanClickEventListener = () => {
         document.addEventListener("click", handelClickOutSideWrapper);
      };

      return () => cleanClickEventListener();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = dayjs().format("YYYY-MM-DD");

      const form = e.target;
      const formData = new FormData(form);
      const {
         postType,
         images_url,
         title,
         category,
         location,
         eventDate,
         name,
         email,
         description,
      } = Object.fromEntries(formData.entries());

      const postData = {
         postType,
         images_url,
         title,
         category,
         location,
         [postType === "Lost" ? "lostDate" : "foundDate"]: eventDate,
         postDate: currentDate,
         name,
         email,
         description,
         status: "pending",
      };

      axios
         .post(`${import.meta.env.VITE_serverUrl}/postItems`, postData, {
            withCredentials: true,
         })
         .then((res) => {
            if (res.data.insertedId) {
               Swal.fire({
                  title: "Successful!",
                  html: `<p className='swal-text'>Your ${postType} item has been Submitted Successfully!</p>`,
                  icon: "success",
                  draggable: true,
               });
               setThumbnailValue("");
               setTitleValue("");
               setCategoryValue("");
               setLocationValue("");
               setSelectedDate("");
               setDescriptionValue("");
            }
         })
         .catch((error) => {
            if (axios.isAxiosError(error)) {
               Swal.fire({
                  title: "Something went wrong! Try again",
                  text: error.response?.data?.message || error.message,

                  icon: "error",
               });
            } else {
               Swal.fire({
                  title: "Unexpected error occurred!",
                  text: "Please try again later.",
                  icon: "error",
               });
            }
         });
   };

   return (
      <div
         className="w-full bg-base-200 pb-10 pt-2 bg-cover object-center bg-bottom"
         style={{
            backgroundImage: `url(${formBg})`,
         }}
      >
         <div className=" lg:max-w-3xl mx-auto min-h-[calc(100vh-100px)] px-2 lg:px-0 flex items-center justify-center flex-col mb-4">
            <fieldset
               className={`fieldset shadow-lg rounded-3xl lg:w-3xl p-5 py-8 ${containerStyle}`}
            >
               <h1 className=" text-[30px] mb-8 ml-3 font-bold !font-source-serif border-b border-primary border-dashed pb-3 pr-12 max-w-max">
                  Report{" "}
                  <span className="text[28px] text-primary !font-source-serif">
                     a Lost or Found Item
                  </span>
               </h1>

               <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 lg:grid-cols-2  gap-5 px-3"
               >
                  <div className="flex flex-col gap-2 ">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        Post Type *
                     </label>

                     <select
                        name="postType"
                        className={`select  w-full focus:outline-0 !border-1 rounded-lg ${inputStyle}`}
                        value={postTypeValue}
                        onChange={(e) => setPostTypeValue(e.target.value)}
                        required
                     >
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                     </select>
                  </div>
                  <div className="flex flex-col gap-2 ">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        Image URl *
                     </label>
                     <input
                        name="images_url"
                        type="text"
                        value={thumbnailValue}
                        onChange={(e) => setThumbnailValue(e.target.value)}
                        className={`input w-full focus:outline-0 !border-1 rounded-lg ${inputStyle}`}
                        placeholder="https://..."
                        required
                     />
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        Title *
                     </label>
                     <input
                        name="title"
                        type="text"
                        className={`input w-full focus:outline-0 !border-1 rounded-lg ${inputStyle}`}
                        placeholder={`Title of ${postTypeValue} Item`}
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                        required
                     />
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        Category *
                     </label>
                     <select
                        name="category"
                        className={`select text-gray-400 w-full focus:outline-0 !border-1 rounded-lg ${inputStyle}`}
                        value={categoryValue}
                        onChange={(e) => setCategoryValue(e.target.value)}
                        required
                     >
                        <option value={""} disabled={true}>
                           {"-- Choose Category --"}
                        </option>
                        {categories.map((cat) => (
                           <option key={cat} value={cat}>
                              {cat}
                           </option>
                        ))}
                     </select>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        Location *
                     </label>
                     <input
                        name="location"
                        type="text"
                        className={`input w-full focus:outline-0 !border-1 rounded-lg ${inputStyle}`}
                        placeholder={`Where the item was ${postTypeValue} `}
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        required
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        {postTypeValue} Date *
                     </label>
                     <div
                        ref={wrapperRef}
                        className={`flex items-center justify-between !border-1 rounded-lg  pl-3 py-1 pr-1 has-[input:focus-within]:bg-[#e8f1f3] ${inputStyle}`}
                     >
                        <DatePicker
                           name="eventDate"
                           selected={selectedDate}
                           onChange={(date) => {
                              setSelectedDate(date);
                              setIsOpen(false);
                              // Close after selecting
                           }}
                           value={selectedDate}
                           open={isOpen}
                           placeholderText="Select a date"
                           className="focus:outline-none placeholder:text-sm text-sm"
                           ref={datePickerRef}
                           dateFormat="yyyy-MM-dd"
                           required
                        />
                        <button
                           type="button"
                           className={`${isClicked ? "scale-95" : "scale-100"}`}
                           onClick={() => {
                              setIsOpen((pre) => !pre);
                              setIsClicked((pre) => !pre);
                              setTimeout(() => {
                                 setIsClicked((pre) => !pre);
                              }, 100);
                           }}
                        >
                           <FcCalendar className="text-[33px]" />
                        </button>
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        Your Name *
                     </label>

                     <input
                        name="name"
                        type="text"
                        className={`input w-full focus:outline-0 !border-1 rounded-lg ${inputStyle}`}
                        placeholder={currentUser?.name}
                        value={currentUser?.name}
                        readOnly
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        Your Email
                     </label>
                     <input
                        name="email"
                        type="email"
                        className={`input w-full focus:outline-0 !border-1 rounded-lg ${inputStyle}`}
                        placeholder={currentUser?.email}
                        value={currentUser?.email}
                        readOnly
                     />
                  </div>
                  <div className="flex flex-col gap-2 lg:col-span-2">
                     <label className={`label text-sm font-semibold ${textHT}`}>
                        Description *
                     </label>
                     <textarea
                        name="description"
                        className={`textarea textarea-ghost !border-1 rounded-lg w-full ${inputStyle}`}
                        placeholder="Description"
                        value={descriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        required
                     ></textarea>
                  </div>

                  <button
                     className={`btn mt-4 lg:col-span-2 border-primary bg-primary hover:bg-[#338291] rounded-md ${btnStyle}`}
                     type="submit"
                  >
                     Add Now
                  </button>
               </form>
            </fieldset>
         </div>
      </div>
   );
};

export default AddLostAndFindItem;
