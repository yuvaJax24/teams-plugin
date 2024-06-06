import React, { useEffect, useState } from "react";
import { menuList } from "./menuList";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const Navbar = () => {
  const { instance } = useMsal();
  const isSiggedIn = useIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
  const hideHeaderforRoute = ["/login"];

  useEffect(() => {
    setActiveMenu(location?.pathname);
  }, [location?.pathname]);

  const onSignOut = () => {
    instance.logoutRedirect();
  };

  return (
    <div
      className={`${
        hideHeaderforRoute?.includes(location?.pathname) ? "hidden" : ""
      } flex justify-between px-6 py-1 bg-slate-200 `}
    >
      <div className="flex items-center gap-3">
        <p className="m-0 pr-6 font-bold text-2xl">CRB</p>
        {menuList?.map((menu: { name: string; path: string }) => (
          <button
            key={menu?.name}
            className={`outline-none border-none cursor-pointer px-3 py-1 hover:bg-slate-600 hover:text-white rounded-[4px] ${
              menu?.path === activeMenu ? "bg-slate-600 text-white " : ""
            }`}
            onClick={() => {
              setActiveMenu(menu?.path);
              navigate(menu?.path);
            }}
          >
            {menu?.name}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {isSiggedIn ? (
          <button
            className={`outline-none border-none cursor-pointer px-3 py-1 hover:bg-slate-600 hover:text-white rounded-[4px] ${
              location?.pathname === "/profile"
                ? "bg-slate-600 text-white "
                : ""
            }`}
            onClick={() => {
              setActiveMenu("/profile");
              navigate("/profile");
            }}
          >
            My Profile
          </button>
        ) : null}
        <button
          onClick={onSignOut}
          className="outline-none border-none cursor-pointer px-3 py-1 bg-slate-600 hover:bg-opacity-[0.8] text-white rounded-[4px]"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
