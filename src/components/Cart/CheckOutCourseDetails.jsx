import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";
import CouponSection from "./CouponSection";
import SummarySection from "./SummarySection";

const CheckOutCourseDetails = () => {
  const location = useLocation();
  const { cartDetails, totalPrice } = location.state || {};
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(totalPrice);
  const [message, setMessage] = useState(null);
  const [applyCouponMessage, setApplyCouponMessage] = useState(false);

  const validCoupons = [
    { code: "SAVE10", discount: 10, expiryDate: "2024-12-31" },
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
        const discountAmount = (totalPrice * coupon.discount) / 100;
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
    return <Typography variant="h6">No cart details available</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Course Summary
      </Typography>

      {/* Course Table */}
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Discounted Price</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartDetails?.cart_items?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
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
                  </TableCell>
                  <TableCell align="center">₹{item.course_price}</TableCell>
                  <TableCell align="center">₹{item.course_discountPrice}</TableCell>
                  <TableCell align="right">₹{item.course_discountPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Coupon and Summary Sections */}
      <Grid container spacing={2} className="mt-4">
        <Grid item xs={12} md={6}>
          <CouponSection
            validCoupons={validCoupons}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            applyCoupon={applyCoupon}
            removeCoupon={removeCoupon}
            message={message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SummarySection
            finalTotal={finalTotal}
            discount={discount}
            totalPrice={totalPrice}
            applyCouponMessage={applyCouponMessage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckOutCourseDetails;
