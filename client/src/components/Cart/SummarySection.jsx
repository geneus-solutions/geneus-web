import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

const SummarySection = ({
  cartDetails,
  finalTotal,
  applyCoupon,
  couponCode,
  setCouponCode,
  message,
  discount,
  removeCoupon,
  applyCouponMessage,
}) => {
  console.log("tis is couponCOde", couponCode);
  return (
    <MDBCol md="6">
      <MDBCard>
        <MDBCardBody>
          {/* Summary Title */}
          <MDBTypography tag="h5" className="fw-bold mb-3">
            Summary
          </MDBTypography>

          {/* Subtotal */}
          <div className="d-flex justify-content-between">
            <p className="fw-normal">Subtotal:</p>
            <p className="fw-bold">₹{cartDetails?.cart_total}</p>
          </div>

          {/* Discount */}
          <div className="d-flex justify-content-between">
            <p className="fw-normal">Discount:</p>
            <p className="fw-bold">₹{cartDetails?.cart_total - finalTotal}</p>
          </div>

          {/* Coupon Code Input */}
          <div className="mt-3">
            <MDBInput
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter your coupon code"
            />
            {/* {!couponCode && ( */}
            <MDBBtn
              color="dark"
              size="sm"
              className="mt-2"
              style={{
                backgroundColor: "#333333",
                color: "#fff",
                marginTop: "20px",
                width: "30%", // Set a fixed width (adjust if necessary)
                height: "30px", // Set a fixed height
                padding: "1px 2px", // Explicit padding
                transition: "none", // No transitions
                boxShadow: "none", // Remove shadows
                transform: "none", // Prevent scaling
                border: "1px solid #333333",
              }}
              data-mdb-ripple="false"
              onClick={applyCoupon}
              disabled={applyCouponMessage}
            >
              Apply Coupon
            </MDBBtn>
          </div>

          {/* Display Coupon Details if Applied */}
          {applyCouponMessage && (
            <div className="mt-3">
              <p className="fw-normal">Coupon Applied: {couponCode}</p>
              <p className="fw-normal">Discount: ₹{discount}</p>

              <MDBBtn
                color="danger"
                size="sm"
                className="mt-2"
                onClick={removeCoupon}
                style={{
                  backgroundColor: "#333333",
                  color: "#fff",
                  marginTop: "20px",
                  width: "30%", // Set a fixed width (adjust if necessary)
                  height: "30px", // Set a fixed height
                  padding: "1px 2px", // Explicit padding
                  transition: "none", // No transitions
                  boxShadow: "none", // Remove shadows
                  transform: "none", // Prevent scaling
                  border: "1px solid #333333",
                }}
                data-mdb-ripple="false" // When the remove button is clicked, it will reset the coupon and the discount
              >
                Remove Coupon
              </MDBBtn>
            </div>
          )}

          {/* Display Coupon Validation Message */}
          {message && (
            <p
              className={`mt-3 text-${
                message.type === "success" ? "success" : "danger"
              }`}
            >
              {message.text}
            </p>
          )}

          {/* Total */}
          <hr />
          <div className="d-flex justify-content-between">
            <p className="fw-bold fs-5">Total:</p>
            <p className="fw-bold fs-5 text-danger">₹{finalTotal.toFixed(2)}</p>
          </div>

          {/* Checkout Button */}
          <MDBBtn
            color="dark"
            size="lg"
            className="mt-3"
            style={{  backgroundColor: "#333333",
                color: "#fff",
                width: "100%", // Set a fixed width (adjust if necessary)
                height: "50px", // Set a fixed height
                padding: "10px 20px", // Explicit padding
                transition: "none", // No transitions
                boxShadow: "none", // Remove shadows
                transform: "none", // Prevent scaling
                border: "1px solid #333333",}}
                 data-mdb-ripple="false"
          >
            Proceed to Pay
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default SummarySection;
