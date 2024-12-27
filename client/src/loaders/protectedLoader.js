import { redirect } from "react-router-dom";
import { auth } from "../utils/auth";

const protectedLoader = async ({ request }) => {
  const isAuthenticated = await auth.checkAuth();
  if (!isAuthenticated) {
    const currentPath = new URL(request.url).pathname;
    return redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
  }
  return null;
};

export default protectedLoader;
