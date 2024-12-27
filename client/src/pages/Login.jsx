import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Error from "../components/Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading, loginUser } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="bs p-3">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Write Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control form-input"
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Write Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control form-input"
              />
              {error && <Error error={error} />}

              <button
                className="btn btn1 btn-dark"
                type="submit"
                disabled={loading}
              >
                {loading ? "Login..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
