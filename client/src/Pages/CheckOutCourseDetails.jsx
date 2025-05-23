import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CouponSection from "../components/Cart/CouponSection";
import SummarySection from "../components/Cart/SummarySection";
import "./CheckOutCourseDetails.css"; // Import external CSS
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useDeleteCartMutation } from "../features/Cart/cartApiSlice";
import { useSelector } from "react-redux";

const CheckOutCourseDetails = () => {
  const location = useLocation();
  const { cartDetails, totalPrice } = location.state || {};
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(totalPrice);
  const [message, setMessage] = useState(null);
  const [applyCouponMessage, setApplyCouponMessage] = useState(false);
  const [cartItems, setCartItems] = useState(cartDetails || {});

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
        const discountAmount = cartItems?.discount - 1;
        setDiscount(discountAmount);
        setFinalTotal(cartItems?.discount - discountAmount);
        setApplyCouponMessage(true);
        setMessage({
          type: "success",
          text: `Coupon applied! You've saved ₹${discountAmount.toFixed(2)}.`,
        });

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } else {
      setMessage({
        type: "error",
        text: "This coupon code is invalid or expired.",
      });

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setFinalTotal(cartItems?.discount);
    setMessage({ type: "success", text: "Coupon removed successfully." });
    setApplyCouponMessage(false);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  if (!cartItems) {
    return <h6>No cart details available</h6>;
  }

  const removeFromSummry = async (itemId) => {
    try {
      const updatedCartItems = cartItems?.cart_items?.filter(
        (item) => item._id !== itemId
      );
      const newCartTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.course_discountPrice,
        0
      );
      const actualAmount = updatedCartItems.reduce(
        (sum, item) => sum + item.course_price,
        0
      );
      const newCartObject = {
        ...cartItems,
        cart_items: updatedCartItems,
        discount: newCartTotal,
        cart_total: actualAmount,
        total_after_discount: actualAmount - newCartTotal,
      };
      setCartItems(newCartObject);

      setFinalTotal(newCartObject?.discount);
      toast.success("Course removed.");
      // Optional: You can send a request to backend here to update user's cart
      // await axios.post("/api/cart/remove", { itemId, userId });
    } catch (error) {
      console.error("Error removing course:", error);
      toast.error("Failed to remove course.");
    }
  };

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
                {cartItems?.cart_items?.length > 1 && <th>Remove</th>}
              </tr>
            </thead>
            <tbody>
              {cartItems?.cart_items?.length > 0 ? (
                cartItems?.cart_items?.map((item) => (
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
                    {cartItems?.cart_items?.length > 1 && (
                      <td onClick={() => removeFromSummry(item._id)}>
                        <MdDelete style={{ cursor: "pointer" }} />
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <img
                      src={cartItems?.img}
                      alt={cartItems.title}
                      className="course-descritptionimage"
                    />
                  </td>
                  <td>₹{cartItems?.price}</td>
                  <td>₹{cartItems?.price - cartItems?.discount_price}</td>
                  <td>₹{cartItems?.discount_price}</td>
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
            // cartDetails={cartDetails}
            cartDetails={cartItems}
            finalTotal={finalTotal}
            discount={discount}
            // totalPrice={totalPrice}
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
