import { useCallback, useMemo, useState } from "react";
import { useAuth } from "./useAuth";

// Constants for validation and configuration
const PASSWORD_MIN_LENGTH = 8;

export const useSignup = (userData) => {
  // UI state management
  const [status, setStatus] = useState({
    error: null,
    loading: false,
    success: false,
  });

  const { login } = useAuth();

  // Form validation rules
  const validationRules = useMemo(
    () => ({
      name: (value) =>
        value.length >= 2 || "Name must be at least 2 characters",
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email format",
      password: (value) =>
        value.length >= PASSWORD_MIN_LENGTH ||
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
      cPassword: (value) =>
        value === userData.password || "Passwords don't match",
    }),
    [userData.password]
  );

  // Validate form fields
  const validateForm = useCallback(() => {
    for (const [field, value] of Object.entries(userData)) {
      const rule = validationRules[field];
      if (rule) {
        const result = rule(value);
        if (typeof result === "string") {
          setStatus((prev) => ({ ...prev, error: result }));
          return false;
        }
      }
    }
    return true;
  }, [validationRules, userData]);

  const registerUser = async () => {
    // Reset status
    setStatus((prev) => ({ ...prev, error: null }));

    // Validate form
    if (!validateForm()) return;

    try {
      setStatus((prev) => ({ ...prev, loading: true }));

      const user = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.status === 201) {
        setStatus((prev) => ({ ...prev, success: data.message }));
        login(data.token, data.user);
      } else if (res.status === 400) {
        setStatus((prev) => ({ ...prev, error: data.message }));
      } else {
        setStatus((prev) => ({ ...prev, error: "Registration Failed!" }));
      }
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: "Registration Failed!" }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };
  return { status, registerUser };
};
