import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CouponSection from "../components/Cart/CouponSection";
import SummarySection from "../components/Cart/SummarySection";
import "./CheckOutCourseDetails.css"; // Import external CSS

const CheckOutCourseDetails = () => {
  const location = useLocation();
  const { cartDetails, totalPrice } = location.state || {};
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(totalPrice);
  const [message, setMessage] = useState(null);
  const [applyCouponMessage, setApplyCouponMessage] = useState(false);

  const validCoupons = [
    { code: "a3e29f41", discount: 50, expiryDate: "2025-12-31" },
    { code: "SUMMER20", discount: 20, expiryDate: "2024-12-30" },
    { code: "FEST50", discount: 50, expiryDate: "2024-12-15" },
  ];

  const applyCoupon = () => {
    setMessage(null);
    if (!couponCode) {
      setMessage({ type: "error", text: "Please enter a coupon code." });
      return;
    }
    const coupon = validCoupons.find(
      (coupon) => coupon.code.toUpperCase() === couponCode.toUpperCase()
    );
    if (coupon) {
      const currentDate = new Date();
      const expiryDate = new Date(coupon.expiryDate);

      if (currentDate > expiryDate) {
        setMessage({ type: "error", text: "This coupon code has expired." });
      } else {
        // const discountAmount = (totalPrice * coupon.discount) / 100;
        const discountAmount = (totalPrice - 1);
        setDiscount(discountAmount);
        setFinalTotal(totalPrice - discountAmount);
        setApplyCouponMessage(true);
        setMessage({
          type: "success",
          text: `Coupon applied! You've saved ₹${discountAmount.toFixed(2)}.`,
        });
      }
    } else {
      setMessage({
        type: "error",
        text: "This coupon code is invalid or expired.",
      });
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setFinalTotal(totalPrice);
    setMessage({ type: "success", text: "Coupon removed successfully." });
    setApplyCouponMessage(false);
  };

  if (!cartDetails || !totalPrice) {
    return <h6>No cart details available</h6>;
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Course Summary</h2>

      {/* Course Table */}
      <div className="card">
        <div className="card-content">
          <table className="checkout-course-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Discounted Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.cart_items ? (
                cartDetails?.cart_items?.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.course_image}
                        alt={item.course_title}
                        className="course-descritptionimage"
                      />
                      {item.course_title}
                    </td>
                    <td>₹{item.course_price}</td>
                    <td>₹{item.course_price - item.course_discountPrice}</td>
                    <td>₹{item.course_discountPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <img
                      src={cartDetails?.img}
                      alt={cartDetails.title}
                      className="course-descritptionimage"
                    />
                  </td>
                  <td>₹{cartDetails?.price}</td>
                  <td>₹{cartDetails?.price - cartDetails?.discount_price}</td>
                  <td>₹{cartDetails?.discount_price}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coupon and Summary Sections */}
      <div className="coupon-summary-container">
        {/* <div className="coupon-section">
          <CouponSection
            validCoupons={validCoupons}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
          />
        </div> */}
        <div className="summary-section-checkout">
          <SummarySection
            cartDetails={cartDetails}
            finalTotal={finalTotal}
            discount={discount}
            totalPrice={totalPrice}
            applyCouponMessage={applyCouponMessage}
            setCouponCode={setCouponCode}
            applyCoupon={applyCoupon}
            removeCoupon={removeCoupon}
            message={message}
            couponCode={couponCode}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOutCourseDetails;
