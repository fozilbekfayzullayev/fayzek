import React from "react";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={true} />
      HomePage
    </div>
  );
};

export default HomePage;
