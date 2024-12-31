import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/g.png";
import { backendUrl, RAZORPAY_ID } from "../../config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "./SummarySection.css";

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
  const user = useSelector((state) => state.auth);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const makePayment = async (amount) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your setup.");
      return;
    }

    const requestdData = JSON.stringify({
      amount: (amount).toString(),
      currency: "INR",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${backendUrl}/razorpay`,
      headers: {
        "Content-Type": "application/json",
      },
      data: requestdData,
    };

    try {
      const response = await axios.request(config);
      if(!response){
        console.log('no response')
      }
      console.log(response)
      var options = {
        key: RAZORPAY_ID,
        name: "Geneus Solutions",
        currency: "INR",
        amount: response?.data?.amount,
        order_id: response?.data?.id,
        description: "Happy Learning",
        image: Logo,
        handler: async function (response) {
          console.log("response : ", response);
          const data = {
            razorpay_order_id: response?.razorpay_order_id,
            razorpay_payment_id: response?.razorpay_payment_id,
            razorpay_signature: response?.razorpay_signature,
            user_id: user?.userId,
            cart_details: cartDetails?.cart_items,
          };
          const verify = await axios.post(`${backendUrl}/paymentverification`, {
            data: data,
          });
          if (verify.data.success === true) {
            toast.success("Payment Successful");
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
    } catch (error) {
      console.log("error : ", error.response?.data || error.message);
    }
  };

  return (
    <div className="summary-section">
      <h2 className="summary-title">Summary</h2>

      <div className="summary-details">
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>₹{cartDetails?.cart_total}</span>
        </div>

        <div className="summary-item">
          <span>Discount:</span>
          <span>₹{cartDetails?.total_after_discount}</span>
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
