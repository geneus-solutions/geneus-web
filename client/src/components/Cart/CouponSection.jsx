import React from "react";
import { MDBCard, MDBCardBody, MDBTypography, MDBListGroup, MDBListGroupItem, MDBCol } from "mdb-react-ui-kit";

const CouponSection = ({ validCoupons  }) => {
  return (
    <MDBCol md="6">
      <MDBCard className="h-100">
        <MDBCardBody>
          {/* Heading: Coupon Section */}
          <MDBTypography tag="h5" className="fw-bold mb-3">
            Available Coupons
          </MDBTypography>

          {/* Display the list of available coupons */}
          <MDBListGroup flush>
            {validCoupons?.map((coupon) => (
              <MDBListGroupItem key={coupon.code} className="d-flex justify-content-between">
                <span>{coupon.code}</span>
                <span>{coupon.discount}% off</span>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>

          {/* Input field for coupon code */}

          {/* Display Coupon Validation Message */}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default CouponSection;
