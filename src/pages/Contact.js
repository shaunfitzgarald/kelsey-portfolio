import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  useTheme, 
  Alert, 
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Email, Phone, LocationOn, Schedule, CalendarMonth } from '@mui/icons-material';
import SchedulingDialog from '../components/SchedulingDialog';

const Contact = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Unused
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isScheduling, setIsScheduling] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null); // Unused
  // const [selectedTime, setSelectedTime] = useState(null); // Unused

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
      console.log('Form submitted:', { ...formData });
      
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
      // setSelectedDate(null); // Removed as state is unused
      // setSelectedTime(null); // Removed as state is unused
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbarMessage('There was an error sending your message. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2, maxWidth: 700, mx: 'auto' }}>
              Have questions or want to work together? Send me a message or schedule a meeting directly through my calendar.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Contact Information
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Feel free to reach out to me for any questions or opportunities. I'll get back to you as soon as possible.
                  </Typography>

                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Email color="primary" sx={{ mr: 2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                        <Typography variant="body1">kelsey@kelseysinclaire.com</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Phone color="primary" sx={{ mr: 2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                        <Typography variant="body1">+1 (555) 123-4567</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <LocationOn color="primary" sx={{ mr: 2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                        <Typography variant="body1">San Diego, CA</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Schedule a Meeting
                    </Typography>
                    <Schedule color="primary" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Book a 30-minute meeting directly on my calendar.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => setIsScheduling(true)}
                    startIcon={<CalendarMonth />}
                    sx={{
                      mt: 1,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Book a Meeting
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4, md: 6 },
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                  height: '100%',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
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
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          * Required fields
                        </Typography>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={isSubmitting}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            textTransform: 'none',
                            borderRadius: 2,
                            boxShadow: 'none',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            },
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Box>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53632.68402107316!2d-117.2125871!3d32.715738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9549b8e8f9c1d%3A0x4e5e7ff7b7c8e6b5!2sSan%20Diego%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1718398482000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
              />
            </Paper>
          </motion.div>
        </Box>
      </Container>

      <SchedulingDialog
        open={isScheduling}
        onClose={() => setIsScheduling(false)}
        userEmail={formData.email}
        userName={formData.name}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
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
