import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

import CustomCursor from "../components/CustomCursor";

const MainLayout = () => {
  return (
    <>
      <CustomCursor />

      <main>
        <Toaster
          toastOptions={{
            className: "text-sm",
          }}
        />
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
