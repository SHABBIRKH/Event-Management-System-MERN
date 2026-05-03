import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button,
  Box,
  Typography,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

export default function RegistrationDialog({ open, onClose, onRegister, event }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: false, email: false });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    // Basic validation
    const newErrors = {
      name: formData.name.trim() === '',
      email: !validateEmail(formData.email)
    };
    
    setErrors(newErrors);
    
    if (!newErrors.name && !newErrors.email) {
      onRegister(event._id, formData);
      onClose();
      setFormData({ name: '', email: '' }); // Reset form
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          width: '100%',
          maxWidth: '450px',
          background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <DialogTitle sx={{ 
          backgroundColor: '#de5032', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          py: 2
        }}>
          <EventIcon fontSize="medium" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Register for {event?.title}
          </Typography>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={onClose} 
            aria-label="close"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Box>

      <DialogContent sx={{ py: 3, px: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Organized by: {event?.organizer}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {new Date(event?.date).toLocaleDateString()}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            error={errors.name}
            helperText={errors.name ? 'Please enter your name' : ''}
            InputProps={{
              startAdornment: (
                <PersonIcon color="action" sx={{ mr: 1 }} />
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />

          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
            helperText={errors.email ? 'Please enter a valid email' : ''}
            InputProps={{
              startAdornment: (
                <EmailIcon color="action" sx={{ mr: 1 }} />
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: '8px',
            px: 3,
            py: 1,
            borderColor: '#de5032',
            color: '#de5032',
            '&:hover': {
              backgroundColor: 'rgba(222, 80, 50, 0.08)',
              borderColor: '#de5032'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: '8px',
            px: 3,
            py: 1,
            backgroundColor: '#de5032',
            '&:hover': {
              backgroundColor: '#c1452e'
            }
          }}
        >
          Register Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}