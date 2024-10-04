import { Box, Typography } from '@mui/material';
import React from 'react';

const IndividualCarbonSummary = ({ name, units, icon: Icon, color }) => {
  return (
    <Box
      sx={{
        width: 150,
        borderRadius: 1,
        backgroundColor: color,
        padding: 2, // Add padding for better spacing
        display: 'flex',
        justifyContent: 'space-between', // Align content and icon to left and right
        alignItems: 'center',
      }}
    >
      <Box sx={{ textAlign: 'start' }}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: '12px', color: 'gray', textTransform: 'uppercase' }} // Capitalize the name
        >
          {name}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          {units}
        </Typography>
      </Box>
      {Icon && <Icon sx={{ fontSize: 30 }} />}
    </Box>
  );
};

export default IndividualCarbonSummary;
