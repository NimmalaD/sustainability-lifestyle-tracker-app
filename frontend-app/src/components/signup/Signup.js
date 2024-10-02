import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axiosInstance from "../../axiosInstance";
import ErrorAlert from "../alerts/ErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";
import { Link } from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log(formData);

    try {
      const res = await axiosInstance.post("/users", formData);
      console.log("User Registered", res.data);
      console.log("Registration message", res.data.message);
      setSuccess(true);
      setSuccessMessage(res.data.message);
      setFormData({ name: "", email: "", password: "", age: "" });
      setError(null);
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      if (error.response && error.response.data && error.response.data.error) {
        // alert(error.response.data.error);
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#7D1D3F",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
          width: "350px",
          height: "400px",
          marginLeft: "700px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "350px",
            paddingTop: "20px",
            paddingLeft:'40px',
            paddingRight: '40px',
            paddingBottom: '40px',
            border: "1px solid white",
            borderRadius: "10px",
            height: "420px",
            backgroundColor: "white",
          }}
        >
          <div>
            {error && (
              <ErrorAlert
                errorMessage={error}
                sx={{ position: "absolute", top: 163, left: 924, right: 10 }}
              ></ErrorAlert>
            )}
            {success && (
              <SuccessAlert
                successMessage={successMessage}
                sx={{ position: "absolute", top: 163, left: 924, right: 10 }}
              ></SuccessAlert>
            )}
          </div>
          <div>
                <h3 sx={{margin: '0px'}}>New User? Register here!</h3>
            </div>
          <TextField
            label="Name"
            type="text"
            variant="standard"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: 50,
                "& input": {
                  padding: "14px",
                },
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            variant="standard"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: 50,
                "& input": {
                  padding: "14px",
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: 50,
                "& input": {
                  padding: "14px",
                },
              },
            }}
          />
          <TextField
            label="Age"
            type="number"
            variant="standard"
            required
            name="age"
            value={formData.age}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: 50,
                "& input": {
                  padding: "14px",
                },
              },
            }}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100px" }}
            >
              Register
            </Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', fontSize: '15px' }}> 
            <p>Already Registered?</p><Link href="/login" underline="always">Login</Link>
          </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Signup;
