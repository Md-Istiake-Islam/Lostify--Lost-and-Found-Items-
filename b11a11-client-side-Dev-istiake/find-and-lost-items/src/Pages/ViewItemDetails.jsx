import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLoaderData } from "react-router";
import { IoIosTimer } from "react-icons/io";
import { IoTimerOutline } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { LuFileType } from "react-icons/lu";
import { TbCategoryPlus } from "react-icons/tb";
import { BsCheck2Circle } from "react-icons/bs";
import { BsExclamationCircle } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import formBg from "../assets/form-bg.png";
import { AuthContext } from "../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useTitle from "../Hooks/useTitle";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const ViewItemDetails = () => {
   const { user } = useContext(AuthContext);
   const itemsData = useLoaderData();

   // get theme control from Theme Context
   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   //set heading and title text style
   const textHT = darkMode ? "text-gray-200" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //set paragraph style
   const iconStyle = darkMode ? "#ccced1" : "#2f3134";

   //post data
   const {
      _id,
      postType,
      name,
      title,
      description,
      location,
      images_url,
      category,
      lostDate,
      foundDate,
      status,
   } = itemsData;

   const date = postType === "Lost" ? lostDate : foundDate;

   useTitle(`${title}`);

   //Configuration for react date-picker
   const [selectedDate, setSelectedDate] = useState(null);
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

   //configure user information
   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      const email = user ? user.email : null;
      if (user) {
         fetch(`${import.meta.env.VITE_serverUrl}/users/?email=${email}`, {
            credentials: "include",
         })
            .then((res) => res.json())
            .then((data) => {
               if (data) {
                  setCurrentUser(data);
               }
            });
      }
   }, [user]);

   //get latest items data and display
   const [latestPosts, setLatestPosts] = useState([]);

   useEffect(() => {
      fetch(`${import.meta.env.VITE_serverUrl}/latestPost/?limit=6`)
         .then((res) => res.json())
         .then((data) => {
            setLatestPosts(data);
         });
   }, [setLatestPosts]);

   // configure post status
   const [isRecovered, setIsRecovered] = useState(false);
   const [reload, setReload] = useState(false);

   useEffect(() => {
      const checkIsRecovered = () => {
         const isActive = status === "pending" ? false : true;
         setIsRecovered(isActive);
      };
      checkIsRecovered();
      if (reload) {
         checkIsRecovered();
         setReload(false);
      }
   }, [status, reload]);

   //configure report from
   const [recoveredLocationValue, setRecoveredLocationValue] = useState("");
   const modalRef = useRef(null);

   const handelReport = (e) => {
      e.preventDefault();

      //get form data
      const form = e.target;
      const formData = new FormData(form);
      const { recoveredLocation, recoveredDate } = Object.fromEntries(
         formData.entries()
      );

      //create recovered data
      const recoveredItem = {
         name: currentUser.name,
         email: currentUser.email,
         userImage: currentUser.photo,
         postType,
         status: "recovered",
         title,
         description,
         images_url,
         category,
         recoveredDate,
         recoveredLocation,
      };

      //post recover data
      axios
         .post(
            `${import.meta.env.VITE_serverUrl}/recoveredItems`,
            recoveredItem,
            {
               withCredentials: true,
            }
         )
         .then((res) => {
            if (res.data.insertedId) {
               Swal.fire({
                  title: "Successful!",
                  html: `<p className='swal-text'>Your ${postType} item has been Submitted Successfully!</p>`,
                  icon: "success",
                  draggable: true,
               });
               setRecoveredLocationValue("");
               setSelectedDate(null);
               modalRef.current?.close();
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

      const statusUpdate = {
         status: "recovered",
      };

      axios
         .patch(
            `${import.meta.env.VITE_serverUrl}/updatePost/?id=${_id}`,
            statusUpdate,
            {
               withCredentials: true,
            }
         )
         .then((res) => {
            if (res.data.matchedCount && res.data.modifiedCount > 0) {
               setIsRecovered(true);
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
      <div className="container lg:max-w-7xl mx-auto mt-14 pb-14 px-3 lg:px-0">
         <div>
            <h1 className="text-[28px] font-bold !font-source-serif border-b border-primary/80 border-dashed pb-3 max-w-xl mb-3">
               Item Information –{" "}
               <span className="text-primary !font-source-serif">
                  Reclaim or Report
               </span>
            </h1>
            <p className={`line-clamp-2 text-sm mb-10 ${pStyle}`}>
               Explore the full details of a reported lost or found item,
               including its title, category, location, date, and contact
               information. If you recognize the item or have relevant
               information, please use the provided contact details to help
               reconnect the item with its rightful owner.
            </p>
         </div>
         <div className=" relative mt-6  grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 border border-primary/30 pb-10 rounded-lg overflow-hidden">
               <div>
                  <img
                     src={images_url}
                     alt=""
                     className="aspect-[16/8] object-cover object-center"
                  />
               </div>
               <div className="w-full px-10">
                  <div className="lg:px-5 py-8 border-b border-primary/70 border-dashed w-full">
                     <h1 className="text-[28px] font-semibold text-primary-content mb-4">
                        {title}
                     </h1>
                     <div className="pl-2">
                        <p className="flex items-center gap-2 mt-2 text-xs lg:text-base !font-nunito">
                           <FaRegUserCircle className="text-primary text-xl" />
                           {name}
                        </p>
                     </div>
                     <div className="pl-2">
                        <p className="flex items-center gap-2 mt-2 text-xs lg:text-base !font-nunito">
                           <MdOutlineLocationOn className="text-primary text-xl border-b-3 border-primary rounded-sm" />
                           {location}
                        </p>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-5 w-full pl-2">
                        <div className="flex items-center gap-3 w-full lg:col-span-3">
                           <p className="flex items-center gap-2 mt-2 text-xs lg:text-base !font-nunito">
                              <LuFileType className="text-primary text-xl" />
                              {postType}
                           </p>
                           <p className="flex items-center gap-2 mt-2 text-xs lg:text-base !font-nunito">
                              <TbCategoryPlus className="text-primary text-xl" />
                              {category}
                           </p>
                        </div>
                        <div className="flex justify-start gap-3 w-full lg:col-span-2 lg:justify-end">
                           <p className="flex items-center gap-2 mt-2 text-xs lg:text-base !font-nunito">
                              {" "}
                              <IoIosTimer className="text-xl text-primary" />
                              <span className="!font-nunito font-medium">
                                 {postType === "Lost"
                                    ? "Lost on:"
                                    : "Found on:"}{" "}
                              </span>
                              {date}
                           </p>
                        </div>
                     </div>
                  </div>
                  <p
                     className={`mt-7 font-source-serif text-sm border-b border-primary/70 border-dashed pb-7 ${pStyle}`}
                  >
                     {description}
                  </p>

                  <div className="flex w-full items-center justify-between px-6">
                     <ul className="flex text-2xl gap-3 mt-3">
                        <li>
                           <a href="http://www.facebook.com" target="blank">
                              <CiFacebook
                                 style={{
                                    borderRadius: "50%",
                                    border: `1px solid ${iconStyle}`,
                                    padding: "",
                                    color: `${iconStyle}`,
                                 }}
                              />
                           </a>
                        </li>
                        <li>
                           <a href="https://x.com/home?lang=en" target="blank">
                              <FaXTwitter
                                 style={{
                                    borderRadius: "50%",
                                    border: `1px solid ${iconStyle}`,
                                    padding: "4px",
                                    color: `${iconStyle}`,
                                 }}
                              />
                           </a>
                        </li>
                        <li>
                           <a href="https://www.linkedin.com/" target="blank">
                              <GrLinkedinOption
                                 style={{
                                    borderRadius: "50%",
                                    border: `1px solid ${iconStyle}`,
                                    padding: "4px",
                                    color: `${iconStyle}`,
                                 }}
                              />
                           </a>
                        </li>
                     </ul>
                     <div className="mt-4">
                        <button
                           onClick={() => {
                              document.getElementById("my_modal_1").showModal();
                           }}
                           disabled={isRecovered}
                           className={`btn  rounded-lg ${
                              isRecovered
                                 ? "text-gray-400 border-gray-400"
                                 : "text-primary border-primary"
                           } group hover:bg-primary `}
                        >
                           {postType === "Lost" ? (
                              <BsExclamationCircle
                                 className="text-base font-bold group-hover:text-gray-700e"
                                 style={{ strokeWidth: 0.8 }}
                              />
                           ) : (
                              <BsCheck2Circle
                                 className="text-base font-bold group-hover:text-gray-700"
                                 style={{ strokeWidth: 0.8 }}
                              />
                           )}
                           <span className="mt-[1px] group-hover:text-gray-700">
                              {postType === "Lost"
                                 ? "Found This!"
                                 : "This is Mine!"}
                           </span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5">
               <h1 className="text-xl font-medium !font-jost border-b border-green-700 max-w-max pb-1.5">
                  Latest Post
               </h1>
               {latestPosts.length > 0
                  ? latestPosts.map((post) => {
                       const {
                          _id,
                          images_url,
                          postType,
                          title,
                          lostDate,
                          foundDate,
                       } = post;
                       const date = postType === "Lost" ? lostDate : foundDate;
                       return (
                          <Link
                             to={`./../../items/${_id}`}
                             onClick={() => setReload((pre) => !pre)}
                          >
                             <div key={_id} className="flex items-center gap-4">
                                <img
                                   src={images_url}
                                   alt=""
                                   className="max-w-24 aspect-[16/9]"
                                />
                                <div>
                                   <h1 className="text-sm mb-2">{title}</h1>
                                   <p
                                      className={`text-xs flex items-center gap-1 ${pStyle}`}
                                   >
                                      <IoTimerOutline />
                                      {date}
                                   </p>
                                </div>
                             </div>
                          </Link>
                       );
                    })
                  : ""}
            </div>
            <dialog id="my_modal_1" className="modal" ref={modalRef}>
               <div
                  className="modal-box bg-cover object-center bg-bottom py-10 px-8 max-w-xl"
                  style={{
                     backgroundImage: `url(${formBg})`,
                  }}
               >
                  <form method="dialog">
                     {/* if there is a button in form, it will close the modal */}
                     <button className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2 hover:bg-primary hover:!border-none">
                        ✕
                     </button>
                  </form>
                  <h3 className="font-extrabold  text-3xl text-gray-100 !font-nunito text-center">
                     {postType === "Lost"
                        ? "Report Item as Found"
                        : "Claim Found Item"}
                  </h3>
                  <p className="py-4 text-gray-100 !font-nunito text-center">
                     Please confirm the recovery details. These will be used to
                     mark the item as returned.
                  </p>
                  <div className="w-full">
                     <form onSubmit={handelReport} className="w-full ">
                        <fieldset className="fieldset bg-[#d0eff125] border-primary rounded-box w-full border p-4 mt-6">
                           <label className="label text-white text-sm">
                              Recovered Location
                           </label>
                           <input
                              name="recoveredLocation"
                              type="text"
                              className="input w-full bg-[#cee7e9] border-primary text-gray-950"
                              placeholder="Enter the location where the item was returned"
                              value={recoveredLocationValue}
                              onChange={(e) =>
                                 setRecoveredLocationValue(e.target.value)
                              }
                              required
                           />
                           <div className="flex flex-col gap-2 mt-3">
                              <label className="label text-sm text-white font-medium">
                                 Recovered Date
                              </label>
                              <div
                                 ref={wrapperRef}
                                 className="flex items-center justify-between !border-2 border-primary rounded-lg bg-[#cee7e9]  pl-3 py-1 pr-1  has-[input:focus-within]:bg-[#e8f1f3]"
                              >
                                 <DatePicker
                                    name="recoveredDate"
                                    selected={selectedDate}
                                    onChange={(date) => {
                                       setSelectedDate(date);
                                       setIsOpen(false);
                                       // Close after selecting
                                    }}
                                    value={selectedDate}
                                    open={isOpen}
                                    placeholderText="Select the recovery date"
                                    className="focus:outline-none placeholder:text-sm text-sm text-gray-950"
                                    ref={datePickerRef}
                                    dateFormat="yyyy-MM-dd"
                                    required
                                 />
                                 <button
                                    type="button"
                                    className={`${
                                       isClicked ? "scale-95" : "scale-100"
                                    }`}
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

                           <label className="label text-white text-sm mt-3">
                              Name
                           </label>
                           <input
                              type="text"
                              value={currentUser && currentUser.name}
                              readOnly
                              className="input w-full bg-[#cee7e9] border-primary text-gray-950"
                           />
                           <label className="label text-white text-sm mt-3">
                              Email
                           </label>
                           <input
                              type="email"
                              value={currentUser && currentUser.email}
                              readOnly
                              className="input w-full bg-[#cee7e9] border-primary text-gray-950"
                           />
                           <div className="mt-4 flex items-center gap-3 w-full justify-end">
                              <p className="text-blue-900 !font-nunito text-base font-medium">
                                 This is your profile
                              </p>
                              <img
                                 src={currentUser && currentUser.photo}
                                 alt="User Avatar"
                                 className="w-12 h-12 rounded-full border-2 border-white"
                              />
                           </div>
                        </fieldset>
                        <div className="modal-action">
                           <button className="btn border-[#14b1bb] text-[#14b1bb] shadow-none bg-transparent hover:bg-[#14b1bb] hover:text-white px-8 rounded-lg">
                              Submit
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </dialog>
         </div>
      </div>
   );
};

export default ViewItemDetails;
