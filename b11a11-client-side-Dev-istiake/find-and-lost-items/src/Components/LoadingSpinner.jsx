import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingSpinner = () => {
   return (
      <div className="flex justify-center items-center min-h-screen ">
         <Box
            sx={{
               width: 300,
            }}
         >
            <Skeleton
               sx={{ bgcolor: "grey.400", height: 25, borderRadius: 1 }}
            />
            <Skeleton
               animation="wave"
               sx={{ bgcolor: "grey.500", height: 25, borderRadius: 1 }}
            />
            <Skeleton
               animation={false}
               sx={{ bgcolor: "grey.400", height: 25, borderRadius: 1 }}
            />
         </Box>
      </div>
   );
};

export default LoadingSpinner;
