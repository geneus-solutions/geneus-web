import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/g.png";
// import { backendUrl, RAZORPAY_ID } from "../../config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "./SummarySection.css";
import { emptyCart } from "./removeFromCart";
import { useMyLearningQuery } from "../../features/MyLearning/LearningApiSlice";

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
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const { refetch } = useMyLearningQuery(
    { user_Id: user?.id },
    { skip: !user?.id }
  );
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = process.env.REACT_APP_Script;
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
    try {
      // if (!amount || isNaN(amount)) {
      if(amount<0){  //Change for testing in unique coupn code
        console.error("Invalid amount");
        return;
      }

      const res = await initializeRazorpay();
      // console.log("res", res);
      if (!res) {
        throw new Error("Razorpay SDK Failed to load");
      }

      const data = {
        amount: amount.toString(),
        currency: "INR",
        username: user?.name,
        email: user?.email,
      };

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BACKEND_URL}/razorpay`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      };

      const response = await axios.request(config);
      // console.log("response : ", response);
      // console.log(JSON.stringify(response.data));
      const options = {
        key: process.env.REACT_APP_RAZORPAY_ID,
        name: "Geneus Solutions",
        currency: "INR",
        amount: response?.data?.amount,
        order_id: response?.data?.id,
        description: "Happy Learning",
        image: Logo,
        handler: async function (response) {
          const data = {
            razorpay_order_id: response?.razorpay_order_id,
            razorpay_payment_id: response?.razorpay_payment_id,
            razorpay_signature: response?.razorpay_signature,
            user_id: user?.id,
            user_email: user?.email,
            cart_details: cartDetails?.cart_items,
          };

          const verify = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/paymentverification`,
            {
              data: data,
            }
          );

          if (verify?.data?.success === true) {
            toast.success("Payment Successful");
            emptyCart(cartDetails?._id);
            // setCartCount(0);
            // dispatch(reset());
            refetch();
            navigate("/");
          } else {
            toast.error("Payment Failed");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      // console.error("Failed to make payment:", error);
      alert(
        "Payment failed, please contact our support at support@geneussolutions.in"
      );
      // if(error.response.status === 401){
      //   alert("User Unauthorized, please do re login and try");
      // }
    }
  };
  return (
    <div className="summary-section">
      <h2 className="summary-title">Summary</h2>

      <div className="summary-details">
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>
            ₹{cartDetails?.price ? cartDetails?.price : cartDetails?.cart_total}
          </span>
        </div>

        <div className="summary-item">
          <span>Discount:</span>
          <span>
            ₹
            {cartDetails?.discount_price
              ? cartDetails?.price - cartDetails?.discount_price
              : cartDetails?.total_after_discount}
          </span>
        </div>

        {applyCouponMessage && (
          <div className="coupon-details">
            <p>Coupon Applied: {appliedCoupon}</p>
            <p>Discount: ₹{discount}</p>
            <button
              className="remove-btn"
              onClick={() => {
                removeCoupon();
                setAppliedCoupon(couponCode);
                setCouponCode("");
              }}
            >
              Remove
            </button>
          </div>
        )}

        {message && <p className={`message ${message.type}`}>{message.text}</p>}

        <input
          type="text"
          className="coupon-input"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter your coupon code"
        />
        <button
          className="apply-btn"
          onClick={() => {
            applyCoupon();
            setCouponCode("");
          }}
          disabled={applyCouponMessage}
        >
          Apply Coupon
        </button>

        <hr />
        <div className="summary-item total">
          <span>Total:</span>
          <span>₹{finalTotal}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={() => makePayment(finalTotal)}
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default SummarySection;
