import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7F9D8F', // Softer sage green
      light: '#B0C4B8',
      dark: '#5F7A6B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D4B9B0', // Muted terracotta
      light: '#E8D8D0',
      dark: '#B38B7E',
      contrastText: '#4A3F3A',
    },
    background: {
      default: '#FAF9F7', // Warmer off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4A3F3A', // Soft taupe
      secondary: '#7A6D66',
      disabled: '#B8B0AB',
    },
    accent: {
      main: '#B8D4D5', // Muted seafoam
      light: '#E0ECED',
      dark: '#8FB3B4',
    },
    success: {
      main: '#A5C9A8', // Soft green
      light: '#D8EDDA',
      dark: '#7AA87D',
    },
    warning: {
      main: '#E6C9A3', // Soft amber
      light: '#F5E6D1',
      dark: '#D4A96A',
    },
    error: {
      main: '#E0A8A8', // Soft red
      light: '#F5E1E1',
      dark: '#CB7D7D',
    },
    info: {
      main: '#A8C0E0', // Soft blue
      light: '#E1E9F5',
      dark: '#7D9BCB',
    },
    divider: 'rgba(0, 0, 0, 0.05)',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(74, 63, 58, 0.05)',
    '0px 4px 12px rgba(74, 63, 58, 0.08)',
    '0px 6px 16px rgba(74, 63, 58, 0.1)',
    ...Array(21).fill('0px 8px 24px rgba(74, 63, 58, 0.12)'),
  ],
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    subtitle1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          color: themeParam.palette.text.primary,
          backgroundColor: themeParam.palette.background.default,
          '&::-webkit-scrollbar': {
            width: '0.6rem',
          },
          '&::-webkit-scrollbar-track': {
            background: themeParam.palette.background.default,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: themeParam.palette.primary.light,
            borderRadius: '1rem',
            border: `3px solid ${themeParam.palette.background.default}`,
          },
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 28px',
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.5px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(74, 63, 58, 0.05)',
          transition: 'all 0.3s ease-in-out',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px 0 rgba(74, 63, 58, 0.1)',
            borderColor: 'transparent',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: (themeParam) => ({
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: themeParam.palette.primary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: themeParam.palette.primary.main,
              borderWidth: '1px',
            },
          },
        },
      }),
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(74, 63, 58, 0.05)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
      },
    },
    MuiLink: {
      styleOverrides: (themeParam) => ({
        root: {
          fontWeight: 500,
          textDecoration: 'none',
          color: themeParam.palette.primary.dark,
          '&:hover': {
            textDecoration: 'underline',
            textDecorationThickness: '1.5px',
            textUnderlineOffset: '2px',
          },
        },
      }),
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;