import { useEffect, useState } from "react";

const useFormatDate = (dateString) => {
   const [formattedDateTime, setFormattedDateTime] = useState(null);
   const [formattedTime, setFormattedTime] = useState(null);
   const [formattedDate, setFormattedDate] = useState(null);

   useEffect(() => {
      if (!dateString) return;

      const date = new Date(dateString);

      const formattedDateAndTime = date.toLocaleDateString("en-US", {
         weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
         hour: "numeric",
         minute: "2-digit",
         hour12: true,
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
         hour: "numeric",
         minute: "2-digit",
         hour12: true,
      });
      const formattedDate = date.toLocaleDateString("en-US", {
         weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
      });

      setFormattedDate(formattedDate);
      setFormattedTime(formattedTime);
      setFormattedDateTime(formattedDateAndTime);
   }, [dateString]);

   return { formattedDate, formattedTime, formattedDateTime };
};

export default useFormatDate;
