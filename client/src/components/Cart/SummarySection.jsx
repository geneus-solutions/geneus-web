import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

import axios from "axios";
import { backendUrl, RAZORPAY_ID } from "../../config";
import { razorpayScript } from "../../config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);

  const initializeRazorpay = () => {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = `${razorpayScript}`;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
  };

  const makePayment = async (amount) => {
      const res = await initializeRazorpay();
      if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
      }
      let data = JSON.stringify({
          amount: amount.toString(),
          currecy: "INR",
      });
      let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${backendUrl}/razorpay`,
          headers: {
              "Content-Type": "application/json",
          },
          data: data,
      };
      axios
          .request(config)
          .then((response) => {
              console.log(JSON.stringify(response.data));
              var options = {
                  key: RAZORPAY_ID,
                  name: "Geneus Solutions",
                  currency: "INR",
                  amount: response.data.amount,
                  order_id: response.data.id,
                  description: "Happy Learning",
                  image: Logo,
                  handler: async function (response) {
                      const data = {
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_signature: response.razorpay_signature,
                          user_id: user.userId,
                          cart_details: cartDetails.cart_items,
                      };
                      const verify = await axios.post(
                          `${backendUrl}/paymentverification`,
                          {
                              data: data,
                          }
                      );
                      if (verify.data.success === true) {
                          toast.success("Payment Successfull");
                          navigate("/");
                      } else {
                          toast.error("Payment Failed");
                      }
                  },
                  prefill: {
                      name: user.name,
                      email: user.email,
                  },
              };
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
          })
          .catch((error) => {
              console.log(error);
          });
  };
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
