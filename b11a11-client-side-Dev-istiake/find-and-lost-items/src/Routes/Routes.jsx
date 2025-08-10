import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import HomePage from "../Pages/HomePage";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import LoadingSpinner from "../Components/LoadingSpinner";
import AddLostAndFindItem from "../Pages/AddLostAndFindItem";
import PrivateRoutes from "../Provider/PrivateRoutes";
import LostAndFoundItems from "../Pages/LostAndFoundItems";
import ViewItemDetails from "../Pages/ViewItemDetails";
import axios from "axios";
import MyItems from "../Pages/MyItems";
import UpdatePost from "../Pages/UpdatePost";
import RecoveredItems from "../Pages/RecoveredItems";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import SafetyTips from "../Pages/SafetyTips";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import UserProfilePage from "../Pages/ProfilePage";
import EditProfilePage from "../Pages/EditProfilePage";

const Routes = createBrowserRouter([
   {
      path: "/",
      Component: RootLayout,
      errorElement: <PageNotFound />,
      children: [
         {
            index: true,
            Component: HomePage,
            hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
            loader: async () => {
               const res = await fetch(
                  `${import.meta.env.VITE_serverUrl}/sliderItems`
               );
               return res.json();
            },
         },
         {
            path: "register",
            Component: Register,
         },
         {
            path: "login",
            Component: Login,
         },
         {
            path: "addItems",
            element: (
               <PrivateRoutes>
                  <AddLostAndFindItem></AddLostAndFindItem>
               </PrivateRoutes>
            ),
         },
         {
            path: "allItems",
            Component: LostAndFoundItems,
            hydrateFallbackElement: <LoadingSpinner />,
            loader: async () => {
               const res = await fetch(
                  `${import.meta.env.VITE_serverUrl}/postItems`
               );
               return res.json();
            },
         },
         {
            path: "categorize-item/:cat",
            Component: LostAndFoundItems,
            hydrateFallbackElement: <LoadingSpinner />,
            loader: async ({ params }) => {
               const encodedCategory = encodeURIComponent(params.cat);
               const res = await axios.get(
                  `${
                     import.meta.env.VITE_serverUrl
                  }/categorizePostItem/?category=${encodedCategory}`
               );
               return res.data;
            },
         },
         {
            path: "items/:id",
            element: (
               <PrivateRoutes>
                  <ViewItemDetails></ViewItemDetails>
               </PrivateRoutes>
            ),
            hydrateFallbackElement: <LoadingSpinner />,
            loader: async ({ params }) => {
               const res = await axios.get(
                  `${import.meta.env.VITE_serverUrl}/viewDetails/?id=${
                     params.id
                  }`,
                  {
                     withCredentials: true,
                  }
               );
               return res.data;
            },
         },
         {
            path: "myItems",
            element: (
               <PrivateRoutes>
                  <MyItems></MyItems>
               </PrivateRoutes>
            ),
         },
         {
            path: "updateItems/:id",
            element: (
               <PrivateRoutes>
                  <UpdatePost></UpdatePost>
               </PrivateRoutes>
            ),
            hydrateFallbackElement: <LoadingSpinner />,
            loader: async ({ params }) => {
               const id = params.id;
               const res = await axios.get(
                  `${import.meta.env.VITE_serverUrl}/viewDetails/?id=${id}`,
                  { withCredentials: true }
               );
               return res.data;
            },
         },
         {
            path: "allRecovered",
            element: (
               <PrivateRoutes>
                  <RecoveredItems></RecoveredItems>
               </PrivateRoutes>
            ),
            hydrateFallbackElement: <LoadingSpinner />,
            loader: async () => {
               const res = await axios.get(
                  `${import.meta.env.VITE_serverUrl}/recoveredItems`,
                  {
                     withCredentials: true,
                  }
               );
               return res.data;
            },
         },
         {
            path: "user-profile",
            Component: UserProfilePage,
         },
         {
            path: "update-profile",
            Component: EditProfilePage,
         },
         {
            path: "tips",
            Component: SafetyTips,
         },
         {
            path: "about-us",
            Component: AboutUs,
         },
         {
            path: "contact-us",
            Component: ContactUs,
         },
      ],
   },
]);

export default Routes;
