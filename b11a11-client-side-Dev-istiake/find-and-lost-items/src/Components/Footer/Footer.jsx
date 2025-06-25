import React, { useContext } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { GrLinkedinOption } from "react-icons/gr";
import { FaGooglePlusG } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, NavLink } from "react-router";
import { MdPhoneMissed } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineWrongLocation } from "react-icons/md";

const Footer = () => {
   const { user } = useContext(AuthContext);
   const privateLinks = (
      <>
         <li className="text-white rounded-lg">
            <Link
               to={`./allRecovered`}
               className={"!font-nunito p-0 rounded-lg hover:text-primary"}
            >
               <p className="text-sm xl:text-sm !font-source-serif font-light mb-1.5">
                  All Recovered Items
               </p>
            </Link>
         </li>
         <li className="text-white rounded-lg">
            <Link
               to={`./myItems`}
               className={"!font-nunito p-0 rounded-lg hover:text-primary"}
            >
               <p className="text-sm xl:text-sm !font-source-serif font-light mb-1.5">
                  Manage My Items
               </p>
            </Link>
         </li>
      </>
   );

   const links = (
      <>
         <li className="text-white rounded-lg">
            <Link
               to={"/"}
               className={"!font-nunito p-0 rounded-lg hover:text-primary"}
            >
               <p className="text-sm xl:text-sm !font-source-serif font-light mb-1.5">
                  Home
               </p>
            </Link>
         </li>
         <li className="text-white rounded-lg">
            <Link
               to={`./allItems`}
               className={"!font-nunito p-0 rounded-lg hover:text-primary"}
            >
               <p className="text-sm xl:text-sm !font-source-serif font-light mb-1.5">
                  Lost & Found Items
               </p>
            </Link>
         </li>
      </>
   );

   return (
      <div className={`w-full bg-stone-800`}>
         <div className="">
            <footer className="footer sm:footer-horizontal p-10 text-base-300 container mx-auto lg:max-w-[1200px] px-3">
               <nav>
                  <h6 className="text-1xl font-semibold mb-3 text-gray-100">
                     About us
                  </h6>
                  <p className="max-w-46 text-sm font-open-sans leading-6 text-gray-300">
                     Welcome to the new online depository for missing items and
                     people.
                  </p>
                  <nav className="md:place-self-start mt-3">
                     <div className="mb-3">
                        <ul className="grid grid-flow-col  text-3xl gap-3">
                           <li>
                              <a href="http://www.facebook.com" target="blank">
                                 <CiFacebook
                                    style={{
                                       borderRadius: "50%",
                                       border: "1px solid white",
                                       padding: "",
                                       color: "white",
                                       fontSize: "28px",
                                    }}
                                 />
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://x.com/home?lang=en"
                                 target="blank"
                              >
                                 <FaXTwitter
                                    style={{
                                       borderRadius: "50%",
                                       border: "1px solid white",
                                       padding: "4px",
                                       color: "white",
                                       fontSize: "28px",
                                    }}
                                 />
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://www.linkedin.com/"
                                 target="blank"
                              >
                                 <GrLinkedinOption
                                    style={{
                                       borderRadius: "50%",
                                       border: "1px solid white",
                                       padding: "4px",
                                       color: "white",
                                       fontSize: "28px",
                                    }}
                                 />
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://myaccount.google.com/"
                                 target="blank"
                              >
                                 <FaGooglePlusG
                                    style={{
                                       borderRadius: "50%",
                                       border: "1px solid white",
                                       padding: "4px",
                                       color: "white",
                                       fontSize: "28px",
                                    }}
                                 />
                              </a>
                           </li>
                        </ul>
                     </div>
                  </nav>
               </nav>

               <nav>
                  <h6 className="text-1xl font-semibold mb-2 text-gray-100">
                     Legal
                  </h6>
                  <a className="text-sm xl:text-sm !font-source-serif font-light text-gray-300">
                     Terms of use
                  </a>
                  <a className="text-sm xl:text-sm !font-source-serif font-light text-gray-300">
                     Privacy policy
                  </a>
                  <a className="text-sm xl:text-sm !font-source-serif font-light text-gray-300">
                     Cookie policy
                  </a>
               </nav>
               <nav>
                  <h1 className="text-1xl font-semibold mb-1 text-gray-100">
                     Quick Links
                  </h1>
                  <ul className="menu menu-horizontal flex flex-col items-start p-0">
                     {links}
                     {user ? privateLinks : ""}
                  </ul>
               </nav>
               <nav>
                  <h6 className="text-1xl font-semibold mb-2 text-gray-100">
                     Quick contact
                  </h6>
                  <a className="text-sm xl:text-sm !font-source-serif font-light flex items-center gap-2 text-gray-300">
                     <MdOutlineWrongLocation />
                     10/2 Mohakahli, Dhaka, Bangladesh
                  </a>
                  <a className="text-sm xl:text-sm !font-source-serif font-light flex items-center gap-2 text-gray-300">
                     <MdPhoneMissed />
                     +880 017231038456
                  </a>
                  <a className="text-sm xl:text-sm !font-source-serif font-light flex items-center gap-2 text-gray-300">
                     <TfiEmail />
                     Email: garden.community@gmail.com
                  </a>
               </nav>
            </footer>
            <div className="border-gray-700 border-t ">
               <footer className="container mx-auto footer text-base-300 px-3 py-4 gap-5 lg:gap-0 lg:max-w-[1200px]">
                  <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                     <div className="flex items-center">
                        <img src={logo} alt="" className="w-30" />
                     </div>

                     <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right flex items-center">
                        <p>© {new Date().getFullYear()} All rights reserved.</p>
                        <p>Built with Lostify community teams</p>
                     </div>
                  </div>
               </footer>
            </div>
         </div>
      </div>
   );
};

export default Footer;
