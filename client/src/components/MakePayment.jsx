import React from "react";

import { 
    useLazyGetPayIdQuery,
    useNutriCheckOutMutation,
    useVerifyNutriSubscriptionMutation } from "../features/NutriSubscription/NutriSubscriptionApiSlice";

import { useSelector } from "react-redux";

const MakePayment = ({ children,paymentData }) => {

  const [getPayId] = useLazyGetPayIdQuery();
  const [NutriCheckOut,{isLoading}] = useNutriCheckOutMutation();
  const [verifyNutriSubscription] = useVerifyNutriSubscriptionMutation();

  const { user } = useSelector((state) => state.auth);
  console.log("user : ",user);

  const makePayment = async(paymentData) => {
    try {

        const keyResponse = await getPayId().unwrap();

        // Check if the Razorpay SDK is loaded
        if (!window.Razorpay) {
            console.error("Razorpay SDK not loaded. Please check your setup.");
            return;
        }
      
          // Create a new instance of Razorpay
          const options = {
            key: keyResponse?.key_id, 
            order_id: paymentData?.id, // Razorpay order ID from backend
            amount: paymentData?.amount,

            currency: "INR",
            name: user?.name,
            description: "Test Transaction",

            prefill: {
              name: "Manish Shaw",
              email: user?.email,
              contact: "1234567890",
            },

            handler: async function (response) {
              try {

                const result = await verifyNutriSubscription({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }).unwrap();
    
                if (result.success) {
                  alert("✅ Payment verified successfully!");
                } 

              } catch (err) {
                alert("❌ Payment verification error");
              }

            }
          };
      
          // initialize the Razorpay instance with the options
          const rzp = new window.Razorpay(options);
          // open the Razorpay payment modal
          rzp.open();
          
    } catch (error) {
        console.log("Error during payment:", error);
    }
    
  };

  const handleCheckOut = async () => {
    try {
      
      // Call the checkout mutation
      const response = await NutriCheckOut(paymentData).unwrap();
      
      // If the response has an ID, make the payment
      if (response?.id) {
        makePayment(response);
      }

    } catch (error) {
      // Log the error
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div onClick={handleCheckOut}>
      {typeof children === "function" ? children(isLoading) : children}
    </div>
  );
};

export default MakePayment;
