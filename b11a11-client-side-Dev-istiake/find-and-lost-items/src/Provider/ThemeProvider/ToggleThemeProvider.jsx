import React, { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const ToggleThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState("light");

   useEffect(() => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
   }, []);

   const toggleTheme = (e) => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
   };
   <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
   </button>;

   const ThemeData = {
      theme,
      toggleTheme,
   };

   return (
      <ThemeContext.Provider value={ThemeData}>
         {children}
      </ThemeContext.Provider>
   );
};

export default ToggleThemeProvider;
