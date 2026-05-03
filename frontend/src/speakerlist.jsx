import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import { Email, Person, Info } from '@mui/icons-material';

const SpeakersList = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch('http://localhost:5731/speaker/');
        if (!response.ok) throw new Error('Failed to fetch speakers');
        const data = await response.json();
        setSpeakers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        Error: {error}
      </Typography>
    );
  }

  if (speakers.length === 0) {
    return (
      <Typography align="center" mt={4}>
        No speakers found
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: '#de5032',
          fontWeight: 700,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Our Distinguished Speakers
      </Typography>
      
      <Grid container spacing={4}>
        {speakers.map((speaker) => (
          <Grid item key={speaker._id} xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.03)'
              }
            }}>
              <CardMedia
                component="img"
                height="240"
                image={`http://localhost:5731/${speaker.imageurl}`}
                alt={speaker.name}
                sx={{
                  objectFit: 'cover',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x240?text=Speaker+Image';
                }}
              />
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  gap: 1
                }}>
                  <Person color="action" />
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    {speaker.name}
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1.5,
                  gap: 1
                }}>
                  <Email color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {speaker.email}
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  mt: 2
                }}>
                  <Info color="action" fontSize="small" sx={{ mt: 0.5 }} />
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {speaker.bio}
                  </Typography>
                </Box>
              </CardContent>
              
              <Box sx={{ p: 2, pt: 0 }}>
                <Chip 
                  label="Expert Speaker"
                  color="primary"
                  size="small"
                  sx={{ 
                    backgroundColor: '#de5032',
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SpeakersList;