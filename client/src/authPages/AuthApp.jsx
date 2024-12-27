import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

const AuthApp = () => {
  console.log("AuthApp Rendered!");
  return (
    <div className="App">
      <AuthNavbar />
      <Outlet />
    </div>
  );
};

export default AuthApp;
