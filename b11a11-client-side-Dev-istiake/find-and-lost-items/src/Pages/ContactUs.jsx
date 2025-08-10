import React, { useContext, useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import useTitle from "../Hooks/useTitle";
import { useLocation } from "react-router";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const ContactUs = () => {
   //scroll to top
   useTitle("Contact Us");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);

   // get theme control from Theme Context
   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   //set heading and title text style
   const textHT = darkMode ? "text-gray-200" : "text-gray-900";

   //set paragraph style
   const btnStyle = darkMode ? "text-gray-800" : "text-gray-100";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //set paragraph style
   const inputStyle = darkMode
      ? "bg-gray-600/20 hover:bg-gray-600/30 border-gray-700 text-gray-300"
      : "bg-gray-50 border-gray-200 text-gray-900";

   const formRef = useRef();
   const sendEmail = (e) => {
      e.preventDefault();

      emailjs
         .sendForm(
            "service_8bl2vxp",
            "template_yecjvuc",
            formRef.current,
            "qahIymn_Q94fKWfC3"
         )
         .then(() => {
            Swal.fire({
               icon: "success",
               title: "Message Sent",
               text: "Thank you for contacting us! We'll get back to you soon.",
               confirmButtonColor: "#75c544",
            });
            formRef.current.reset();
         })
         .catch(() => {
            Swal.fire({
               icon: "error",
               title: "Message Failed",
               text: "Oops! Something went wrong. Please try again.",
               confirmButtonColor: "#d33",
            });
         });
   };

   return (
      <div className="min-h-screen py-16 px-4 lg:px-0">
         <div className="container mx-auto max-w-6xl">
            <div className=" mb-12">
               <h1 className="text-3xl font-bold !font-source-serif mb-8 border-b border-primary border-dashed pb-3 pr-20 max-w-max">
                  Get in touch{" "}
                  <span className="text-primary !font-source-serif">
                     with us,
                  </span>
               </h1>
               <p className={`line-clamp-2 text-sm mb-10 ${pStyle}`}>
                  Have questions, feedback, or just want to say hello? We're
                  here to help you grow! Reach out using the form below or find
                  our contact details to connect directly.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
               {/* Contact Form */}
               <form
                  ref={formRef}
                  onSubmit={sendEmail}
                  className="bg-base-100 rounded-2xl shadow-md p-8 space-y-5"
               >
                  <div>
                     <label
                        className={`label text-sm mb-2 font-semibold ${textHT}`}
                     >
                        Your Name *
                     </label>
                     <input
                        type="text"
                        name="from_name"
                        placeholder="Enter your name"
                        className={`w-full px-4 py-2 rounded-lg border  ${inputStyle}`}
                        required
                     />
                  </div>
                  <div>
                     <label
                        className={`label text-sm mb-2 font-semibold ${textHT}`}
                     >
                        Your Email *
                     </label>
                     <input
                        type="email"
                        name="reply_to"
                        placeholder="Enter your email"
                        className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                        required
                     />
                  </div>
                  <div>
                     <label
                        className={`label text-sm mb-2 font-semibold ${textHT}`}
                     >
                        Your Message *
                     </label>
                     <textarea
                        name="message"
                        className={`textarea textarea-ghost !border-1 w-full rounded-lg text-gray-300 ${inputStyle}`}
                        rows="5"
                        placeholder="Write your message here..."
                        required
                     ></textarea>
                  </div>
                  <button
                     type="submit"
                     className={`bg-primary px-6 py-2 font-semibold hover:bg-green-700 transition rounded-md ${btnStyle}`}
                  >
                     Send Message
                  </button>
               </form>

               {/* Contact Info */}
               <div className="space-y-8">
                  <div className="bg-base-100 rounded-2xl shadow-md p-6 flex items-start gap-4">
                     <MdEmail className="text-3xl text-primary" />
                     <div>
                        <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                        <p className={`text-sm ${pStyle}`}>
                           support@lostify.com
                        </p>
                     </div>
                  </div>
                  <div className="bg-base-100 rounded-2xl shadow-md p-6 flex items-start gap-4">
                     <MdPhone className="text-3xl text-primary" />
                     <div>
                        <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                        <p className={`text-sm ${pStyle}`}>+880 1234 567890</p>
                     </div>
                  </div>
                  <div className="bg-base-100 rounded-2xl shadow-md p-6 flex items-start gap-4">
                     <MdLocationOn className="text-3xl text-primary" />
                     <div>
                        <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                        <p className={`text-sm ${pStyle}`}>
                           123 Green Lane, Dhaka, Bangladesh
                        </p>
                     </div>
                  </div>

                  <div className="rounded-lg overflow-hidden shadow">
                     <iframe
                        title="Google Maps"
                        className="w-full h-60 border-0"
                        src="https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen
                        loading="lazy"
                     ></iframe>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactUs;
