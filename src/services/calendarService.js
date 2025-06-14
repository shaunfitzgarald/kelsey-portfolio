import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Initialize Google Calendar API client
const initClient = () => {
  try {
    const auth = new google.auth.OAuth2(
      process.env.REACT_APP_GOOGLE_CLIENT_ID,
      process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      process.env.REACT_APP_GOOGLE_REDIRECT_URI
    );
    return google.calendar({ version: 'v3', auth });
  } catch (error) {
    console.error('Error initializing Google Calendar client:', error);
    throw error;
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('googleAuthToken');
  return !!token;
};

// Get auth URL for OAuth2
const getAuthUrl = () => {
  const auth = new google.auth.OAuth2(
    process.env.REACT_APP_GOOGLE_CLIENT_ID,
    process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    process.env.REACT_APP_GOOGLE_REDIRECT_URI
  );
  
  return auth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
};

// Handle OAuth2 callback
const handleAuthCallback = async (code) => {
  try {
    const auth = new google.auth.OAuth2(
      process.env.REACT_APP_GOOGLE_CLIENT_ID,
      process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      process.env.REACT_APP_GOOGLE_REDIRECT_URI
    );
    
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);
    localStorage.setItem('googleAuthToken', JSON.stringify(tokens));
    return true;
  } catch (error) {
    console.error('Error handling auth callback:', error);
    throw error;
  }
};

// Create a new calendar event
const createEvent = async (eventData) => {
  try {
    const tokens = JSON.parse(localStorage.getItem('googleAuthToken') || '{}');
    if (!tokens.access_token) {
      throw new Error('Not authenticated');
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials(tokens);
    
    const calendar = google.calendar({ version: 'v3', auth });
    
    const event = {
      summary: eventData.summary || 'Meeting with Kelsey',
      description: eventData.description || 'Scheduled meeting',
      start: {
        dateTime: eventData.startTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: eventData.endTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [
        { email: eventData.attendeeEmail },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.REACT_APP_GOOGLE_CALENDAR_ID,
      resource: event,
      sendUpdates: 'all',
    });

    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

// Get available time slots
const getAvailableSlots = async (date) => {
  try {
    const tokens = JSON.parse(localStorage.getItem('googleAuthToken') || '{}');
    if (!tokens.access_token) {
      throw new Error('Not authenticated');
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials(tokens);
    
    const calendar = google.calendar({ version: 'v3', auth });
    
    const startOfDay = new Date(date);
    startOfDay.setHours(9, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(17, 0, 0, 0);
    
    const response = await calendar.freebusy.query({
      resource: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        items: [{ id: process.env.REACT_APP_GOOGLE_CALENDAR_ID }],
      },
    });

    const busySlots = response.data.calendars[process.env.REACT_APP_GOOGLE_CALENDAR_ID].busy || [];
    return busySlots;
  } catch (error) {
    console.error('Error getting available slots:', error);
    throw error;
  }
};

export {
  initClient,
  isAuthenticated,
  getAuthUrl,
  handleAuthCallback,
  createEvent,
  getAvailableSlots,
};
