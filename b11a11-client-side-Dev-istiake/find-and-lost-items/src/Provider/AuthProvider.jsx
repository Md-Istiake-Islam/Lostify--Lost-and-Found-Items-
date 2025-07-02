import React, { createContext, useEffect, useState } from "react";
import {
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   // Function to create new user
   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   // Sign in function
   const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   //sign out function
   const logOut = () => {
      return signOut(auth);
   };

   //sign in with google
   const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, provider);
   };

   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
         if (currentUser?.email) {
            const userData = { email: currentUser.email };
            axios
               .post(`${import.meta.env.VITE_serverUrl}/jwt`, userData, {
                  withCredentials: true,
               })
               .then((res) => {
                  console.log(res.data);
               })
               .catch((error) => {
                  console.log(error.message);
               });
         }
      });
      // Cleanup subscription on unmount
      // This is important to prevent memory leaks and ensure that the listener is removed when the component unmounts
      return () => {
         unSubscribe();
      };
   }, []);

   const AuthData = {
      user,
      setUser,
      loading,
      setLoading,
      createUser,
      signIn,
      logOut,
      googleSignIn,
   };

   return <AuthContext value={AuthData}>{children}</AuthContext>;
};

export default AuthProvider;
