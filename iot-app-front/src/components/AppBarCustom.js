import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Alarms from '../pages/Alarms'

const AppBarCustom = ({}) =>{
  const [alarmsNumber, setAlarmsNumber] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleAlarmsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null)
  };

  const menuAlarms = 'primary-menu-alarms';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuAlarms}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Alarms parentAlarmsNumber={(number)=>setAlarmsNumber(number)} />
    </Menu>
    
  );

  useEffect(()=>{
    console.log(alarmsNumber)
  }, [alarmsNumber])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: 'block' }}
          >
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              aria-label="show new alarms"
              color="inherit"
              onClick={handleAlarmsMenuOpen}
            >
              <Badge badgeContent={alarmsNumber} color="error" >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default AppBarCustom