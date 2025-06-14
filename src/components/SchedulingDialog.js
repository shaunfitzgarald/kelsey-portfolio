import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, isBefore } from 'date-fns';
import { getAvailableSlots, createEvent } from '../services/calendarService';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

const SchedulingDialog = ({ open, onClose, userEmail, userName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState('30-min');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (open) {
      fetchAvailableSlots(selectedDate);
    }
  }, [open, selectedDate]);

  const fetchAvailableSlots = async (date) => {
    setIsLoading(true);
    setError('');
    try {
      const busySlots = await getAvailableSlots(date);
      const available = TIME_SLOTS.filter(timeSlot => {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        const slotStart = new Date(date);
        slotStart.setHours(hours, minutes, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + 30);
        
        // Check if slot is in the past
        if (isBefore(slotStart, new Date())) {
          return false;
        }
        
        // Check if slot overlaps with any busy slots
        return !busySlots.some(busy => {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          return (
            (slotStart >= busyStart && slotStart < busyEnd) ||
            (slotEnd > busyStart && slotEnd <= busyEnd) ||
            (slotStart <= busyStart && slotEnd >= busyEnd)
          );
        });
      });
      
      setAvailableSlots(available);
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setError('Failed to load available time slots. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedTime('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      setError('Please select a time slot');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30);
      
      const event = {
        summary: `Meeting with ${userName || 'Client'}`,
        description: `Scheduled meeting with ${userName || 'Client'}`,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        attendeeEmail: userEmail,
      };
      
      await createEvent(event);
      setSuccess('Meeting scheduled successfully!');
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 2000);
    } catch (err) {
      console.error('Error scheduling meeting:', err);
      setError('Failed to schedule meeting. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>Schedule a Meeting</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Select Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  disablePast
                />
              </LocalizationProvider>
              
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Meeting Duration</InputLabel>
                <Select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  label="Meeting Duration"
                >
                  <MenuItem value="30-min">30 minutes</MenuItem>
                  <MenuItem value="60-min" disabled>60 minutes (coming soon)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
            
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Typography variant="subtitle1" gutterBottom>
                Available Time Slots
              </Typography>
              
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : availableSlots.length === 0 ? (
                <Typography>No available time slots for this date.</Typography>
              ) : (
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1,
                  maxHeight: 300,
                  overflowY: 'auto',
                  p: 1,
                }}>
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTime === slot ? 'contained' : 'outlined'}
                      onClick={() => setSelectedTime(slot)}
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        color: selectedTime === slot ? 'white' : 'inherit',
                      }}
                    >
                      {slot}
                    </Button>
                  ))}
                </Box>
              )}
              
              {selectedTime && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Selected Time:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          
          {success && (
            <Box sx={{ mt: 2 }}>
              <Typography color="primary">{success}</Typography>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isLoading || !selectedTime}
          >
            {isLoading ? 'Scheduling...' : 'Schedule Meeting'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SchedulingDialog;