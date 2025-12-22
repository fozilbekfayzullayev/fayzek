import { Link, NavLink, Outlet } from "react-router";

import { useGlobalContext } from "../hooks/useGlobalContex";

import { useLogout } from "../hooks/useLogout";

const MainLayout = () => {
  const { user } = useGlobalContext();
  const { logout } = useLogout();
  return (
    <>
      <header className="bg-stone-900 text-white p-4 flex justify-around items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">My App</Link>
        </h1>
        {!user ? (
          <div className="space-x-4">
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/register"}>Register</NavLink>
          </div>
        ) : (
          <button className="cursor-pointer" onClick={logout}>
            Logout
          </button>
        )}
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
