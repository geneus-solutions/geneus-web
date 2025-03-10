import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteCartMutation } from "../features/Cart/cartApiSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useSelector((state) => state?.auth);
  const { cartCount: count, cart: cartDetails } = useSelector(
    (state) => state?.cartData
  );
  // console.log(cartDetails, 'this is cartDetails')
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
      navigate('/course-details', {
        state: { cartDetails, totalPrice }
      });
    } else {
      toast.error("Your cart is empty!");
    }
  };

  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h4" fontWeight="bold" textAlign="left">
          Shopping Cart
        </Typography>
        {cartDetails?.cart_items?.length > 0 && (
          <Typography variant="body1" mt={1}>
            {count} Courses
          </Typography>
        )}
      </Box>

      <hr />

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {!(cartDetails?.cart_items?.length > 0) ? (
            <Box textAlign="center">
              <Typography variant="h6" color="textSecondary">
                Your cart is empty. Keep shopping to find a course!
              </Typography>
              <Link to="/courses">
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Keep Shopping
                </Button>
              </Link>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {cartDetails?.cart_items?.map((cart_item) => (
                <Grid item xs={12} key={cart_item._id}>
                  <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 150, height: 100 }}
                      image={cart_item.course_image}
                      alt={cart_item.course_title}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {cart_item.course_title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {cart_item.course_description}
                      </Typography>
                    </CardContent>
                    <Box textAlign="right">
                      <Button
                        onClick={() =>
                          removeFromCart(cartDetails._id, cart_item._id)
                        }
                        variant="outlined"
                        color="error"
                        sx={{ mb: 1 }}
                      >
                        Remove
                      </Button>
                      <Button variant="outlined">Move to Wishlist</Button>
                    </Box>
                    <Box>
                      <Typography variant="h6" color="error" fontWeight="bold">
                        ₹{cart_item.course_discountPrice}
                      </Typography>
                      <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
                        ₹{cart_item.course_price}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {cartDetails?.cart_items?.length > 0 && (
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1" color="textSecondary">
                  Total:
                </Typography>
                <Typography variant="h5" color="error">
                  ₹{cartDetails?.discount}
                </Typography>
                <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
                  ₹{cartDetails?.cart_total}
                </Typography>
                <Typography variant="body2">
                  {cartDetails?.total_after_discount} off
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleBuyNow}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <hr />

      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold">
          You might also like
        </Typography>
        <Typography variant="body2">Carousel of Courses</Typography>
      </Box>
    </Container>
  );
};

export default Cart;
