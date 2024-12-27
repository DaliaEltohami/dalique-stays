import { redirect } from "react-router-dom";
import { auth } from "../utils/auth";

const unProtectedLoader = async () => {
  const isAuthenticated = await auth.checkAuth();
  if (isAuthenticated) {
    return redirect("/app");
  }
  return null;
};

export default unProtectedLoader;
