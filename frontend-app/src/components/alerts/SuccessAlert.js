import React from 'react'
import { Alert } from '@mui/material'

const SuccessAlert = ({successMessage}) => {
  return (
    <div>
        <Alert 
        variant="filled" 
        severity="success" 
        sx={{ 
            position: "absolute", 
            top: 163, 
            left: 924, 
            right: 10, 
            height:'20px', 
            display:'flex', 
            alignItems:'center', 
            width:'260px'
             }}>{successMessage}</Alert>
    </div>
  )
}

export default SuccessAlert