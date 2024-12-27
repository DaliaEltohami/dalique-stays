import React from "react";
import Error from "../components/Error";

const PaymentCancelled = () => {
  return (
    <div className="container mt-4">
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <Error message="Payment Canclled" />
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
