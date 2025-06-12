import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    icon: <LinkedIn sx={{ fontSize: 24 }} />,
    url: 'https://www.linkedin.com/in/kelsey-stephenson',
    label: 'LinkedIn',
  },
  {
    icon: <GitHub sx={{ fontSize: 24 }} />,
    url: 'https://github.com/kelsey-stephenson',
    label: 'GitHub',
  },
  {
    icon: <Email sx={{ fontSize: 24 }} />,
    url: 'mailto:kelsey@example.com',
    label: 'Email',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Kelsey Stephenson. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <IconButton
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              </motion.div>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              component={RouterLink}
              to="/privacy"
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
