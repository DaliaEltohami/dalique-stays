import React from "react";
import { Outlet } from "react-router-dom";

const UnProtectedpage = () => {
  console.log("UnProtected Page");
  return <Outlet />;
};

export default UnProtectedpage;
