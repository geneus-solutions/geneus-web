import React, { useState } from "react";
import VerticalLoader from "../Loaders/VerticalLoader";
import "./SummarySection.css";

import { useCourseCheckoutMutation } from "../../features/cources/courceApiSlice";
import MakePayment from "../MakePayment";

const SummarySection = ({
  courseIds,
  coursePriceDetails,
  cartDetails,

  applyCoupon,
  couponCode,
  setCouponCode,
  message,
  discount,
  removeCoupon,
  applyCouponMessage,
}) => {

  const [appliedCoupon, setAppliedCoupon] = useState("");

  const [courseCheckout,{isLoading}] = useCourseCheckoutMutation();
  
  return (
    <div className="summary-section">
      <h2 className="summary-title">Summary</h2>
      <div className="summary-details">
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>
            ₹{coursePriceDetails?.subTotal}
          </span>
        </div>

        <div className="summary-item">
          <span>Discount:</span>
          <span>
            ₹
            {coursePriceDetails?.subTotal-coursePriceDetails?.discountedPrice}
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
          <span>₹{coursePriceDetails?.discountedPrice}</span>
        </div>
        <MakePayment
          checkout={courseCheckout}
          checkOutData={{
            courseIds,
            currency: "INR",
          }}
        >
          <button
            className="checkout-btn"
          >
            {isLoading ? (
              <VerticalLoader />
            ) : (
              <>
                Proceed to Pay
              </>
            )}
          </button>
        </MakePayment>
      </div>
    </div>
  );
};

export default SummarySection;
