import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { colors } from '@mui/material';
import SuccessAlert from '../alerts/SuccessAlert';
import { useState } from 'react';

export default function HomeNavbar() {
    const navigate = useNavigate();
    const handleOnClickLogin = () => {
        console.log('Login button clicked');
        navigate('/login')
    }
    const clickMessage = 'Clicked Successfully'
    const [click, setClick] = useState(false)
    const handleClick = () =>{
        setClick(true)
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#7D1D3F'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={handleOnClickLogin}>Login</Button>
        </Toolbar>
      </AppBar>
      <Button onClick={handleClick}>Click me</Button>
      {click && <SuccessAlert successMessage={clickMessage} sx={{position: 'absolute',top: '200px', left: '200px'}}></SuccessAlert>}
    </Box>
  );
}