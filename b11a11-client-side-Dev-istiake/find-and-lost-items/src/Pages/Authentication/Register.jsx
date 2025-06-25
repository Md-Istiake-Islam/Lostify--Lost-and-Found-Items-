import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useTitle from "../../Hooks/useTitle";

const Register = () => {
   //scroll to top
   useTitle("All Lost & Found Items");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);
   //page title
   useTitle("Login to enjoy full feature");

   //page location
   const location = useLocation();
   const navigate = useNavigate();

   //context api
   const { createUser, setUser, googleSignIn } = useContext(AuthContext);

   //state management
   const [password, setPassword] = useState("");
   const [isValid, setIsValid] = useState(true);
   const [showPassword, setShowPassword] = useState(false);

   //password verification
   const validatePassword = (value) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
      return regex.test(value);
   };
   const handleChange = (e) => {
      const value = e.target.value;
      setPassword(value);
      setIsValid(validatePassword(value));
   };

   //Register Function configuration
   const handelRegister = (e) => {
      e.preventDefault();

      if (!isValid) {
         return;
      }

      const from = e.target;
      const fromData = new FormData(from);
      const { email, password, ...user } = Object.fromEntries(
         fromData.entries()
      );
      const userData = {
         email,
         ...user,
      };

      createUser(email, password)
         .then((result) => {
            const user = result.user;
            setUser(user);
            fetch("https://b11a11-server-side-dev-istiake.vercel.app/users", {
               method: "POST",
               headers: {
                  "content-type": "application/json",
               },
               body: JSON.stringify(userData),
            })
               .then((res) => res.json())
               .then((data) => {
                  if (data.insertedId) {
                     Swal.fire({
                        title: "Your account created successfully",
                        html: "<p class='swal-text'>Thank you for creating an account with us!</p>",
                        icon: "success",
                        draggable: true,
                     });
                     navigate(`${location.state ? location.state : "/"}`);
                  }
               });
         })
         .catch((error) => {
            const errorMessage = error.message;
            if (errorMessage) {
               Swal.fire({
                  title: "Your account already registered",
                  html: `<p class='swal-text'>${errorMessage}</p>`,
                  icon: "error",
                  draggable: true,
               });
               navigate(`${location.state ? location.state : "/"}`);
            }
         });
   };

   //google sign in method
   const handelGoogleSignIn = () => {
      googleSignIn()
         .then((result) => {
            const user = result.user;
            setUser(user);
            const { displayName, email, photoURL } = user;
            const userData = {
               name: displayName,
               email,
               photo: photoURL,
            };
            fetch(
               `https://b11a11-server-side-dev-istiake.vercel.app/users/?email=${email}`,
               {
                  credentials: "include",
               }
            )
               .then((res) => res.json())
               .then((data) => {
                  if (data) {
                     Swal.fire({
                        title: "login successfully",
                        icon: "success",
                        draggable: true,
                     });
                     navigate(`${location.state ? location.state : "/"}`);
                  }
               })
               .catch((error) => {
                  const errorMessage = error.message;
                  if (errorMessage) {
                     fetch(
                        "https://b11a11-server-side-dev-istiake.vercel.app/users",
                        {
                           method: "POST",
                           headers: {
                              "content-type": "application/json",
                           },
                           body: JSON.stringify(userData),
                        }
                     )
                        .then((res) => res.json())
                        .then((data) => {
                           if (data.insertedId) {
                              Swal.fire({
                                 title: "login successfully",
                                 icon: "success",
                                 draggable: true,
                              });
                              navigate(
                                 `${location.state ? location.state : "/"}`
                              );
                           }
                        });
                  }
               });
         })
         .catch((error) => {
            const errorMessage = error.message;
            if (errorMessage) {
               Swal.fire({
                  title: "Your account created successfully",
                  html: `<p class='swal-text'>${errorMessage}</p>`,
                  icon: "error",
                  draggable: true,
               });
            }
         });
   };

   return (
      <div className="min-h-screen container mx-auto flex items-center justify-center py-8">
         <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <div className="card-body px-14 pb-10 gap-0">
               {/* page title */}
               <div className="flex items-center justify-center border-b border-primary mb-5 py-5">
                  <h1 className="text-center text-[26px] font-semibold !font-jost">
                     <span className="text-primary !font-jost">Register</span>{" "}
                     your account
                  </h1>
               </div>
               {/* signin form */}
               <form onSubmit={handelRegister}>
                  <fieldset className="fieldset w-full">
                     {/* name */}
                     <label className="label text-base text-gray-700 !font-jost font-medium">
                        Name
                     </label>
                     <input
                        name="name"
                        type="text"
                        className="input mb-3 w-full focus:outline-0 focus:border-primary"
                        placeholder="Name"
                        required
                     />
                     {/* photo */}
                     <label className="label text-base text-gray-700 !font-jost font-medium">
                        Photo URL
                     </label>
                     <input
                        name="photo"
                        type="text"
                        className="input mb-3 w-full focus:outline-0 focus:border-primary0"
                        placeholder="Photo Url"
                        required
                     />
                     {/* email */}
                     <label className="label text-base text-gray-700 !font-jost font-medium">
                        Email
                     </label>
                     <input
                        name="email"
                        type="email"
                        className="input mb-3 w-full focus:outline-0 focus:border-primary"
                        placeholder="Email"
                        required
                     />
                     {/* password */}
                     <label className="label text-base text-gray-700 !font-jost font-medium">
                        Password
                     </label>
                     <div className="relative flex items-center">
                        <input
                           name="password"
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={handleChange}
                           className="input mb-1 w-full focus:outline-0 focus:border-primary"
                           placeholder="Password"
                           required
                        />

                        <button
                           onClick={() => {
                              setShowPassword((prev) => !prev);
                           }}
                           type="button"
                           className="absolute right-3 z-50"
                        >
                           {showPassword ? (
                              <AiFillEyeInvisible className="text-xl" />
                           ) : (
                              <AiFillEye className="text-xl" />
                           )}
                        </button>
                     </div>

                     {!isValid && (
                        <p style={{ color: "red" }}>
                           Password must have at least 6 characters, including
                           one uppercase and one lowercase letter.
                        </p>
                     )}
                     {/* button for register */}
                     <button
                        type="submit"
                        className="btn bg-primary hover:bg-[#0e7c83] text-white mt-4"
                     >
                        Register
                     </button>
                     <p className="text-center mt-4">
                        Already have an account ?{" "}
                        <Link to={"../login"} className="text-red-600">
                           Login Now
                        </Link>
                     </p>
                  </fieldset>
               </form>
               {/* button for google signin */}
               <button
                  onClick={() => {
                     handelGoogleSignIn();
                  }}
                  className="btn bg-transparent text-primary hover:bg-primary hover:text-white mt-4 border border-primary"
               >
                  <FcGoogle className="text-1xl" /> Login with Google
               </button>
            </div>
         </div>
      </div>
   );
};

export default Register;
