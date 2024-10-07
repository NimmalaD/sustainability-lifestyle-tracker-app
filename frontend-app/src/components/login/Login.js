import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axiosInstance from "../../axiosInstance";
import ErrorAlert from "../alerts/ErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";
import { Link } from "@mui/material";
import {Divider, Typography} from "@mui/material";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

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
      const res = await axiosInstance.post("/login", formData);
      const {token, userId, userName, message} = res.data
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);
      setSuccess(true);
      setSuccessMessage(message);
      setFormData({email: "", password: ""});
      setError(null);
      navigate(`/dashboard/${userId}`)
    } catch (error) {
      console.error("Error during logging in:", error.response?.data || error.message);
      setSuccess(false)
      
      // Extract the message from the error response and set it
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response)
        console.log(error.response.data)
        console.log(error.response.data.message);
        setError(error.response.data.message); // Set the error message from the backend
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
            paddingTop: "50px",
            paddingLeft:'40px',
            paddingRight: '40px',
            paddingBottom: '10px',
            border: "1px solid white",
            borderRadius: "10px",
            height: "300px",
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
          <Divider><LockOpenOutlinedIcon></LockOpenOutlinedIcon><Typography level="h1" sx={{fontSize:'20px', fontWeight: 'bold'}}>Login</Typography></Divider>
          </div>
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
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100px" }}
            >
              Login
            </Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', fontSize: '15px' }}> 
            <p>New User?</p><Link href="/signup" underline="always">Register</Link>
          </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;
