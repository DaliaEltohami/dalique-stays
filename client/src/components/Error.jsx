import React from "react";

const Error = ({ error, callback }) => {
  return (
    <div
      className="alert alert-danger d-flex flex-column align-items-start p-4"
      role="alert"
    >
      <p className="mb-2">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Error: {error}
      </p>
      {callback && (
        <button onClick={callback} className="btn btn-outline-danger btn-sm">
          <i className="bi bi-arrow-clockwise me-2"></i>
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
