import React from "react";

const Success = ({ message }) => {
  return (
    <div
      className="alert alert-success d-flex flex-column align-items-start p-4"
      role="alert"
    >
      <p className="mb-2">
        <i className="bi bi-check-circle-fill me-2"></i>
        {message}
      </p>
    </div>
  );
};

export default Success;
