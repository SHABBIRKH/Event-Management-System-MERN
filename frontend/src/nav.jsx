import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,

} from '@mui/material';
import { NavLink } from 'react-router-dom';
export default function Nav() {
  return (
<>
 <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" color="black" fontWeight="bold">
            <span role="img" aria-label="calendar">📅</span> Event Sphere Management
          </Typography>
          <Box>
            <NavLink to = "/home"><Button>Home</Button></NavLink>
            <NavLink to = "/login"><Button>Login</Button></NavLink>
            <NavLink to = "/"><Button>register</Button></NavLink>
            {/* <Button color="inherit">Event Details</Button>
            <Button color="inherit">Event Registration</Button> */}
          </Box>
        </Toolbar>
      </AppBar>
</>
  )
}
