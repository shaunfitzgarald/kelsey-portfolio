import React from 'react';
import { Box, Typography, Container, Grid, Paper, Divider, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Download } from '@mui/icons-material';
import CaseStudy from '../components/CaseStudy';

const Resume = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Sample resume data - replace with Kelsey's actual information
  const resumeData = {
    summary: "Performance Marketing and Customer Success Leader with 10+ years of experience driving growth and delivering exceptional customer experiences. Proven track record of developing data-driven strategies that increase revenue, improve customer retention, and optimize marketing performance.",
    experience: [
      {
        id: 1,
        role: "Director of Performance Marketing",
        company: "GrowthGenius",
        period: "2020 - Present",
        location: "San Francisco, CA",
        description: "Leading a team of 15+ marketing professionals to develop and execute high-impact performance marketing campaigns across multiple channels.",
        achievements: [
          "Increased ROAS by 45% through data-driven campaign optimization",
          "Reduced customer acquisition costs by 30% through advanced audience targeting",
          "Scaled monthly ad spend from $50K to $500K while maintaining efficiency"
        ]
      },
      {
        id: 2,
        role: "Senior Growth Marketing Manager",
        company: "TechScale Inc.",
        period: "2017 - 2020",
        location: "New York, NY",
        description: "Spearheaded growth initiatives and performance marketing strategies for B2B SaaS products.",
        achievements: [
          "Grew MRR by 200% in 18 months through strategic initiatives",
          "Launched successful referral program generating 30% of new business",
          "Optimized conversion funnels resulting in 2x increase in free-to-paid conversion"
        ]
      },
      {
        id: 3,
        role: "Customer Success Manager",
        company: "CloudSolutions",
        period: "2015 - 2017",
        location: "Boston, MA",
        description: "Managed portfolio of enterprise clients, ensuring successful onboarding and adoption.",
        achievements: [
          "Maintained 98% customer retention rate",
          "Increased upsell revenue by 40% through proactive account management",
          "Reduced churn by 25% through improved customer engagement strategies"
        ]
      }
    ],
    caseStudy: {
      role: "Sales & Client Experience Manager",
      company: "Bridging Gaps",
      period: "2017 - 2020",
      location: "Global (Remote)",
      summary: "As the first international hire, I was instrumental in scaling the sales and client experience functions for this global internship provider. I developed and implemented strategies that significantly improved lead conversion, client satisfaction, and operational efficiency, contributing to a 300% growth in program participants.",
      problem: "The company faced challenges in converting leads from diverse international markets and ensuring a consistent, high-quality experience for clients from inquiry to post-program engagement. Processes were manual, and there was a lack of a structured approach to sales and client management.",
      solution: "I established a structured sales pipeline using HubSpot CRM, developed targeted communication strategies for different markets, and created a comprehensive client journey map. I also implemented a feedback system to continuously improve the client experience and introduced new program offerings based on market demand.",
      results: [
        "Increased lead-to-client conversion rate by 50% within the first year.",
        "Achieved a 95% client satisfaction rate through personalized support and engagement.",
        "Contributed to a 300% growth in the number of program participants over three years.",
        "Successfully launched and managed new programs in emerging markets, expanding the company's global footprint."
      ],
      skills: ["Sales Strategy", "Client Relationship Management", "HubSpot CRM", "Cross-cultural Communication", "Process Improvement", "Program Development"]
    },
    education: [
      {
        degree: "MBA in Marketing",
        institution: "Stanford Graduate School of Business",
        year: "2015"
      },
      {
        degree: "B.S. in Business Administration",
        institution: "University of California, Berkeley",
        year: "2011"
      }
    ],
    skills: {
      technical: [
        { name: "Digital Marketing", level: 95 },
        { name: "Google Analytics", level: 90 },
        { name: "Marketing Automation", level: 85 },
        { name: "A/B Testing", level: 90 },
        { name: "CRM Management", level: 85 },
        { name: "Data Analysis", level: 80 }
      ],
      professional: [
        { name: "Team Leadership", level: 95 },
        { name: "Strategic Planning", level: 90 },
        { name: "Client Relations", level: 95 },
        { name: "Project Management", level: 85 },
        { name: "Public Speaking", level: 80 },
        { name: "Negotiation", level: 85 }
      ]
    },
    certifications: [
      "Google Ads Certification",
      "HubSpot Inbound Marketing",
      "Facebook Blueprint",
      "Salesforce Administrator"
    ]
  };

  const handleDownload = () => {
    // This would typically download the actual resume PDF
    alert("Downloading resume...");
    // In a real implementation, you would link to the actual resume file
    // window.open('/path/to/resume.pdf', '_blank');
  };

  const SkillBar = ({ name, level }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" fontWeight={500}>{name}</Typography>
        <Typography variant="body2" color="text.secondary">{level}%</Typography>
      </Box>
      <Box sx={{ width: '100%', height: 8, bgcolor: 'action.hover', borderRadius: 4, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            height: '100%',
            background: 'linear-gradient(45deg, #1976d2 0%, #9c27b0 100%)',
            borderRadius: 'inherit',
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              My Resume
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              A summary of my professional experience, education, and skills.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownload}
              sx={{
                mt: 3,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Download Resume
            </Button>
          </Box>

          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              {/* Summary */}
              <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Professional Summary
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {resumeData.summary}
                </Typography>
              </Paper>

              {/* Experience */}
              <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
                  Work Experience
                </Typography>
                
                {resumeData.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ mb: index === resumeData.experience.length - 1 ? 0 : 6 }}>
                      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          {exp.role}
                        </Typography>
                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 500, mt: isMobile ? 0.5 : 0 }}>
                          {exp.period}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1.5, fontStyle: 'italic' }}>
                        {exp.company} • {exp.location}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {exp.description}
                      </Typography>
                      <ul style={{ marginTop: 8, paddingLeft: 24 }}>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>
                            <Typography variant="body1" color="text.secondary">
                              {achievement}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                    {index < resumeData.experience.length - 1 && (
                      <Divider sx={{ my: 4, borderColor: 'divider' }} />
                    )}
                  </motion.div>
                ))}
              </Paper>
            </Grid>

            <CaseStudy caseStudy={resumeData.caseStudy} />

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              {/* Skills */}
              <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Technical Skills
                </Typography>
                {resumeData.skills.technical.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <SkillBar name={skill.name} level={skill.level} />
                  </motion.div>
                ))}
              </Paper>

              <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Professional Skills
                </Typography>
                {resumeData.skills.professional.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <SkillBar name={skill.name} level={skill.level} />
                  </motion.div>
                ))}
              </Paper>

              {/* Education */}
              <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Education
                </Typography>
                {resumeData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ mb: index === resumeData.education.length - 1 ? 0 : 3 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {edu.degree}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                        {edu.institution}
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                        {edu.year}
                      </Typography>
                    </Box>
                    {index < resumeData.education.length - 1 && (
                      <Divider sx={{ my: 3, borderColor: 'divider' }} />
                    )}
                  </motion.div>
                ))}
              </Paper>

              {/* Certifications */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Certifications
                </Typography>
                <Box>
                  {resumeData.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            mr: 2,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body1" color="text.secondary">
                          {cert}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Resume;