import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axiosInstance from '../../axiosInstance'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState('')
  const navigate = useNavigate()

  const handleClickRegisterLink = () =>{
    navigate('/signup')
  }
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "350px",
            padding: "25px",
            border: "1px solid white",
            borderRadius: "10px",
            height: "200px",
            backgroundColor: "white",
          }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
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
            variant="outlined"
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
            <Button type="submit" variant="contained" color="primary" sx={{ width: "100px" }}>
              Login
            </Button>
          </div>
          <div>
          <a onClick={handleClickRegisterLink}>Click here to register</a>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;
