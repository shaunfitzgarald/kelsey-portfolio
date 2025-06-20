import React from 'react';
import { Box, Typography, Container, Grid, Paper, Divider, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Download } from '@mui/icons-material';
import CaseStudy from '../components/CaseStudy';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import CircularProgress from '@mui/material/CircularProgress';

const Resume = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Move handleDownload above any usage
  const handleDownload = () => {
    // Assumes PDF is placed in public/kelsey_stephenson_resume_2025.pdf
    const link = document.createElement('a');
    link.href = process.env.PUBLIC_URL + '/kelsey_stephenson_resume_2025.pdf';
    link.download = 'kelsey_stephenson_resume_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadButton = (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Download />}
      onClick={handleDownload}
      sx={{ mb: 3 }}
    >
      Download PDF Resume
    </Button>
  );

  // Default resume data fallback
  const defaultResumeData = {
    summary: "Performance Marketing and Customer Success Leader with 10+ years of experience driving growth and delivering exceptional customer experiences. Proven track record of developing data-driven strategies that increase revenue, improve customer retention, and optimize marketing performance.",
    experience: [
      {
        id: 1,
        role: "Director of Customer Success",
        company: "AdSync Media",
        period: "May 2024 to June 2025",
        location: "Remote",
        description: "AdSync is a performance publishing company specializing in high-volume lead generation for the insurance industry, with a focus on Medicare Advantage. Promoted from Head of Customer Success to Director, I led strategic growth and retention across a diverse portfolio of insurance buyers and performance marketing partners.",
        achievements: [
          "Owned and grew strategic relationships with top insurance firms and performance marketing agencies; led account strategy, pricing conversations, and client-facing communications virtually and at industry events.",
          "Built a performance tracking system to identify optimization opportunities, guide pricing decisions, and improve RPC, driving incremental revenue growth through data-backed buyer strategy.",
          "Partnered with Ops and Tech teams to resolve campaign inefficiencies and advise on API integrations, routing, and pacing improvements that supported account scalability.",
          "Developed a tier-based segmentation model (Premium+, Premium, Optimizable, etc.) and KPI dashboards to prioritize high-impact accounts and enable targeted re-engagements.",
          "Led cross-functional alignment with Sales, Call Ops, and Media Buying (10 team members), steering growth planning, account pacing, and delivery strategy.",
          "Launched a weekly scorecard system to shift team focus from reactive support to proactive, data-driven growth."
        ]
      },
      {
        id: 2,
        role: "Head of Legal & Insurance Programs",
        company: "Palo Media Group",
        period: "Aug 2023 to May 2024",
        location: "Remote",
        description: "Palo is a performance marketing network and client acquisition platform focused on legal, insurance, and health verticals. Hired to lead demand-side growth and rebuild foundational strategy during a critical operational transition.",
        achievements: [
          "Launched and scaled high-volume verticals including Medicare, SSDI, Mass Tort, and ACA by aligning strategic buyers with vetted publishers to ensure margin stability and long-term scalability.",
          "Scaled Medicare vertical to $30K/weekly revenue by aligning publisher incentives with client volume and CPA targets.",
          "Built launch frameworks focused on CPA tracking, compliance, and sourcing strategies to support scalable program growth, client retention, and expansion.",
          "Led weekly cross-functional strategy meetings across media, affiliate, ops, and leadership teams, using data insights and buyer updates to optimize vertical growth and campaign stability.",
          "Owned strategic client relationships across law firms, insurance agencies, performance marketing networks, and lead generation companies, driving alignment between buyer goals and supply-side execution."
        ]
      },
      {
        id: 3,
        role: "Account Manager",
        company: "StudentCrowd",
        period: "Jan 2021 to June 2023",
        location: "Remote",
        description: "StudentCrowd is the UK’s leading platform for student accommodation reviews and market insights, supporting universities and PBSA providers.",
        achievements: [
          "Managed enterprise accounts in the student accommodation sector, driving £900K+ in ARR and achieving a 92% annual renewal rate.",
          "Upsold 300+ monthly ad placements while driving adoption of StudentCrowd’s SaaS insights and MarTech tools to expand platform value and client spend.",
          "Advised clients using student sentiment and performance trends to optimize campaign strategy, booking flow, and market positioning.",
          "Led webinars, review strategy sessions, and onboarding workshops to drive client education, platform engagement, and long-term success."
        ]
      },
      {
        id: 4,
        role: "Sales & Client Experience Manager",
        company: "Bridging Gaps",
        period: "Feb 2017 to Mar 2020",
        location: "Cape Town, South Africa",
        description: "Bridging Gaps is a purpose-driven education startup offering customized internships in Cape Town focused on personal and professional growth, aligned with ethical tourism initiatives.",
        achievements: [
          "Owned the full customer journey for 25+ international students annually from initial sales consultations to in-country onboarding, mentorship, and wrap-up.",
          "Designed bespoke internship placements across diverse sectors, including nonprofits, healthcare, tech, creative, and more, by aligning student goals with each host organization’s mission and needs.",
          "Maintained a 9.5/10 star rating on GoOverseas and similar platforms by delivering high-touch, personalized service throughout the experience.",
          "Drove high conversion rates through relationship-based discovery calls, customizing each journey to the intern's academic and personal development goals.",
          "Cultivated long-term partnerships with 50+ Cape Town-based organizations, serving as the operational bridge between intern success and community impact."
        ]
      },
      {
        id: 5,
        role: "Sales Associate",
        company: "African Impact",
        period: "Sep 2015 to Jan 2017",
        location: "Cape Town, South Africa",
        description: "African Impact is a social enterprise offering volunteer and educational programs across Africa, with a mission to deliver meaningful, ethical, and community-aligned experiences.",
        achievements: [
          "Led sales for the East Africa region, consulting with students and universities to match candidates with high-impact learning programs aligned to regional and participant goals.",
          "Contributed to go-to-market strategy by helping design and position volunteer programs across diverse focus areas, including healthcare, education, and conservation.",
          "Supported inbound sales growth through values-driven communication and personalized guidance across international audiences.",
          "Partnered with global marketing and operations teams to enhance program visibility, participant experience, and long-term engagement."
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
        degree: "AAS in Business Communications",
        institution: "Santa Monica College",
        year: "2020"
      }
    ],
    skills: {
      technical: [
        { name: "HubSpot", level: 95 },
        { name: "PipeDrive", level: 85 },
        { name: "Google Workspace", level: 90 },
        { name: "Google Sheets", level: 90 },
        { name: "Notion", level: 80 },
        { name: "Tableau", level: 80 },
        { name: "Canva", level: 80 },
        { name: "Task Management Tools", level: 80 }
      ],
      professional: [
        { name: "Client Success & Retention Strategy", level: 95 },
        { name: "Cross-Functional Leadership", level: 95 },
        { name: "Stakeholder Engagement", level: 90 },
        { name: "B2B Partnerships & Strategic Account Management", level: 90 },
        { name: "SaaS Adoption & Enablement", level: 85 },
        { name: "GTM Strategy", level: 85 },
        { name: "Data-Driven Growth Planning", level: 90 },
        { name: "Consultative Sales & Upselling", level: 90 }
      ]
    },
    certifications: [
      "Inbound Sales Certification, HubSpot Academy, 2021",
      "Digital Marketing Certificate, Google, 2020",
      "Critical Thinking in Business Seminar, Ndala Live, 2023",
      "Strengths Coaching & Mentorship, Clifton Strengths, 2018 - 2020"
    ]
  };

  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'site_content', 'resume'));
        if (docSnap.exists()) {
          setResumeData({ ...defaultResumeData, ...docSnap.data() });
        }
      } catch (err) {
        // fallback to defaultResumeData
      }
      setLoading(false);
    };
    fetchResume();
  }, []);

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            A summary of my professional experience, education, and skills.
          </Typography>

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
