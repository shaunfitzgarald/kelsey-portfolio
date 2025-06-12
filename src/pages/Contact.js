import React, { useState } from 'react';
import { Box, Typography, Container, Grid, TextField, Button, Paper, Divider, useTheme, useMediaQuery, Alert, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { Email, Phone, LocationOn, Schedule } from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would send this data to your backend
      console.log('Form submitted:', { ...formData, date: selectedDate, time: selectedTime });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbarMessage('Your message has been sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbarMessage('There was an error sending your message. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Email',
      value: 'kelsey@example.com',
      action: 'Send an email',
      href: 'mailto:kelsey@example.com'
    },
    {
      icon: <Phone sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      action: 'Call me',
      href: 'tel:+15551234567'
    },
    {
      icon: <LocationOn sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Location',
      value: 'San Francisco, CA',
      action: 'View on map',
      href: 'https://maps.google.com/?q=San+Francisco+CA'
    },
    {
      icon: <Schedule sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Working Hours',
      value: 'Mon - Fri: 9am - 5pm',
      action: 'Book a call',
      href: '#schedule'
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Get In Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Have a project in mind or want to discuss potential opportunities? Feel free to reach out using the form below or through any of the contact methods provided.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
                    Contact Information
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                          <Box sx={{ mt: 0.5 }}>
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                              {item.value}
                            </Typography>
                            <Button
                              component="a"
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : '_self'}
                              rel="noopener noreferrer"
                              size="small"
                              sx={{
                                px: 0,
                                textTransform: 'none',
                                color: 'primary.main',
                                fontWeight: 500,
                                '&:hover': {
                                  backgroundColor: 'transparent',
                                  textDecoration: 'underline',
                                },
                              }}
                              startIcon={item.action === 'Book a call' ? <Schedule fontSize="small" /> : null}
                            >
                              {item.action}
                            </Button>
                          </Box>
                        </Box>
                        {index < contactInfo.length - 1 && (
                          <Divider sx={{ my: 3, borderColor: 'divider' }} />
                        )}
                      </motion.div>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
                    Send Me a Message
                  </Typography>
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          multiline
                          rows={6}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      
                      {/* Schedule Section */}
                      <Grid item xs={12} id="schedule">
                        <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                          Schedule a Meeting
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                disablePast
                                sx={{ width: '100%', maxWidth: '100%' }}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ mt: 2 }}>
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                  label="Select Time"
                                  value={selectedTime}
                                  onChange={(newValue) => setSelectedTime(newValue)}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      fullWidth
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                  )}
                                  ampm={false}
                                  minutesStep={30}
                                  minTime={new Date(0, 0, 0, 9, 0)} // 9 AM
                                  maxTime={new Date(0, 0, 0, 17, 0)} // 5 PM
                                />
                              </LocalizationProvider>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                                Available Monday to Friday, 9:00 AM - 5:00 PM PST
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={isSubmitting}
                          sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            mt: 1,
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Map Section */}
          <Box sx={{ mt: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Find Me On The Map
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  height: 400,
                  position: 'relative',
                  bgcolor: 'background.paper',
                }}
              >
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.99640994534!2d-122.52000195716043!3d37.75776267633799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1623456789012!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                />
              </Paper>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
      
      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
