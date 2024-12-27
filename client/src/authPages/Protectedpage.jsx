import React from "react";
import { Outlet } from "react-router-dom";

const Protectedpage = () => {
  console.log("Protected Page Rendered");
  return <Outlet />;
};

export default Protectedpage;
