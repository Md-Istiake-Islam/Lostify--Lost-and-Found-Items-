import React from "react";
import Banner from "../Components/Banner/Banner";
import { useLoaderData } from "react-router";
import LatestPost from "../Components/LetestPost/LatestPost";
import AboutLostify from "../Components/AboutLostify/AboutLostify";
import HowItWorks from "../Components/HowItWorks";
import useTitle from "../Hooks/useTitle";
import AllCategories from "../Components/AllCategories";
import MarqueeSection from "../Components/MarqueeSection";

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
         <section className="bg-base-200 ">
            <MarqueeSection></MarqueeSection>
         </section>
         <section className="bg-base-200 py-6">
            <AllCategories></AllCategories>
         </section>
         <section className="bg-base-200 pb-20 pt-6">
            <LatestPost></LatestPost>
         </section>
         <section className="bg-base-200">
            <HowItWorks></HowItWorks>
         </section>
      </div>
   );
};

export default HomePage;
