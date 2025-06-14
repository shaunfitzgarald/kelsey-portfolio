import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TermsOfService = () => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Terms of Service
    </Typography>
    <Box sx={{ my: 3 }}>
      <Typography variant="body1" paragraph>
        By using this website, you agree to the following terms and conditions. Please read them carefully.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Use of Site</Typography>
      <Typography variant="body1" paragraph>
        You agree to use this site for lawful purposes only. You may not use the site in any way that may damage, disable, or impair the site or interfere with any other party's use.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Intellectual Property</Typography>
      <Typography variant="body1" paragraph>
        All content on this site, including text, graphics, logos, and images, is the property of Kelsey Stephenson unless otherwise stated. You may not reproduce or distribute any content without permission.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Links to Other Sites</Typography>
      <Typography variant="body1" paragraph>
        This site may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Disclaimer</Typography>
      <Typography variant="body1" paragraph>
        This site is provided on an "as is" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of the site.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Limitation of Liability</Typography>
      <Typography variant="body1" paragraph>
        In no event shall Kelsey Stephenson or site contributors be liable for any damages arising out of your use of the site.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Changes to Terms</Typography>
      <Typography variant="body1" paragraph>
        We reserve the right to update these Terms of Service at any time. Continued use of the site constitutes acceptance of the revised terms.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Contact</Typography>
      <Typography variant="body1" paragraph>
        For questions about these Terms, contact kelsey@kelseysinclaire.com.
      </Typography>
    </Box>
  </Container>
);

export default TermsOfService;
