import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";

import { useGlobalContext } from "./hooks/useGlobalContex.jsx";

import "./App.css";

const App = () => {
  const { user, authReady } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "gallery",
          element: <GalleryPage />,
        },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "register",
      element: user ? <Navigate to="/" /> : <RegisterPage />,
    },
  ]);

  return <>{authReady && <RouterProvider router={routes} />}</>;
};

export default App;
