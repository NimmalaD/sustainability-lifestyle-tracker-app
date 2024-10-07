
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import axiosInstance from '../../axiosInstance';

const AddCarbonFootprint = ({ open, close, onSubmit }) => {
  // State to store input values
  const [electricity, setElectricity] = useState(0);
  const [gas, setGas] = useState(0);
  const [water, setWater] = useState(0);
  const [car, setCar] = useState(0);
  const [bike, setBike] = useState(0);
  const [publicTransport, setPublicTransport] = useState(0);
  const [walk, setWalk] = useState(0);
  const [plastic, setPlastic] = useState(0);
  const [glass, setGlass] = useState(0);
  const [paper, setPaper] = useState(0);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const home = electricity + gas + water;
      const waste = plastic + glass + paper;
      const transport = car + bike + publicTransport + walk;
      const totalEmission = (electricity * 0.5) + (gas * 2.5) + (water * 0.1) + 
                              (car * 0.2) + (bike * 0.2) + (publicTransport * 0.2) + (walk * 0.2) + 
                              (plastic * 0.2) + (glass) + (paper * 0.1);

      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken');

      const carbonFootprintData = {
        date: new Date().toISOString(),
        homeEnergy: { electricity, gas, water },
        transport: { car, bike, publicTransport, walk },
        waste: { plastic, glass, paper },
        totalCarbonEmission: totalEmission      };

      await axiosInstance.post(
        `/users/${userId}/carbon-footprint`,
        { carbonFootprintData },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      // Call the onSubmit function to update the state in the parent component
      onSubmit(home, transport, waste, totalEmission);
      close(); // Close the dialog
    } catch (error) {
      console.error('Error adding carbon footprint:', error);
    }
  };

  return (
    <Box>
      {/* Modal Dialog */}
      <Dialog open={open} onClose={close} fullWidth>
        <DialogTitle>Fill out the form</DialogTitle>
        <DialogContent sx={{paddingTop:'20px'}}>
          {/* Form inside the modal */}
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Electricity"
              variant="outlined"
              type="number"
              value={electricity}
              onChange={(e) => setElectricity(Number(e.target.value))}
              placeholder='Electricity'
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Gas"
              variant="outlined"
              type="number"
              value={gas}
              onChange={(e) => setGas(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Water"
              variant="outlined"
              type="number"
              value={water}
              onChange={(e) => setWater(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Car"
              variant="outlined"
              type="number"
              value={car}
              onChange={(e) => setCar(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Bike"
              variant="outlined"
              type="number"
              value={bike}
              onChange={(e) => setBike(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Public Transport"
              variant="outlined"
              type="number"
              value={publicTransport}
              onChange={(e) => setPublicTransport(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Walk"
              variant="outlined"
              type="number"
              value={walk}
              onChange={(e) => setWalk(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Plastic"
              variant="outlined"
              type="number"
              value={plastic}
              onChange={(e) => setPlastic(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Glass"
              variant="outlined"
              type="number"
              value={glass}
              onChange={(e) => setGlass(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Paper"
              variant="outlined"
              type="number"
              value={paper}
              onChange={(e) => setPaper(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {/* Actions for the modal */}
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddCarbonFootprint;
