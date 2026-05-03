import React from 'react';
import EventsDisplay from './eventdisplay';
import SpeakerList from './speakerlist';
import ExhibitForm from './exhibitform';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Link,
} from '@mui/material';
import { LocationOn, AccessTime, CalendarToday } from '@mui/icons-material';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import LocationOn from '@mui/icons-material/LocationOn';
// import CalendarToday from '@mui/icons-material/CalendarToday';
const Home = () => {
  return (
    <>
    <Box>
      {/* Header */}
     

      {/* Main Image */}
      <Box
        component="img"
        src="carousel.png" // Replace with actual image
        alt="Event Banner"
        sx={{ width: '100%', borderRadius: 2, mt: 2 }}
      />
        <SpeakerList></SpeakerList>

      
    </Box>
    <EventsDisplay></EventsDisplay>
    <ExhibitForm></ExhibitForm>
    </>
  );
};

export default Home;
