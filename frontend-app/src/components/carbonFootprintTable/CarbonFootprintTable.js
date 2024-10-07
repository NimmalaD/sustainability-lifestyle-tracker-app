import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const CarbonFootprintTable = () => {
  const { userId } = useParams();
  const [recentFootprint, setRecentFootprint] = useState(null);

  useEffect(() => {
    const fetchCarbonFootprintData = async () => {
      try {
        const token = localStorage.getItem('authToken');

        // Fetch carbon footprint data
        const response = await axiosInstance.get(`/users/${userId}/carbon-footprint`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const footprints = response.data?.data || [];

        // Get the most recent footprint by sorting and selecting the first item
        if (footprints.length > 0) {
          const latestFootprint = footprints.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
          setRecentFootprint(latestFootprint);
        }
      } catch (error) {
        console.error('Error fetching carbon footprint data:', error);
      }
    };

    fetchCarbonFootprintData();
  }, [userId]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Typography variant="h6" align="center" sx={{ margin: 2 }}>
        Recent Carbon Footprint Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Electricity</TableCell>
            <TableCell align="right">Gas</TableCell>
            <TableCell align="right">Water</TableCell>
            <TableCell align="right">Car</TableCell>
            <TableCell align="right">Bike</TableCell>
            <TableCell align="right">Public Transport</TableCell>
            <TableCell align="right">Walk</TableCell>
            <TableCell align="right">Plastic</TableCell>
            <TableCell align="right">Glass</TableCell>
            <TableCell align="right">Paper</TableCell>
            <TableCell align="right">Total Emission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentFootprint ? (
            <TableRow key={recentFootprint._id}>
              <TableCell>{new Date(recentFootprint.date).toLocaleDateString()}</TableCell>
              <TableCell align="right">{recentFootprint.homeEnergy.electricity}</TableCell>
              <TableCell align="right">{recentFootprint.homeEnergy.gas}</TableCell>
              <TableCell align="right">{recentFootprint.homeEnergy.water}</TableCell>
              <TableCell align="right">{recentFootprint.transport.car}</TableCell>
              <TableCell align="right">{recentFootprint.transport.bike}</TableCell>
              <TableCell align="right">{recentFootprint.transport.publicTransport}</TableCell>
              <TableCell align="right">{recentFootprint.transport.walk}</TableCell>
              <TableCell align="right">{recentFootprint.waste.plastic}</TableCell>
              <TableCell align="right">{recentFootprint.waste.glass}</TableCell>
              <TableCell align="right">{recentFootprint.waste.paper}</TableCell>
              <TableCell align="right">{recentFootprint.totalCarbonEmission.toFixed(2)}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={12} align="center">
                No carbon footprint data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CarbonFootprintTable;
