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
  TablePagination,
} from '@mui/material';

const CarbonFootprintTable = () => {
  const { userId } = useParams();
  const [footprints, setFootprints] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

        const data = response.data?.data || [];

        // Sort by date to get the latest footprints
        const sortedFootprints = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFootprints(sortedFootprints);
      } catch (error) {
        console.error('Error fetching carbon footprint data:', error);
      }
    };

    fetchCarbonFootprintData();
  }, [userId]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the data to be displayed on the current page
  const paginatedFootprints = footprints.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Typography variant="h6" align="center" sx={{ margin: 2 }}>
        Carbon Footprint Details
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
          {paginatedFootprints.length > 0 ? (
            paginatedFootprints.map((footprint) => (
              <TableRow key={footprint._id}>
                <TableCell>{new Date(footprint.date).toLocaleDateString()}</TableCell>
                <TableCell align="right">{footprint.homeEnergy.electricity}</TableCell>
                <TableCell align="right">{footprint.homeEnergy.gas}</TableCell>
                <TableCell align="right">{footprint.homeEnergy.water}</TableCell>
                <TableCell align="right">{footprint.transport.car}</TableCell>
                <TableCell align="right">{footprint.transport.bike}</TableCell>
                <TableCell align="right">{footprint.transport.publicTransport}</TableCell>
                <TableCell align="right">{footprint.transport.walk}</TableCell>
                <TableCell align="right">{footprint.waste.plastic}</TableCell>
                <TableCell align="right">{footprint.waste.glass}</TableCell>
                <TableCell align="right">{footprint.waste.paper}</TableCell>
                <TableCell align="right">{footprint.totalCarbonEmission.toFixed(2)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={12} align="center">
                No carbon footprint data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={footprints.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CarbonFootprintTable;
