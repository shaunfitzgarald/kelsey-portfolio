import React from 'react';
import { Box, Typography, Paper, Grid, Chip, useTheme, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const CaseStudy = ({ caseStudy }) => {
  const theme = useTheme();

  if (!caseStudy) {
    return null;
  }

  const { role, company, period, location, summary, problem, solution, results, skills } = caseStudy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          mt: 6,
          borderRadius: 3,
          backgroundColor: theme.palette.background.default,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}
        >
          Case Study: {company}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{role}</Typography>
              <Typography variant="subtitle1" color="text.secondary">{company}</Typography>
              <Typography variant="body2" color="text.secondary">{period} | {location}</Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Skills & Technologies</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills && skills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" color="primary" size="small" />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Executive Summary</Typography>
              <Typography variant="body1" paragraph color="text.secondary">{summary}</Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 1 }}>The Challenge</Typography>
              <Typography variant="body1" paragraph color="text.secondary">{problem}</Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 1 }}>The Solution</Typography>
              <Typography variant="body1" paragraph color="text.secondary">{solution}</Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 1 }}>Key Results</Typography>
              <Box component="ul" sx={{ pl: 2.5, color: 'text.secondary' }}>
                {results && results.map((result, index) => (
                  <li key={index}><Typography variant="body1">{result}</Typography></li>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default CaseStudy;
