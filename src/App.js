import React, { useState } from "react";
import './App.css';
import SignIn from './Login.js';  // Login Screen
import EmployeeSalary from './EmployeeSalary.js';  // Employee Salary Screen

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Handle successful login (to be called from Login.js)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  // Set logged in state to true
  };

  // Handle logout (optional, for demonstration)
  const handleLogout = () => {
    setIsLoggedIn(false);  // Reset logged in state
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        // Show Employee Salary screen if logged in
        <EmployeeSalary onLogout={handleLogout} />
      ) : (
        // Show Login screen if not logged in
        <SignIn onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
