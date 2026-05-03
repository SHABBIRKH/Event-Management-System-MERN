import React, { useState, useEffect } from 'react';
import { 
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Button
} from '@mui/material';
import RegistrationDialog from './attendeeregister';

const EventsDisplay = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5731/api/events/getapproved');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId, formData) => {
    try {
      const response = await fetch(`http://localhost:5731/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      // Handle success (e.g., show a toast message)
    } catch (error) {
      // Handle error
    }
  };

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

  if (events.length === 0) {
    return (
      <Typography align="center" mt={4}>
        No events found
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
             Events going On
            </Typography>
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              onClick={() => {
                setSelectedEvent(event);
                setDialogOpen(true);
              }}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Event Image */}
              <CardMedia
                component="img"
                height="180"
                // image={event.image } 
                //  image={event.image || `http://localhost:5731/${event.image}`}
                image={'event.png'}
                alt={event.title}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                }}
              />

              {/* Event Date Chip (Example) */}
              <Chip
                label={new Date(event.date).toLocaleDateString()}
                color="primary"
                size="small"
                sx={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10, 
                  backgroundColor: 'rgba(0, 0, 0, 0.7)' 
                }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h3" noWrap>
                  {event.title || 'Untitled Event'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {event.organizer || 'Unknown Organizer'}
                </Typography>
                <Typography variant="body2" sx={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {event.description || 'No description provided.'}
                </Typography>
              </CardContent>

              {/* Register Button (Optional) */}
              <Box sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{
                    backgroundColor: '#de5032',
                    '&:hover': { backgroundColor: '#c1452e' },
                  }}
                >
                  Register Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <RegistrationDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onRegister={handleRegister}
        event={selectedEvent}
      />
    </Container>
  );
};

export default EventsDisplay;