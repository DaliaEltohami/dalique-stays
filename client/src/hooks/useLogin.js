import { useState } from "react";
import { message } from "antd";
import { useAuth } from "./useAuth";
// import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  // const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const user = {
        email,
        password,
      };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success(data.message);
        login(data.token, data.user);
        // navigate("/app/dashboard");
      } else if (res.status === 404) {
        setError(data.message);
      } else if (res.status === 401) {
        setError(data.message);
      } else {
        message.error("Registration Failed!");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Registration Failed!");
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, loginUser };
};
