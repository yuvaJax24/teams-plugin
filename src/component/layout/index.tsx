import React from "react";
import Navbar from "../navbar";

const Layout = ({ children }: { children: JSX.Element | number | string }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
