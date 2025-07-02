import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
   return (
      <div>
         <section className="sticky w-full z-20 top-0">
            <Navbar></Navbar>
         </section>
         <section>
            <Outlet></Outlet>
         </section>
         <section>
            <Footer></Footer>
         </section>
      </div>
   );
};

export default RootLayout;
