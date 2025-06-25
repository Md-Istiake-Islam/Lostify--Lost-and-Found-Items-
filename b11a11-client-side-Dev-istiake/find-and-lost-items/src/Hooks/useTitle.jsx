import React, { useEffect } from "react";

const useTitle = (title) => {
   useEffect(() => {
      document.title = `${title} | Lostify`;
   }, [title]);
};

export default useTitle;
