import React from 'react'
import { Alert } from '@mui/material'

const SuccessAlert = ({successMessage, sx = {}}) => {
  return (
    <div>
        <Alert 
        variant="filled" 
        severity="success" 
        sx={{height:'20px', 
            display:'flex', 
            alignItems:'center', 
            width:'260px',...sx}}>{successMessage}</Alert>
    </div>
  )
}

export default SuccessAlert