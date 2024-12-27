/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../utils/auth";
import Loader from "../components/Loader";

export const AuthContext = createContext();
export const AuthProvider = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const authData = await auth.checkAuth();
        if (authData) {
          setUserData(authData.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoading) {
      getAuthData();
    }
  }, [isLoading]);

  // const login = (newToken, newUserData) => {
  //   localStorage.setItem("token", JSON.stringify(newToken));
  //   setToken(newToken);
  //   setUserData(newUserData);
  //   setIsAuthenticated(true);
  //   navigate(-1);
  // };

  const login = (newToken, newUserData) => {
    // Save authentication data
    localStorage.setItem("token", JSON.stringify(newToken));
    setToken(newToken);
    setUserData(newUserData);
    setIsAuthenticated(true);

    // Navigate to the intended path or a fallback
    const redirectPath = searchParams.get("redirect") || "/app";
    navigate(redirectPath);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
    setUserData(null);
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    console.log("loading");
    return <Loader size={50} color="#000" />; // Show loading state while checking auth
  }

  return (
    <AuthContext.Provider
      value={{ token, userData, isAuthenticated, login, logout }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};
