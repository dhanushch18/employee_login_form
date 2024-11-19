import React, { useState } from "react";

const EmployeeSalary = () => {
  const [employeeId, setEmployeeId] = useState(""); 
  const [name, setName] = useState(""); 
  const [dob, setDob] = useState(""); 
  const [salary, setSalary] = useState(""); 
  const [error, setError] = useState(""); 
  const [message, setMessage] = useState(""); // New state for success messages
  const [loading, setLoading] = useState(false); 

  const validateEmployeeId = async (empId) => {
    setLoading(true); 
    try {
      const response = await fetch("/ReactTest/ReactTest.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          RequestID: "GetEmployeeDetails", 
          EmployeeID: empId, 
        }),
      });

      const data = await response.json();

      if (data.RC === 0) {
        setName(data.Name);
        setDob(data.DOB);
        setError(""); 
        setMessage(""); // Clear success message on new Employee ID
      } else {
        setError("Invalid Employee ID.");
        setMessage(""); // Clear success message for invalid case
        setName(""); 
        setDob(""); 
        setSalary(""); 
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      setMessage(""); // Clear success message for error case
      setName(""); 
      setDob(""); 
      setSalary(""); 
    } finally {
      setLoading(false); 
    }
  };

  const handleEmployeeIdChange = (e) => {
    const empId = e.target.value;
    setEmployeeId(empId);

    setName("");
    setDob("");
    setSalary(""); 
    setError("");
    setMessage(""); // Clear success message on new Employee ID input

    if (empId.length >= 4) {
      validateEmployeeId(empId);
    }
  };

  const handleEmployeeIdBlur = () => {
    if (employeeId.length >= 4) {
      validateEmployeeId(employeeId);
    } else if (employeeId) {
      setError("Invalid Employee ID.");
      setSalary(""); 
      setMessage(""); // Clear success message on invalid Employee ID
    }
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9\b]+$/.test(value)) {
      if (value <= 25000) {
        setSalary(value);
        setError(""); 
      } else {
        setSalary("25000"); 
        setError("Salary cannot exceed 25000.");
      }
    } else {
      setError("Please enter a valid number for salary.");
    }
  };

  const handleSave = () => {
    if (!name || !dob) {
      setError("Please enter a valid Employee ID before saving salary.");
      setMessage(""); // Clear success message for invalid case
      return;
    }

    if (salary < 1 || salary > 25000) {
      setError("Salary must be between 1 and 25000.");
      setMessage(""); // Clear success message for invalid salary
      return; 
    }

    setError("");
    setMessage("Details saved successfully!"); // Set success message

    console.log("Employee ID:", employeeId);
    console.log("Salary:", salary);
  };

  return (
    <div className="employee-salary-container">
      <h2>Employee Salary</h2>
      <form>
        <div>
          <label>Employee ID</label>
          <input
            type="text"
            value={employeeId}
            onChange={handleEmployeeIdChange}
            onBlur={handleEmployeeIdBlur}
            placeholder="Enter Employee ID"
          />
        </div>

        <div>
          <label>Name</label>
          <input type="text" value={name} disabled />
        </div>

        <div>
          <label>Date of Birth (DOB)</label>
          <input type="text" value={dob} disabled />
        </div>

        <div>
          <label>Salary</label>
          <input
            type="text"
            value={salary}
            onChange={handleSalaryChange}
            placeholder="Enter Salary (1 - 25000)"
            disabled={!name || !dob}
          />
        </div>

        {/* Display error or success messages */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}

        <button type="button" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeSalary;
