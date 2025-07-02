import React, { Suspense, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

import { BsFilterLeft } from "react-icons/bs";
import LoadingSpinner from "../Components/LoadingSpinner";
import { AuthContext } from "../Provider/AuthProvider";
import UserItemsCard from "../Components/UserItemsCard";
import axios from "axios";
import useTitle from "../Hooks/useTitle";

const getItemsData = async (email) => {
   const res = await axios.get(
      `${import.meta.env.VITE_serverUrl}/userPosts/?email=${email}`,
      {
         withCredentials: true,
      }
   );
   return res.data;
};

const MyItems = () => {
   //page title
   useTitle("Your Submitted Items");
   const { user } = useContext(AuthContext);

   const [displayItemsData, setDisplayItemsData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [reload, setReload] = useState(false);

   useEffect(() => {
      const loadData = async () => {
         setLoading(true);
         const email = user.email;
         const data = await getItemsData(email);
         setDisplayItemsData(data);
         setLoading(false);
      };
      loadData();
      if (reload) {
         loadData();
      }
   }, [setLoading, user, setDisplayItemsData, reload]);

   const handelDelete = (_id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      }).then((result) => {
         if (result.isConfirmed) {
            axios
               .delete(
                  `${import.meta.env.VITE_serverUrl}/deleteItems/?id=${_id}`,
                  {
                     withCredentials: true,
                  }
               )
               .then((res) => {
                  if (res.data.deletedCount && res.data.deletedCount > 0) {
                     Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                     });
                     setReload((pre) => !pre);
                  }
               });
         }
      });
   };

   return (
      <div className="relative">
         <div className="custom-shape-divider-bottom-1750001144">
            <svg
               data-name="Layer 1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 1200 120"
               preserveAspectRatio="none"
            >
               <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  className="shape-fill"
               ></path>
               <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  className="shape-fill"
               ></path>
               <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  className="shape-fill"
               ></path>
            </svg>
         </div>
         <div className="container lg:max-w-7xl mx-auto relative min-h-screen pb-24">
            <div className="mt-20 px-3 lg:px-0">
               <h1 className="text-3xl font-bold !font-source-serif mb-5 border-b border-primary border-dashed pb-3 max-w-md">
                  My Lost &{" "}
                  <span className="text-primary !font-source-serif">
                     Found Posts
                  </span>
               </h1>
               <p className="line-clamp-2 text-gray-500 text-sm mb-10">
                  This page displays all the items you've posted as lost or
                  found. You can easily keep track of their recovery status,
                  update details, or remove posts if needed.Whether you've lost
                  something important or helped someone by reporting a found
                  item, all your contributions are listed here.
               </p>
               <div className="flex items-center mt-5 gap-5 border-l-2 border-primary pl-1.5 mb-3">
                  <p className="flex border border-[#14b0bba8] bg-[#14b0bb5e] rounded-sm px-1 py-0.5">
                     <BsFilterLeft className="text-[32px]" />
                  </p>
               </div>
            </div>
            <div className="overflow-x-auto rounded-xl shadow-sm">
               <table className="table px-3">
                  <thead>
                     <tr className="bg-[#14b0bb63]">
                        <th className=" lg:text-lg">Image</th>
                        <th className=" lg:text-lg">Title</th>
                        <th className=" lg:text-lg">Category</th>
                        <th className="text-center lg:text-lg hidden lg:flex">
                           Location
                        </th>
                        <th className="text-center lg:text-lg">Options</th>
                     </tr>
                  </thead>
                  {
                     <tbody className="gap-2">
                        {loading ? (
                           <tr>
                              <td>
                                 <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                    <LoadingSpinner></LoadingSpinner>
                                 </div>
                              </td>
                           </tr>
                        ) : displayItemsData.length > 0 ? (
                           displayItemsData.map((item) => (
                              <UserItemsCard
                                 key={item._id}
                                 item={item}
                                 handelDelete={handelDelete}
                              ></UserItemsCard>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={5}>
                                 <div className="w-full min-h-48 flex items-center justify-center flex-col ">
                                    <h2 className="text-xl font-semibold text-gray-600">
                                       No Items Found
                                    </h2>
                                    <p className="text-gray-500 mt-2">
                                       It looks like there are no lost or found
                                       items posted yet. Please check back later
                                       or add a new post.
                                    </p>
                                 </div>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  }
               </table>
            </div>
         </div>
      </div>
   );
};

export default MyItems;
