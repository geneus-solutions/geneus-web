import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteCartMutation } from "../../features/Cart/cartApiSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    
    const {user} = useSelector((state) => state?.auth);
    const {cartCount:count,cart:cartDetails} = useSelector((state) => state?.cartData);
    console.log('user : ',user);
    const navigate = useNavigate();


    const [deleteCart] = useDeleteCartMutation();

    const removeFromCart = async (userId, courseId) => {

        try {
            const cartDetails = await deleteCart({ user_id: user?.id, course_id: courseId }).unwrap();

            if (!cartDetails) {
                console.log("item not deleted");
            } else {
                toast.success("Course deleted from cart");
            }
        } catch (error) {
            console.log("error", error);
            toast.error(error);
        }
    };

    //handle but now funtion:-

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
        <MDBContainer>
            <hr className="hr" />

            <MDBRow>
                <MDBCol md="12">
                    <div className="text-start fs-1 fw-bold">Shopping Cart</div>
                    {!(cartDetails?.cart_items?.length > 0) ? (
                        <div></div>
                    ) : (
                        <div className="fst-normal fs-6 mt-2 ml-2">
                            <h6>{count} Courses</h6>
                        </div>
                    )}
                </MDBCol>
            </MDBRow>

            <hr className="hr" />
            <MDBRow>
                <MDBCol md="9">
                    {!(cartDetails?.cart_items?.length > 0) ? (
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <MDBIcon
                                            fas
                                            icon="shopping-cart"
                                            color="black"
                                            size="6x"
                                        />
                                        <h5 className="card-title">
                                            0 courses
                                        </h5>
                                        <p className="card-text center">
                                            Your cart is empty. Keep shopping to
                                            find a course!
                                        </p>
                                        <Link to="/courses">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                Keep shopping
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    ) : (
                        <MDBRow>
                            {cartDetails &&
                                cartDetails?.cart_items?.map((cart_item) => (
                                    <div className="d-flex flex-start mt-2">
                                        <MDBCol md="3">
                                            <img
                                                fluid
                                                className="shadow-1-strong me-3"
                                                src={cart_item.course_image}
                                                alt="avatar"
                                                width="100%"
                                                height="120"
                                            />
                                        </MDBCol>
                                        <MDBCol md="5">
                                            <div className="ml-2 mt-2 mb-2">
                                                <h5 class="fw-bold mb-0">
                                                    {cart_item.course_title}
                                                </h5>
                                                <div class="d-flex align-items-center mb-3"></div>
                                                <p class="mb-0">
                                                    {
                                                        cart_item.course_description
                                                    }
                                                </p>
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="2">
                                            <div className="ml-1 mt-2 text-end fs-6">
                                                <button
                                                    onClick={() => {
                                                        removeFromCart(
                                                            cartDetails._id,
                                                            cart_item._id
                                                        );
                                                    }}
                                                    type="button"
                                                    class="btn btn-tertiary"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    Remove
                                                </button>
                                                <br />
                                                <button
                                                    type="button"
                                                    class="btn btn-tertiary"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    move to wishlist
                                                </button>
                                                <br />
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="2">
                                            <div className="ml-1 mt-2">
                                                <div className="mb-1">
                                                    <strong className="text-danger fs-5">
                                                        &#8377;
                                                        {
                                                            cart_item.course_discountPrice
                                                        }
                                                    </strong>
                                                    <h6 className="mb-1">
                                                        <s>
                                                            &#8377;
                                                            {
                                                                cart_item.course_price
                                                            }
                                                        </s>
                                                    </h6>
                                                </div>
                                            </div>
                                        </MDBCol>
                                    </div>
                                ))}
                        </MDBRow>
                    )}
                </MDBCol>

                {!(cartDetails?.cart_items?.length > 0) ? (
                    <div></div>
                ) : (
                    <MDBCol md="3">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle className="text-start fs-6 fw-normal text-muted">
                                    total:
                                </MDBCardTitle>
                                <MDBCardText>
                                    <div className="mb-1">
                                        <strong className="text-danger fs-4">
                                            &#8377;
                                            {cartDetails &&
                                                cartDetails?.discount}
                                        </strong>
                                        <h6 className="fs-6">
                                            <s>
                                                &#8377;
                                                {cartDetails &&
                                                    cartDetails?.cart_total}
                                            </s>
                                        </h6>
                                        <h6 className="fs-6">
                                            {cartDetails &&
                                                cartDetails?.total_after_discount}{" "}
                                            off
                                        </h6>
                                    </div>
                                </MDBCardText>
                                <MDBBtn
                                    onClick={handleBuyNow}
                                    className="text-center btn-block"
                                    size="lg"
                                    style={{  backgroundColor: "#333333",
                                        color: "#fff",
                                        width: "100%", // Set a fixed width (adjust if necessary)
                                        height: "50px", // Set a fixed height
                                        padding: "10px 20px", // Explicit padding
                                        transition: "none", // No transitions
                                        boxShadow: "none", // Remove shadows
                                        transform: "none", // Prevent scaling
                                        border: "1px solid #333333",}}
                                        data-mdb-ripple="false"  
                                >
                                    {" "}
                                    Buy Now
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )}
            </MDBRow>

            <hr className="hr" />

            <MDBRow>
                <MDBCol md="12">
                    <div className="text-start fs-3 fw-bold">
                        You might also like
                    </div>
                    <div className="fst-normal fs-6 mt-2 ml-2">
                        <h6>Carousal of Courses</h6>
                    </div>
                </MDBCol>
            </MDBRow>

            <hr className="hr" />
        </MDBContainer>
    );
};

export default Cart;
