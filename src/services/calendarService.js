// calendarService.js (Browser Safe)
// All Node.js-only googleapis usage removed.
// To integrate Google Calendar, use the REST API or embed, or move logic to a backend service.

// Placeholder: Returns a Google Calendar embed URL for a public calendar (customize as needed)
export function getGoogleCalendarEmbedUrl(calendarId) {
  return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=America%2FLos_Angeles`;
}

// Placeholder: Open Google Calendar event creation page
export function openGoogleCalendarEvent({ title, details, location, start, end }) {
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`;
  window.open(url, '_blank');
}

// You can add more browser-safe calendar helpers here as needed.







