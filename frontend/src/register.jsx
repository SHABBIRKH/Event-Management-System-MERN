import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Regex patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{8,}$/;

  const textFieldStyle = (color = '#de5032') => ({
    '& label.Mui-focused': {
      color: color,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: color,
      },
    },
    marginBottom: isMobile ? '16px' : 'normal',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    const newErrorMessages = { ...errorMessages };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = true;
      newErrorMessages.name = 'Name is required';
      valid = false;
    } else {
      newErrors.name = false;
      newErrorMessages.name = '';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = true;
      newErrorMessages.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = true;
      newErrorMessages.email = 'Please enter a valid email address';
      valid = false;
    } else {
      newErrors.email = false;
      newErrorMessages.email = '';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required';
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = true;
      newErrorMessages.password = 'Password must be at least 8 characters';
      valid = false;
    } else {
      newErrors.password = false;
      newErrorMessages.password = '';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = true;
      newErrorMessages.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      newErrorMessages.confirmPassword = 'Passwords do not match';
      valid = false;
    } else {
      newErrors.confirmPassword = false;
      newErrorMessages.confirmPassword = '';
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
      setErrorMessages({ ...errorMessages, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5731/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", response.data);
      setOpenSuccess(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
      setOpenError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <Grid container sx={{ minHeight: '100vh',justifyContent:'center' }}>
      {/* Left Panel - Hidden on mobile */}
      {!isMobile && (
        <Grid
          item
          xs={false}
          md={6}
          sx={{
            backgroundColor: '#de5032',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box
            component="img"
            src="reg.png"
            alt="Illustration"
            sx={{ 
              mb: 1, 
              width: '100%', 
              maxWidth: '300px',
              height: 'auto'
            }}
          />
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Welcome to Event Sphere
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: '400px' }}>
            Join us and manage your events effortlessly with an interactive dashboard.
          </Typography>
        </Grid>
      )}

      {/* Right Panel */}
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={isMobile ? 0 : 6}
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: isMobile ? 2 : 4,
        }}
      >
        <Box sx={{ 
          width: '100%', 
          maxWidth: '400px',
          padding: isMobile ? '0 16px' : '0'
        }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              fontSize: isMobile ? '1.8rem' : '2.125rem'
            }}
          >
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              helperText={errorMessages.name}
              sx={textFieldStyle()}
              size={isMobile ? 'small' : 'medium'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errorMessages.email}
              sx={textFieldStyle()}
              size={isMobile ? 'small' : 'medium'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errorMessages.password}
              sx={textFieldStyle()}
              size={isMobile ? 'small' : 'medium'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              helperText={errorMessages.confirmPassword}
              sx={textFieldStyle()}
              size={isMobile ? 'small' : 'medium'}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                backgroundColor: '#de5032', 
                '&:hover': { 
                  backgroundColor: '#c1452a',
                  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                },
                padding: isMobile ? '8px 16px' : '10px 16px'
              }}
            >
              Register
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <NavLink 
                  to="/login" 
                  style={{ 
                    color: '#de5032', 
                    textDecoration: 'none',
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}
                >
                  Already have an account? Log in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

      {/* Success Alert */}
      <Snackbar 
        open={openSuccess} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Registration successful! You can now log in.
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar 
        open={openError} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Register;