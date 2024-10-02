import React, { useState } from "react";
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
      console.log("Login Successful", res.data);
      console.log("Login message message", res.data.message);
      setSuccess(true);
      setSuccessMessage(res.data.message);
      setFormData({email: "", password: ""});
      setError(null);
    } catch (error) {
      console.error(
        "Error during logging in:",
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
