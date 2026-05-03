import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  Box,
  FormHelperText,
  Avatar
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import UploadIcon from '@mui/icons-material/Upload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  marginTop: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#de5032',
  color: 'white',
  padding: '12px 32px',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#c1452e',
    boxShadow: 'none',
  },
  '&:disabled': {
    backgroundColor: '#f5b7ab',
  },
}));

const EventForm = () => {
  const [formData, setFormData] = useState({
    organizer: '',
    title: '',
    type: '',
    date: null,
    floor: '',
    description: '',
    email: '',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const eventTypes = [
    'concert',
    'exhibition',
    'seminar',
    'workshop',
    'conference'
  ];

  const floors = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.organizer.trim()) newErrors.organizer = 'Organizer is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.type) newErrors.type = 'Event type is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.floor) newErrors.floor = 'Floor is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('organizer', formData.organizer);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('date', formData.date.toISOString());
      formDataToSend.append('floor', formData.floor);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('email', formData.email);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      const response = await fetch('http://localhost:5731/api/events/post', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (!response.ok) throw new Error('Failed to submit event');
      
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        organizer: '',
        title: '',
        type: '',
        date: null,
        floor: '',
        description: '',
        email: '',
        image: null
      });
    } catch (error) {
      console.error('Error submitting event:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledPaper elevation={3}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ 
            bgcolor: '#de5032', 
            width: 60, 
            height: 60,
            margin: '0 auto 16px'
          }}>
            <EventIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            color: '#333',
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}>
            Exhibit Your Event
          </Typography>
          <Typography variant="body1" color="text.secondary">
            organize your own event. send us the application 
          </Typography>
        </Box>
        
        {submitSuccess && (
          <Box sx={{ 
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            border: '1px solid #4caf50',
            color: '#4caf50',
            padding: 2,
            borderRadius: '8px',
            marginBottom: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <CheckCircleIcon />
            <Typography>we have recieved your application. you'll be notified soon!</Typography>
          </Box>
        )}
        
        {errors.submit && (
          <Box sx={{ 
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid #f44336',
            color: '#f44336',
            padding: 2,
            borderRadius: '8px',
            marginBottom: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <ErrorIcon />
            <Typography>{errors.submit}</Typography>
          </Box>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Organizer Name"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                error={!!errors.organizer}
                helperText={errors.organizer}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Event Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Event Type"
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  {eventTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.floor}>
                <InputLabel>Floor</InputLabel>
                <Select
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  label="Floor"
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  {floors.map(floor => (
                    <MenuItem key={floor} value={floor}>
                      {floor}
                    </MenuItem>
                  ))}
                </Select>
                {errors.floor && <FormHelperText>{errors.floor}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Event Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      fullWidth 
                      error={!!errors.date}
                      helperText={errors.date}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                variant="outlined"
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ 
                border: '1px dashed rgba(0, 0, 0, 0.23)',
                borderRadius: '8px',
                padding: 3,
                textAlign: 'center',
                backgroundColor: '#fafafa'
              }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="event-image"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="event-image">
                  <Button 
                    variant="outlined" 
                    component="span"
                    startIcon={<UploadIcon />}
                    sx={{
                      borderRadius: '8px',
                      borderColor: '#de5032',
                      color: '#de5032',
                      '&:hover': {
                        borderColor: '#c1452e',
                        backgroundColor: 'rgba(222, 80, 50, 0.04)'
                      }
                    }}
                  >
                    Upload Event Image
                  </Button>
                </label>
                {formData.image && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Selected: {formData.image.name}
                  </Typography>
                )}
                <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                  (Optional) JPEG, PNG or GIF. Max 5MB.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  size="large"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Event'}
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default EventForm;