import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import CarbonFootprintDashboard from './carbonFootprints/CarbonFootprintDashboard';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import AddCarbonFootprint from '../carbonFootprintsForm/AddCarbonFootprint';

const drawerWidth = 240;

export default function UserDashboard() {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [homeValue, setHomeValue] = useState(0);
  const [transportValue, setTransportValue] = useState(0);
  const [wasteValue, setWasteValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            
            // Fetch user information
            const userResponse = await axiosInstance.get(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsername(userResponse.data?.data?.name || '');

            // Fetch the carbon footprint data
            const carbonFootprintResponse = await axiosInstance.get(`/users/${userId}/carbon-footprint`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // If carbon footprint data is present, get the most recent one
            const carbonFootprints = carbonFootprintResponse.data?.data;
            if (carbonFootprints && carbonFootprints.length > 0) {
                const mostRecentFootprint = carbonFootprints.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                )[0];

                const homeEnergy = mostRecentFootprint.homeEnergy || {};
                const transport = mostRecentFootprint.transport || {};
                const waste = mostRecentFootprint.waste || {};

                const home = (homeEnergy.electricity || 0) + (homeEnergy.gas || 0) + (homeEnergy.water || 0);
                const transportTotal = (transport.car || 0) + (transport.bike || 0) + (transport.publicTransport || 0) + (transport.walk || 0);
                const wasteTotal = (waste.paper || 0) + (waste.plastic || 0) + (waste.glass || 0);

                // Set values
                setHomeValue(home);
                setTransportValue(transportTotal);
                setWasteValue(wasteTotal);
                setTotalValue(mostRecentFootprint.totalCarbonEmission); // Use the total emission from the backend
            }
        } catch (error) {
            console.error('Error fetching user or carbon footprint data:', error);
        }
    };
    
    fetchUserData();
}, [userId]);


  const handleOnClick = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  const onSubmitForm = (homeVal, transVal, wasteVal, totalVal) => {
    setHomeValue(homeVal);
    setTransportValue(transVal);
    setWasteValue(wasteVal);
    setTotalValue(totalVal);
    handleOnClose();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Welcome, {username ? username : 'User'}
          </Typography>
          <Button onClick={handleOnClick} sx={{ color: 'white' }}>Add Footprint</Button>
          <AddCarbonFootprint open={open} close={handleOnClose} onSubmit={onSubmitForm} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Stats', 'History'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <DashboardIcon />}
                    {index === 1 && <BarChartIcon />}
                    {index === 2 && <HistoryIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          <CarbonFootprintDashboard home={homeValue} transport={transportValue} waste={wasteValue} totalEmission={totalValue} />
        </Grid>
      </Box>
    </Box>
  );
}
