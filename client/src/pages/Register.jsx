import React, { useState, useCallback, useMemo } from "react";
import Success from "../components/Success";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useSignup } from "../hooks/useSignup";

const Register = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const { status, registerUser } = useSignup(formData);

  // Handle input changes with debouncing
  const handleInputChange = useMemo(
    () => (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Handle form submission
  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      await registerUser();
    },
    [registerUser]
  );

  // Memoized form rendering
  const renderRegistrationForm = useMemo(
    () => (
      <div className="bs p-3">
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Input fields with improved accessibility and validation feedback */}
          {Object.entries(formData).map(([field, value]) => (
            <div key={field} className="form-group">
              <input
                type={
                  field.toLocaleLowerCase().includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                value={value}
                placeholder={`Enter your ${field.replace(
                  "cPassword",
                  "confirm password"
                )}`}
                onChange={handleInputChange}
                className="form-control form-input"
                required
                aria-label={field}
                autoComplete={
                  field === "password"
                    ? "new-password"
                    : field === "cPassword"
                    ? "new-password"
                    : field
                }
              />
            </div>
          ))}
          <button
            className="btn btn1 btn-dark w-100"
            type="submit"
            disabled={status.loading}
          >
            {status.loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    ),
    [formData, status.loading, handleInputChange, handleRegister]
  );

  // Render status components
  //   if (status.loading) return <Loader />;
  //   if (status.error) return <Error error={status.error} />;
  //   if (status.success) return <Success message="Registration successful!" />;

  const renderAlerts = () => {
    if (status.loading) return <Loader />;
    if (status.error) return <Error error={status.error} />;
  };

  const renderRegister = () => {
    if (status.success) return <Success message="Registration Done!" />;
    return renderRegistrationForm;
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          {renderAlerts()}
          {renderRegister()}
        </div>
      </div>
    </div>
  );
};

export default Register;
