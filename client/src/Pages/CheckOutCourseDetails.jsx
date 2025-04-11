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
  const [cartItems, setCartItems] = useState(cartDetails?.cart_items || []);
  const [deleteCart] = useDeleteCartMutation();
  const { user } = useSelector((state) => state?.auth);
  console.log(
    'this is cartDetails', cartDetails, totalPrice
  )
  
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
        const discountAmount = cartDetails?.discount - 1;
        setDiscount(discountAmount);
        setFinalTotal(cartDetails?.discount - discountAmount);
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
    setFinalTotal(cartDetails?.discount);
    setMessage({ type: "success", text: "Coupon removed successfully." });
    setApplyCouponMessage(false);
  };

  if (!cartDetails) {
    return <h6>No cart details available</h6>;
  }

  const removeFromSummry = async (itemId) => {
    try {
      const cartDetails = await deleteCart({
        user_id: user?.id,
        course_id: itemId,
      }).unwrap();
      const updatedCart = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCart);

      const newTotal = updatedCart.reduce(
        (acc, item) => acc + item.course_discountPrice,
        0
      );

      setFinalTotal(newTotal);
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
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
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
                    <td onClick={() => removeFromSummry(item._id)}>
                      <MdDelete  style={{cursor: 'pointer'}}/>
                    </td>
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
