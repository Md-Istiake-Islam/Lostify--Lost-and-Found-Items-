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
                  "https://b11a11-server-side-dev-istiake.vercel.app/sliderItems"
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
                  "https://b11a11-server-side-dev-istiake.vercel.app/postItems"
               );
               return res.json();
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
                  `https://b11a11-server-side-dev-istiake.vercel.app/viewDetails/?id=${params.id}`,
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
                  `https://b11a11-server-side-dev-istiake.vercel.app/viewDetails/?id=${id}`,
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
                  "https://b11a11-server-side-dev-istiake.vercel.app/recoveredItems",
                  {
                     withCredentials: true,
                  }
               );
               return res.data;
            },
         },
      ],
   },
]);

export default Routes;
