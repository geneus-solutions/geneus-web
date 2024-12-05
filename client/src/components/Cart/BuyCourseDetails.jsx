import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MDBContainer, MDBCardBody, MDBTypography, MDBTable, MDBTableHead, MDBTableBody, MDBCard, MDBRow } from "mdb-react-ui-kit";
import SummarySection from "./SummarySection"; // Import SummarySection
import CouponSection from "./CouponSection"; // Import CouponSection

const CourseDetails = () => {
  const location = useLocation();
  const { cartDetails, totalPrice } = location.state || {};
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(totalPrice);
  const [message, setMessage] = useState(null);
  const [applyCouponMessage, setApplyCouponMessage] = useState(false);

  // dummy coupon data:-

  const validCoupons = [
    { code: "SAVE10", discount: 10, expiryDate: "2024-12-31" },
    { code: "SUMMER20", discount: 20, expiryDate: "2024-12-30" },
    { code: "FEST50", discount: 50, expiryDate: "2024-12-15" },
  ];

  const applyCoupon = () => {
    // Clear previous messages
    setMessage(null);

    if (!couponCode) {
      setMessage({ type: "error", text: "Please enter a coupon code." });
      return;
    }

    // Validate coupon code
    const coupon = validCoupons.find((coupon)=>coupon.code.toUpperCase() === couponCode.toUpperCase())
    if (coupon) {
        // Check if the coupon is expired
        const currentDate = new Date();
        const expiryDate = new Date(coupon.expiryDate);
  
        if (currentDate > expiryDate) {
          setMessage({ type: "error", text: "This coupon code has expired." });
        } else {
          const discountAmount = (totalPrice * coupon.discount) / 100;
          setDiscount(discountAmount);
          setFinalTotal(totalPrice - discountAmount);
          setApplyCouponMessage(true);
          setMessage({
            type: "success",
            text: `Coupon applied! You've saved ₹${discountAmount.toFixed(2)} with coupon ${coupon.code}.`,
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
    setCouponCode(""); // Reset coupon code
    setDiscount(0); // Reset discount
    setFinalTotal(totalPrice); // Reset total amount to original
    setMessage({
      type: "success",
      text: "Coupon removed successfully.",
    });
    setApplyCouponMessage(false);
  };

  return (
    <MDBContainer className="py-5">
      {/* Courses Table */}
      <MDBCardBody>
        <MDBTypography tag="h4" className="fw-bold mb-4 text-center" style={{ paddingBottom: "10px" }}>
          Course Summary
        </MDBTypography>
      </MDBCardBody>
      <MDBCard>
        <MDBCardBody>
          <MDBTable bordered>
            <MDBTableHead light>
              <tr>
                <th className="text-start">Description</th>
                <th className="text-center">Unit Price</th>
                <th className="text-center">Unit Price after discount</th>
                <th className="text-end">Amount</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {cartDetails?.cart_items?.map((item) => (
                <tr key={item._id}>
                  <td className="text-start">
                    <img
                      src={item.course_image}
                      alt={item.course_title}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "5px",
                        marginRight: "10px",
                      }}
                    />
                    {item.course_title}
                  </td>
                  <td className="text-center">₹{item.course_price}</td>
                  <td className="text-center">₹{item.course_discountPrice}</td>
                  <td className="text-end">₹{item.course_discountPrice}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>

      {/* Coupon Section and Summary Section in a Row */}
      <MDBRow className="mt-4">
        {/* Coupon Section */}
        <CouponSection
          validCoupons={validCoupons}
        //   couponCode={couponCode}
        //   setCouponCode={setCouponCode}
        //   applyCoupon={applyCoupon}
        //   message={message}
        />

        {/* Summary Section */}
        <SummarySection
          cartDetails={cartDetails}
          finalTotal={finalTotal}
          applyCoupon={applyCoupon}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          message={message}
          discount={discount}
          removeCoupon={removeCoupon}
          applyCouponMessage={applyCouponMessage}
        />
      </MDBRow>
    </MDBContainer>
  );
};

export default CourseDetails;
