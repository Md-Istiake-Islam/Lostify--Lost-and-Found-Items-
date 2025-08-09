import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Routes from "./Routes/Routes";
import AuthProvider from "./Provider/AuthProvider";
import ToggleThemeProvider from "./Provider/ThemeProvider/ToggleThemeProvider";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <ToggleThemeProvider>
         <AuthProvider>
            <RouterProvider router={Routes}></RouterProvider>
         </AuthProvider>
      </ToggleThemeProvider>
   </StrictMode>
);
