import React, { Suspense, useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ItemsCard from "../AllLostAndFoundItems/ItemsCard";
import axios from "axios";
import { Link } from "react-router";

//get categorize data promise
const fetchLatestPost = async (value) => {
   const res = await axios.get(
      `https://b11a11-server-side-dev-istiake.vercel.app/latestPost/?limit=${value}`
   );
   return res.data;
};

const LatestPost = () => {
   const [displayItemsData, setDisplayItemsData] = useState([]);

   //control data loading state
   const [loading, setLoading] = useState(false);

   //load categorize data
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const itemData = await fetchLatestPost("6");
         setDisplayItemsData(itemData);
         setLoading(false);
      };
      fetchData();
   }, []);

   return (
      <div className="container lg:max-w-8xl mx-auto relative mb-10 px-2 lg:px-0">
         <div className="">
            <h1 className="text-3xl font-bold !font-source-serif mb-5 border-b border-primary border-dashed pb-3 max-w-lg">
               Browse All{" "}
               <span className="text-primary !font-source-serif">
                  Latest Posts
               </span>
            </h1>
            <p className="line-clamp-2 text-gray-500 text-sm mb-10">
               Browse all reported lost and found items shared by our community.
               Use the search bar to filter by title or location, and sort posts
               by the most recent to quickly find what you're looking for. If
               you've lost or found something, consider adding your own post to
               help reconnect items with their owners.
            </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 rounded-lg mb-10">
            {loading ? (
               <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <LoadingSpinner></LoadingSpinner>
               </div>
            ) : (
               displayItemsData.map((item) => (
                  <ItemsCard key={item._id} item={item}></ItemsCard>
               ))
            )}
         </div>
         <div className="w-full flex justify-center relative before:content-[''] before:bg-primary before:py-[1px] before:w-27 sm:before:w-40 lg:before:w-52 before:absolute before:left-[12%] sm:before:left-[8%] md:before:left-[15%] lg:before:left-[19%] xl:before:left-[25%] 2xl:before:left-[30%] before:top-[50%] before:-translate-y-[50%] after:content-[''] after:bg-primary after:py-[1px] after:w-27 sm:after:w-40 lg:after:w-52 after:absolute after:left-[68.5%] sm:after:left-[66%] md:after:left-[64%] lg:after:left-[60.5%] xl:after:left-[58.5%] 2xl:after:left-[56.5%] after:top-[50%] after:-translate-y-[50%]  ">
            <Link to={`./allItems`}>
               <button className="btn px-12 border-primary text-lg font-medium text-white bg-primary ">
                  View All
               </button>
            </Link>
         </div>
      </div>
   );
};

export default LatestPost;
