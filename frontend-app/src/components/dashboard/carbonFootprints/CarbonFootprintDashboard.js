import React from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import TungstenIcon from '@mui/icons-material/Tungsten';
import IndividualCarbonSummary from "./IndividualCarbonSummary";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const CarbonFootprintDashboard = () => {
  
  return (
    <Box>
      <Paper elevation={3} sx={{padding:''}}>
        <Stack
          direction="column"
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            padding: '10px',
            width: '170px'
          }}
        >
          <IndividualCarbonSummary name={'Electricity'} units={500} icon={TungstenIcon} color={'#F2DF07'}></IndividualCarbonSummary>
          <IndividualCarbonSummary name={'Gas'} units={500} icon={GasMeterIcon} color={'#0BDA51'}></IndividualCarbonSummary>
          <IndividualCarbonSummary name={'Water'} units={500} icon={WaterDropIcon} color={'#00d0ff'}></IndividualCarbonSummary>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CarbonFootprintDashboard;
