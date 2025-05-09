import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteCartMutation } from "../features/Cart/cartApiSlice";
import { Link, useNavigate } from "react-router-dom";
import "./CourseCart.css";
import { MdDelete } from "react-icons/md";

const CourseCart = () => {
  
  const { user } = useSelector((state) => state?.auth);
  const { cartCount: count, cart: cartDetails } = useSelector(
    (state) => state?.cartData
  );
  const navigate = useNavigate();
  const [deleteCart] = useDeleteCartMutation();

  const removeFromCart = async (userId, courseId) => {
    try {
      const cartDetails = await deleteCart({ user_id: user?.id, course_id: courseId }).unwrap();
      if (!cartDetails) {
        console.log("Item not deleted");
      } else {
        toast.success("Course deleted from cart");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(error);
    }
  };

  const handleBuyNow = () => {
    if (cartDetails?.cart_items?.length > 0) {
      const totalPrice = cartDetails?.discount;
      navigate("/course-details", {
        state: { cartDetails, totalPrice },
      });
    } else {
      toast.error("Your cart is empty!");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Course Cart</h2>
      {cartDetails?.cart_items?.length > 0 && <p className="cart-count">{count} Courses</p>}
      <hr />

      <div className="cart-content">
        <div>

        <div className="cart-items">
          {!(cartDetails?.cart_items?.length > 0) ? (
            <div className="empty-cart">
              <p>Your cart is empty. Click on the button below to find a course!</p>
              <Link to="/courses">
                <button className="btn-primary">Keep Shopping</button>
              </Link>
            </div>
          ) : (
            cartDetails?.cart_items?.map((cart_item) => (
              <div key={cart_item._id} className="cart-item">
                <img src={cart_item.course_image} alt={cart_item.course_title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{cart_item.course_title}</h3>
                  <p className="cart-item-description">{cart_item.course_description}</p>
                </div>
                <div className="cart-item-price">
                  <div>
                  <span className="discount-price">₹{cart_item.course_discountPrice}</span>
                  <span className="original-price">₹{cart_item.course_price}</span>
               </div>
                <button className="btn-remove" onClick={() => removeFromCart(cartDetails._id, cart_item._id)}>
                  <MdDelete/>
                </button>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
        <hr/>
          <div className="summry-container">

        {cartDetails?.cart_items?.length > 0 && (
          <div className="cart-summary">
          <p className="summary-title">Total Price</p>
          <h3 className="total-price">₹{cartDetails?.discount}</h3>
          <p className="original-price">₹{cartDetails?.cart_total}</p>
          <p className="discount">{cartDetails?.total_after_discount} off</p>
          <button className="btn-buy" onClick={handleBuyNow}>Enroll Now</button>
          </div>
          )}
          </div>
      </div>

      <hr />
      <div className="recommendations">
        <h3>You might also like</h3>
        <p>Carousel of Courses</p>
      </div>
    </div>
  );
};

export default CourseCart;