import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

import axios from "axios";
import Logo from "../../assets/g.png";
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

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);
  console.log('user : ', user);

  const makePayment = async (amount) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your setup.");
      return;
    }

    let data = JSON.stringify({
      amount: amount.toString(),
      currency: "INR",
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
        var options = {
          key: RAZORPAY_ID,
          name: "Geneus Solutions",
          currency: "INR",
          amount: response.data.amount,
          order_id: response.data.id,
          description: "Happy Learning",
          image: Logo,
          handler: async function (response) {
            console.log('response : ', response);
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
        console.log('error : ', error);
      });
  };

  return (
    <Grid item md={6}>
      <Card>
        <CardContent>
          {/* Summary Title */}
          <Typography variant="h5" gutterBottom>
            Summary
          </Typography>

          {/* Subtotal */}
          <div className="d-flex justify-content-between">
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="body1" fontWeight="bold">₹{cartDetails?.cart_total - finalTotal}</Typography>
          </div>

          {/* Discount */}
          <div className="d-flex justify-content-between">
            <Typography variant="body1">Discount:</Typography>
            <Typography variant="body1" fontWeight="bold">₹{cartDetails?.cart_total - finalTotal}</Typography>
          </div>

          {/* Coupon Code Input */}
          <div className="mt-3">
            <TextField
              fullWidth
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              label="Enter your coupon code"
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={applyCoupon}
              disabled={applyCouponMessage}
              sx={{
                marginTop: 2,
                width: "30%",
                height: "40px",
                padding: "0 16px",
                backgroundColor: "#333333",
              }}
            >
              Apply Coupon
            </Button>
          </div>

          {/* Display Coupon Details if Applied */}
          {applyCouponMessage && (
            <div className="mt-3">
              <Typography variant="body1">Coupon Applied: {couponCode}</Typography>
              <Typography variant="body1">Discount: ₹{discount}</Typography>

              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={removeCoupon}
                sx={{
                  marginTop: 2,
                  width: "30%",
                  height: "40px",
                  padding: "0 16px",
                  borderColor: "#333333",
                }}
              >
                Remove Coupon
              </Button>
            </div>
          )}

          {/* Display Coupon Validation Message */}
          {message && (
            <Typography
              variant="body2"
              color={message.type === "success" ? "success.main" : "error.main"}
              sx={{ marginTop: 2 }}
            >
              {message.text}
            </Typography>
          )}

          {/* Total */}
          <Divider sx={{ marginY: 2 }} />
          <div className="d-flex justify-content-between">
            <Typography variant="h6" fontWeight="bold">Total:</Typography>
            <Typography variant="h6" fontWeight="bold" color="error">₹{finalTotal.toFixed(2)}</Typography>
          </div>

          {/* Checkout Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={() => makePayment(finalTotal)}
            sx={{
              marginTop: 2,
              height: "50px",
              backgroundColor: "#333333",
            }}
          >
            Proceed to Pay
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SummarySection;
