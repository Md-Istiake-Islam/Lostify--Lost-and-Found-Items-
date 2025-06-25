import React from "react";
import PageNotFoundImg from "../../assets/page-found-error-404-landing.jpg";
import { useNavigate } from "react-router";
import { LuTriangleAlert } from "react-icons/lu";
import useTitle from "../../Hooks/useTitle";

const PageNotFound = () => {
   //page title
   useTitle("Page not found");
   const navigate = useNavigate();

   return (
      <div
         className="mx-auto bg-base-200 min-h-screen rounded-2xl flex flex-col items-center justify-center p-15 gap-6 w-full bg-no-repeat bg-cover bg-center"
         style={{
            backgroundImage: `url(${PageNotFoundImg})`,
         }}
      >
         <div className="overflow-hidden ">
            <LuTriangleAlert className="text-9xl text-amber-300" />
         </div>
         <div className="flex flex-col items-center ">
            <h1 className="text-red-500 text-3xl font-extrabold mb-3">
               404 - Page Not Found
            </h1>
            <p className="text-base text-gray-500 mb-5">
               Opps! Page you are looking for doesn't exist
            </p>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto text-center mb-5">
               The page you're looking for might have been removed, renamed, or
               doesn't exist.
            </p>
            <button
               onClick={() => navigate("/")}
               className="btn bg-primary text-white rounded-3xl px-6 border-0 outline-none hover:bg-[#0e7c83]"
            >
               {" "}
               Back to Home
            </button>
         </div>
      </div>
   );
};

export default PageNotFound;
