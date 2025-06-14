import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Privacy Policy
    </Typography>
    <Box sx={{ my: 3 }}>
      <Typography variant="body1" paragraph>
        Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Information We Collect</Typography>
      <Typography variant="body1" paragraph>
        We may collect personal information such as your name, email address, and any other information you voluntarily provide via contact forms or scheduling features.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>How We Use Your Information</Typography>
      <Typography variant="body1" paragraph>
        We use your information to respond to inquiries, schedule meetings, and improve our services. We do not sell or share your information with third parties except as required by law or to fulfill your requests.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Cookies</Typography>
      <Typography variant="body1" paragraph>
        Our website may use cookies to enhance your experience. You can disable cookies in your browser settings.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Third-Party Services</Typography>
      <Typography variant="body1" paragraph>
        We may use third-party services (such as Google Calendar or analytics tools) that collect, monitor, and analyze information to improve our website.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Data Security</Typography>
      <Typography variant="body1" paragraph>
        We implement reasonable measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Contact Us</Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about this Privacy Policy, please contact us at kelsey@kelseysinclaire.com.
      </Typography>
    </Box>
  </Container>
);

export default PrivacyPolicy;
