import React from "react";
import Lottie from "lottie-react";
import errorAnimation from '../../Error.json'

const ErrorPage = () => {
  const handleButtonClick = () => {
    // Redirect to the home page or another route
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      <div style={styles.errorBox}>
        <Lottie animationData={errorAnimation}/>
        {/* <h1 style={styles.title}>Oops! <span className="text-xl text-red-600">(Error 404)</span></h1> */}
        <p style={styles.message}>
          The page you are looking for does not exist or has been moved.
        </p>
        <button style={styles.button} onClick={handleButtonClick}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  errorBox: {
    textAlign: "center",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "48px",
    color: "#343a40",
    margin: "0 0 20px",
  },
  message: {
    fontSize: "22px",
    
    color: "#6c757d",
    margin: "0 0 30px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#ffffff",
    backgroundColor: "#fe765e",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ErrorPage;
