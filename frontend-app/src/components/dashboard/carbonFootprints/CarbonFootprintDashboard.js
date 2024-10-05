import React from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import TungstenIcon from '@mui/icons-material/Tungsten';
import IndividualCarbonSummary from "./IndividualCarbonSummary";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const CarbonFootprintDashboard = ({home, transport, waste, totalEmission}) => {
  
  return (
    <Box>
      <Paper elevation={3} sx={{padding:''}}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
            padding: '15px',
           
          }}
        >
          <IndividualCarbonSummary name={'Electricity'} units={home} icon={TungstenIcon} color={'#F2DF07'}></IndividualCarbonSummary>
          <IndividualCarbonSummary name={'Transport'} units={transport} icon={GasMeterIcon} color={'#0BDA51'}></IndividualCarbonSummary>
          <IndividualCarbonSummary name={'Waste'} units={waste} icon={WaterDropIcon} color={'#00d0ff'}></IndividualCarbonSummary>
          <IndividualCarbonSummary name={'Total'} units={totalEmission} icon={WaterDropIcon} color={'#00d0ff'}></IndividualCarbonSummary>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CarbonFootprintDashboard;
