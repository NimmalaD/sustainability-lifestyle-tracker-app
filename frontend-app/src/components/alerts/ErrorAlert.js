import React from 'react'
import { Alert } from '@mui/material'

const ErrorAlert = ({errorMessage, sx={}}) => {
  return (
    <div>
        <Alert 
        variant="filled" 
        severity="error" 
        sx={{ 
            height:'20px', 
            display:'flex', 
            alignItems:'center', 
            width:'260px', ...sx
             }}>{errorMessage}</Alert>
    </div>
  )
}

export default ErrorAlert