import React, { useState, useEffect } from 'react';
import { useScrollTrigger, Slide, AppBar, Toolbar, Box, Button, IconButton, useMediaQuery, useTheme, Container, Link as MuiLink, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Resume', path: '/resume' },
  { name: 'Contact', path: '/contact' },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <HideOnScroll>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(3px)',
          transition: 'all 0.3s ease-in-out',
          color: 'text.primary',
          boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Container maxWidth="lg">
          {isMobile && (
            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              keepMounted
              PaperProps={{
                sx: { mt: 1, minWidth: 160 }
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  selected={location.pathname === item.path}
                  onClick={handleMenuClose}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          )}
          <Toolbar disableGutters sx={{ minHeight: 80, justifyContent: 'space-between' }}>
            <MuiLink
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'inherit',
                }}
              >
                Kelsey Sinclaire Stephenson
              </Box>
            </MuiLink>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={handleMenuOpen}
                sx={{
                  display: { md: 'none' },
                  color: '#222', // Always dark for visibility
                }}
              >
                <MenuIcon sx={{ color: '#222' }} />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      position: 'relative',
                      textTransform: 'none',
                      fontSize: '1rem',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: location.pathname === item.path ? '100%' : 0,
                        height: '2px',
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover': {
                        color: 'primary.light',
                        backgroundColor: 'transparent',
                      },
                      '&:hover:after': {
                        width: '100%',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
