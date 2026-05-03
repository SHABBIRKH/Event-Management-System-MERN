// Footer.js
import React from 'react';
import { Box, Typography, Link, IconButton, Stack } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#cc2b06',
        color: 'white',
        py: 2,
        px: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Contact Info */}
      <Box>
        <Typography variant="body2" sx={{ fontSize: 12,fontWeight:700 }}>
          Contact Us
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 12 ,fontWeight:700, color:'white'}}>
          Email: <Link href="eprojectsem@gmail.com" underline="hover">eprojectsem@gmail.com</Link>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 12,fontWeight:700 }}>
          Phone: +92 1234567
        </Typography>
      </Box>

      {/* Social Icons */}
      <Stack direction="row" spacing={1}>
        <IconButton size="small" color="inherit">
          <Facebook fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit">
          <Twitter fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit">
          <LinkedIn fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit">
          <Instagram fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
