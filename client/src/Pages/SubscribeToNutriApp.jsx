import React from "react";

import VerticalLoader from "../components/Loaders/VerticalLoader";

import MakePayment from '../components/MakePayment';
import { useNutriCheckOutMutation } from "../features/NutriSubscription/NutriSubscriptionApiSlice";

import { MdLockOutline } from "react-icons/md";

const SubscribeToNutriApp = () => {

  const [NutriCheckOut,{isLoading}] = useNutriCheckOutMutation();

  const paymentData = {
    currency: "INR",
    plan: "NutriApp Premium",
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Upgrade to NutriApp Premium</h1>
      <p style={styles.subheading}>
        Get more control over your diet planning and food diary.
      </p>

      <div style={styles.card}>
        <h2 style={styles.planTitle}>Premium Benefits</h2>
        <ul style={styles.benefits}>
          <li>✓ Plan your meals with advanced tools</li>
          <li>✓ Maintain a personalized food diary</li>
          <li>✓ Access detailed nutritional insights</li>
          <li>✓ Priority support & early access to new features</li>
        </ul>

        <p style={styles.price}>Only ₹299/month</p>

        <MakePayment checkout={NutriCheckOut} checkOutData={paymentData}>
          <button
            style={{
              ...styles.button,
              opacity: isLoading ? 0.6 : 1,
              pointerEvents: isLoading ? "none" : "auto",
            }}
            disabled={isLoading}
          >
              {isLoading ? (
                  <VerticalLoader />
              ) : (
                  <>
                      <MdLockOutline style={styles.icon} />
                      Subscribe to Premium
                  </>
              )}
          </button>
        </MakePayment> 
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  heading: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "10px",
  },
  subheading: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px 20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  planTitle: {
    fontSize: "1.5rem",
    color: "#a435f0",
    marginBottom: "20px",
  },
  benefits: {
    listStyle: "none",
    padding: 0,
    marginBottom: "20px",
    textAlign: "left",
    fontSize: "1rem",
    color: "#333",
  },
  price: {
    fontSize: "1.25rem",
    margin: "20px 0",
    color: "#000",
    fontWeight: 600,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF", // Use primary blue
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 700,
    width: "100%",
    fontSize: "16px",
    borderRadius: "6px",
    "&:hover": { // Add hover effect
      backgroundColor: "#0056b3",
    },
  },
  icon: {
    fontSize: "20px",
    marginRight: "8px",
  },
};

export default SubscribeToNutriApp;
