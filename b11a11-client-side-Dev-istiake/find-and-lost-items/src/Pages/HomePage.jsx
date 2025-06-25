import React from "react";
import Banner from "../Components/Banner/Banner";
import { useLoaderData } from "react-router";
import LatestPost from "../Components/LetestPost/LatestPost";
import AboutLostify from "../Components/AboutLostify/AboutLostify";
import HowItWorks from "../Components/HowItWorks";
import useTitle from "../Hooks/useTitle";

const HomePage = () => {
   //page title
   useTitle("Dashboard");

   //Import sliderData from loader response
   const sliderData = useLoaderData();

   return (
      <div>
         <section className="flex">
            <Banner sliderData={sliderData}></Banner>
         </section>
         <section className="bg-base-200 py-14 lg:py-24">
            <AboutLostify></AboutLostify>
         </section>
         <section className="bg-base-300 py-20">
            <LatestPost></LatestPost>
         </section>
         <section>
            <HowItWorks></HowItWorks>
         </section>
      </div>
   );
};

export default HomePage;
