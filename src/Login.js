import React, { useState } from "react";

const SignIn = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState("");  
  const [password, setPassword] = useState("");  
  const [error, setError] = useState("");  
  const [loading, setLoading] = useState(false);  
  const [successMessage, setSuccessMessage] = useState(""); 

  // Hardcoded condition for testing 
  // const hardcodedUserId = "Demo";
  // const hardcodedPassword = "Demo";

  // API URL to check user credentials using relative path case
  const API_URL = "/ReactTest/ReactTest.php"; 
    // const API_URL = "http://www.mambacloudservices.com/ReactTest/ReactTest.php"


  const resetForm = () => {
    setUserId("");
    setPassword("");
    setError("");  
    setSuccessMessage("");  
  };

  
  const handleSignIn = async (e) => {
    e.preventDefault();

    // Clear previous error message
    setError("");
    setLoading(true);  

    //  Hardcoded credentials to verify and check condition 
    // if (userId === hardcodedUserId && password === hardcodedPassword) {
    //   setSuccessMessage("Login successful!");  
    //   setLoading(false); 
    //   onLoginSuccess();  
    //   return; 
    // }

    // Verifying by API Call
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify({
          RequestID: "SignIn",  
          UserID: userId,       
          Password: password    
        }),
      });

      console.log("Response status:", response.status);  

      const data = await response.json();  

      console.log("API Response:", data);  

      // Check if the API call was successful
      if (response.ok) {
        if (data.RC === 0) {
          // If the response code is 0, then login succesfull
          setSuccessMessage("Login successful!");  
          setLoading(false);  
          onLoginSuccess();   
        } else {
          // If RC is not 0, display the error message from the API
          setError(data.Message || "Invalid credentials. Please try again.");
          setLoading(false);
        }
      } else {
        setError("Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Network or other error:", error);  
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>

        {/* Gives error if details are incorrect */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Gives success message if login is successful */}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
