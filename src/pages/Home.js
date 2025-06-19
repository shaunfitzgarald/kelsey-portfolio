import React from 'react';
import { Box, Typography, Button, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Default content fallback
  const defaultContent = {
    title: "Kelsey Sinclaire Stephenson",
    subtitle: "Performance Marketing, Customer Success & Growth Leader",
    description: "Driving business growth through data-driven marketing strategies and exceptional customer experiences. Specializing in performance marketing, customer success, and revenue growth.",
    ctaPrimary: "View Resume",
    ctaSecondary: "Contact Me",
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "50+", label: "Happy Clients" },
      { value: "200%", label: "Revenue Growth" },
      { value: "99%", label: "Client Retention" }
    ],
    socialLinks: [
      { icon: 'LinkedIn', label: 'LinkedIn', url: 'https://linkedin.com' },
      { icon: 'GitHub', label: 'GitHub', url: 'https://github.com' },
      { icon: 'Email', label: 'Email', url: 'mailto:contact@example.com' },
    ]
  };

  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'site_content', 'home'));
        if (docSnap.exists()) {
          setContent({ ...defaultContent, ...docSnap.data() });
        }
      } catch (err) {
        // fallback to defaultContent
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  // Icon mapping
  const iconMap = {
    LinkedIn: <LinkedIn />,
    GitHub: <GitHub />,
    Email: <Email />,
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const { title, subtitle, description, ctaPrimary, ctaSecondary, stats, socialLinks } = content;


  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          py: 12,
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="h4"
                  component="h2"
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  {subtitle}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    mb: 4,
                    color: 'text.secondary',
                    maxWidth: '90%',
                  }}
                >
                  {description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/resume"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {ctaPrimary}
                  </Button>
                  <Button
                    component={Link}
                    to="/contact"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {ctaSecondary}
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Button
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={iconMap[social.icon] ? React.cloneElement(iconMap[social.icon], { sx: { fontSize: '1.5rem' } }) : null}
                        sx={{
                          color: 'text.primary',
                          textTransform: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        {!isMobile && social.label}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: 6,
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      paddingTop: '125%',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: 'inherit',
                    },
                  }}
                >
                  {/* Placeholder for profile image */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    <Typography variant="h6" align="center">
                      Profile Photo
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      borderRadius: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3,
                        backgroundColor: 'background.paper',
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="div"
                      color="primary"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
