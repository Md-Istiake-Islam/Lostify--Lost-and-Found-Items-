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
   //context api
   const { user } = useContext(AuthContext);

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
            <div className="mb-10">
               <h1 className="text-white text-4.5xl font-bold font-nunito">
                  Report a Lost or Found Item
               </h1>
            </div>
            <fieldset className="fieldset bg-base-100 shadow-lg rounded-3xl lg:w-3xl p-5 py-10 ">
               {/* <legend className="fieldset-legend text-[30px] text-center !text-gray-900">
                  Report{" "}
                  <span className="text[28px] text-primary">
                     a Lost or Found Item
                  </span>
               </legend> */}

               <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 lg:grid-cols-2  gap-5 px-3"
               >
                  <div className="flex flex-col gap-2 lg:col-span-2">
                     <label className="label text-base text-gray-900 font-medium">
                        Post Type
                     </label>

                     <select
                        name="postType"
                        className="select text-gray-900 w-full focus:outline-0 !border-2 border-gray-300 rounded-lg"
                        value={postTypeValue}
                        onChange={(e) => setPostTypeValue(e.target.value)}
                        required
                     >
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                     </select>
                  </div>
                  <div className="flex flex-col gap-2 lg:col-span-2">
                     <label className="label text-base text-gray-900 font-medium">
                        Image URl
                     </label>
                     <input
                        name="images_url"
                        type="text"
                        value={thumbnailValue}
                        onChange={(e) => setThumbnailValue(e.target.value)}
                        className="input w-full focus:outline-0 !border-2 border-gray-300 rounded-lg"
                        placeholder="https://..."
                        required
                     />
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="label text-base text-gray-900 font-medium">
                        Title
                     </label>
                     <input
                        name="title"
                        type="text"
                        className="input w-full focus:outline-0 !border-2 border-gray-300 rounded-lg"
                        placeholder={`Title of ${postTypeValue} Item`}
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                        required
                     />
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="label text-base text-gray-900 font-medium">
                        Category
                     </label>
                     <select
                        name="category"
                        className="select text-gray-400 w-full focus:outline-0 !border-2 border-gray-300 rounded-lg"
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
                     <label className="label text-base text-gray-900 font-medium">
                        Location
                     </label>
                     <input
                        name="location"
                        type="text"
                        className="input w-full focus:outline-0 !border-2 border-gray-300 rounded-lg"
                        placeholder={`Where the item was ${postTypeValue} `}
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        required
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="label text-base text-gray-900 font-medium">
                        {postTypeValue} Date
                     </label>
                     <div
                        ref={wrapperRef}
                        className="flex items-center justify-between !border-2 border-gray-300 rounded-lg bg-transparent pl-3 py-1 pr-1  has-[input:focus-within]:bg-[#e8f1f3]"
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
                     <label className="label text-base text-gray-900 font-medium ">
                        Your Name
                     </label>

                     <input
                        name="name"
                        type="text"
                        className="input w-full bg-transparent focus:outline-0 !border-2 border-gray-300 rounded-lg"
                        placeholder={user.displayName}
                        value={user.displayName}
                        readOnly
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="label text-base text-gray-900 font-medium">
                        Your Email
                     </label>
                     <input
                        name="email"
                        type="email"
                        className="input w-full focus:outline-0 !border-2 border-gray-300 rounded-lg"
                        placeholder={user.email}
                        value={user.email}
                        readOnly
                     />
                  </div>
                  <div className="flex flex-col gap-2 lg:col-span-2">
                     <label className="label text-base text-gray-900 font-medium">
                        Description
                     </label>
                     <textarea
                        name="description"
                        className="textarea textarea-ghost !border-2 border-gray-300 rounded-lg w-full"
                        placeholder="Description"
                        value={descriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        required
                     ></textarea>
                  </div>

                  <button
                     className="btn mt-4 lg:col-span-2 border-primary bg-primary text-white hover:bg-[#338291]  rounded-md "
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
