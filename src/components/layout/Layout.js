import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;