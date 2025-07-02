import React, { Suspense, useState, useEffect } from "react";
import { useLoaderData, useLocation } from "react-router";

import { BsFilterLeft } from "react-icons/bs";
import LoadingSpinner from "../Components/LoadingSpinner";
import ItemsCard from "../Components/AllLostAndFoundItems/ItemsCard";
import axios from "axios";
import useTitle from "../Hooks/useTitle";
import { div } from "motion/react-client";

//get categorize data promise
const getItemsData = async (category) => {
   const encodedCategory = encodeURIComponent(category);
   const res = await axios.get(
      `${
         import.meta.env.VITE_serverUrl
      }/categorizePostItem/?category=${encodedCategory}`
   );
   return res.data;
};

//get categorize data promise
const fetchSearchData = async (value) => {
   const encodedSearch = encodeURIComponent(value);
   const res = await axios.get(
      `${
         import.meta.env.VITE_serverUrl
      }/searchPostItem/?search=${encodedSearch}`
   );
   return res.data;
};

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

const LostAndFoundItems = () => {
   //scroll to top
   useTitle("All Lost & Found Items");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);

   //load and display data
   const itemsData = useLoaderData();
   const [displayItemsData, setDisplayItemsData] = useState([]);

   //control data loading state
   const [loading, setLoading] = useState(false);

   //control input field
   const [categoryValue, setCategoryValue] = useState("");
   const [searchValue, setSearchValue] = useState("");

   //control all category data
   const handelAll = () => {
      setLoading(true);
      setCategoryValue("");
      setDisplayItemsData(itemsData);
      setLoading(false);
   };

   //load categorize data
   useEffect(() => {
      const fetchData = async () => {
         if (categoryValue) {
            setLoading(true);
            const itemData = await getItemsData(categoryValue);
            setDisplayItemsData(itemData);
            setLoading(false);
         } else {
            setDisplayItemsData(itemsData);
         }
      };
      fetchData();
   }, [categoryValue, itemsData]);

   //configure search options
   useEffect(() => {
      const searchItem = async () => {
         if (searchValue) {
            setLoading(true);
            const searchItemsData = await fetchSearchData(searchValue);
            setDisplayItemsData(searchItemsData);
            setLoading(false);
         } else {
            setDisplayItemsData(itemsData);
         }
      };
      searchItem();
   }, [searchValue, itemsData]);

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
         <div className="container lg:max-w-8xl mx-auto relative pb-10 px-2 lg:px-0">
            <div className="mt-20">
               <h1 className="text-3xl font-bold !font-source-serif mb-8 border-b border-primary border-dashed pb-3 max-w-lg">
                  Browse All{" "}
                  <span className="text-primary !font-source-serif">
                     Lost & Found Items
                  </span>
               </h1>
               <p className="line-clamp-2 text-gray-500 text-sm mb-10">
                  Browse all reported lost and found items shared by our
                  community. Use the search bar to filter by title or location,
                  and sort posts by the most recent to quickly find what you're
                  looking for. If you've lost or found something, consider
                  adding your own post to help reconnect items with their
                  owners.
               </p>
               <div className="flex items-center mt-5 gap-2 md:gap-3 lg:gap-5 border-l-2 border-primary pl-1.5 mb-6">
                  <p className="flex border border-[#14b0bba8] bg-[#14b0bb5e] rounded-sm px-1 py-0.5">
                     <BsFilterLeft className="text-3xl" />
                  </p>
                  <div className="flex w-full justify-between ">
                     <div className="flex items-center gap-2 md:gap-3">
                        <button
                           onClick={() => handelAll()}
                           className={
                              "btn py-1.5 px-6 bg-[#14b0bb5e] border border-[#14b0bba8] hover:border-primary text-xs lg:text-sm rounded-sm"
                           }
                        >
                           All
                        </button>
                        <div className="select flex bg-[#14b0bb36] has-[select:focus]:outline-0 rounded-md">
                           <select
                              name="category"
                              value={categoryValue}
                              className="rounded-sm text-xs lg:text-sm"
                              onChange={(e) => setCategoryValue(e.target.value)}
                              required
                           >
                              <option value={""} disabled={true}>
                                 {"- Choose Category -"}
                              </option>
                              {categories.map((cat) => (
                                 <option key={cat} value={cat}>
                                    {cat}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div>
                        <label className="input has-[input:focus-within]:outline-0 has-[input:focus-within]:bg-[#14b0bb28] md:w-56 lg:w-sm border-[#14b0bba8]">
                           <svg
                              className="h-[1em] opacity-50 text-sm"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                           >
                              <g
                                 strokeLinejoin="round"
                                 strokeLinecap="round"
                                 strokeWidth="2.5"
                                 fill="none"
                                 stroke="currentColor"
                              >
                                 <circle cx="11" cy="11" r="8"></circle>
                                 <path d="m21 21-4.3-4.3"></path>
                              </g>
                           </svg>
                           <input
                              className="focus:outline-0 w-16 md:w-full"
                              type="search"
                              required
                              placeholder="Search"
                              value={searchValue}
                              onChange={(e) => {
                                 setSearchValue(e.target.value);
                                 setCategoryValue("");
                              }}
                           />
                        </label>
                     </div>
                  </div>
               </div>
            </div>
            <div
               className={`grid ${
                  displayItemsData.length > 0
                     ? " grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                     : "grid-cols-1"
               } gap-6 shadow-md p-6 bg-[#14b0bb50] rounded-lg mb-20`}
            >
               {loading ? (
                  <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                     <LoadingSpinner></LoadingSpinner>
                  </div>
               ) : displayItemsData.length > 0 ? (
                  displayItemsData?.map((item) => (
                     <ItemsCard key={item._id} item={item}></ItemsCard>
                  ))
               ) : (
                  <div
                     classNam
                     e="w-full min-h-48 flex items-center justify-center flex-col "
                  >
                     <h2 className="text-xl font-semibold text-gray-600">
                        No Items Found
                     </h2>
                     <p className="text-gray-500 mt-2">
                        It looks like there are no lost or found items posted
                        yet. Please check back later or add a new post.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default LostAndFoundItems;
