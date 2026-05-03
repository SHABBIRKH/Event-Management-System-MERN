import { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({ email: false, password: false });
  const [errorMessages, setErrorMessages] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const handleClose = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const validateForm = () => {
    const newErrors = { email: false, password: false };
    const newErrorMessages = { email: '', password: '' };
    let valid = true;

    if (!email) {
      newErrors.email = true;
      newErrorMessages.email = 'Email is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    return valid;
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);
  try {
    const response = await axios.post('http://localhost:5731/api/users/login', { email, password });
    const { token } = response.data;
  
    if (!token || typeof token !== 'string') {
      setErrorMessage('Invalid token received');
      setOpenError(true);
      setIsLoading(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    const { userId, isAdmin, name } = decodedToken; // Fixed: lowercase `isAdmin`

    Cookies.set('token', token, { expires: 1 / 24 });
    Cookies.set('name', name);

    setOpenSuccess(true);

    setTimeout(() => {
      if (isAdmin === true) {  
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin');
      } else {
        navigate('/home');
      }
    }, 1500);
  } catch (err) {
    console.error('Login error:', err);
    setErrorMessage('Login failed. Please check your email and password.');
    setOpenError(true);
  } finally {
    setIsLoading(false);
  }
};

  
  const textFieldStyle = (color = '#de5032') => ({
    '& label.Mui-focused': {
      color: color,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: color,
      },
    },
  });

  return (
    <Grid container sx={{ minHeight: '80vh', justifyContent: 'center', alignItems:'center' }}>
      {/* Left Panel */}
      <Grid
        item
        xs={12}
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
          sx={{ mb: 1, width: '300px' }}
        />
        <Typography variant="h4" gutterBottom>
          Welcome to Event Sphere
        </Typography>
        <Typography variant="body1" align="center">
          Join us and manage your events effortlessly with an interactive dashboard.
        </Typography>
      </Grid>

      {/* Right Panel */}
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom>
            Log in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              helperText={errorMessages.email}
              sx={textFieldStyle()}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={errorMessages.password}
              sx={textFieldStyle()}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#de5032',
                '&:disabled': {
                  backgroundColor: '#f5b7ab',
                },
              }}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <NavLink to="/" style={{ color: '#de5032', textDecoration: 'none' }}>
                  Don't have an account? Register now
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Login successful!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
