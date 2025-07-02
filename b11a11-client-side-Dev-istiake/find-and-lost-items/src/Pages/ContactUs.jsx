import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const ContactUs = () => {
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
      <div className="bg-[#f5fdf2] min-h-screen py-16 px-4 lg:px-0">
         <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
               <h1 className="text-3xl lg:text-5xl font-bold mb-4 font-source-serif ">
                  Get in touch with us,
                  <span className="text-primary">today</span>
               </h1>
               <p className="text-gray-600 text-sm max-w-3xl mx-auto">
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
                  className="bg-white rounded-2xl shadow-md p-8 space-y-5"
               >
                  <div>
                     <label className="block mb-1 font-semibold text-sm">
                        Your Name
                     </label>
                     <input
                        type="text"
                        name="from_name"
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                     />
                  </div>
                  <div>
                     <label className="block mb-1 font-semibold text-sm">
                        Your Email
                     </label>
                     <input
                        type="email"
                        name="reply_to"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                     />
                  </div>
                  <div>
                     <label className="block mb-1 font-semibold text-sm">
                        Your Message
                     </label>
                     <textarea
                        name="message"
                        rows="5"
                        placeholder="Write your message here..."
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                     ></textarea>
                  </div>
                  <button
                     type="submit"
                     className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
                  >
                     Send Message
                  </button>
               </form>

               {/* Contact Info */}
               <div className="space-y-8">
                  <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
                     <MdEmail className="text-3xl text-primary" />
                     <div>
                        <h3 className="font-semibold text-lg">Email Us</h3>
                        <p className="text-gray-600">support@lostify.com</p>
                     </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
                     <MdPhone className="text-3xl text-primary" />
                     <div>
                        <h3 className="font-semibold text-lg">Call Us</h3>
                        <p className="text-gray-600">+880 1234 567890</p>
                     </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
                     <MdLocationOn className="text-3xl text-primary" />
                     <div>
                        <h3 className="font-semibold text-lg">Visit Us</h3>
                        <p className="text-gray-600">
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
