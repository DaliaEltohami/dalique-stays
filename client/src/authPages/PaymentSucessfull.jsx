import React from "react";
import Success from "../components/Success";

const PaymentSucessfull = () => {
  return (
    <div className="container mt-4">
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <Success message="Payment Completed Successfully" />
        </div>
      </div>
    </div>
  );
};

export default PaymentSucessfull;
