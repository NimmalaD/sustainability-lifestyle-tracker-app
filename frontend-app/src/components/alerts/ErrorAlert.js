import React from 'react'
import { Alert } from '@mui/material'

const ErrorAlert = ({errorMessage}) => {
  return (
    <div>
        <Alert 
        variant="filled" 
        severity="error" 
        sx={{ 
            position: "absolute", 
            top: 163, 
            left: 924, 
            right: 10, 
            height:'20px', 
            display:'flex', 
            alignItems:'center', 
            width:'260px'
             }}>{errorMessage}</Alert>
    </div>
  )
}

export default ErrorAlert