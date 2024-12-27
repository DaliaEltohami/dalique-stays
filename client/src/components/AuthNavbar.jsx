import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthNavbar = () => {
  console.log("AuthNavbar Rendered!");
  const { logout, userData } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-uppercase">
          Dalique Stays
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
                {userData?.name || "User"}
              </span>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/app/profile">
                    Profile
                  </Link>
                </li>

                <li
                  className="dropdown-item"
                  onClick={async () => {
                    await logout();
                  }}
                >
                  Logout
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
