import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, TextField, Button, Paper, Divider, Alert, Tabs, Tab, Select, MenuItem } from '@mui/material';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const HOME_DOC_ID = 'home';
const RESUME_DOC_ID = 'resume';
const CONTACT_DOC_ID = 'contact';

const socialIconOptions = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'github', label: 'GitHub' },
  { value: 'website', label: 'Website' },
  { value: 'email', label: 'Email' },
];

const Admin = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState(0);

  // Editable content state
  const [homeContent, setHomeContent] = useState({
    title: '', subtitle: '', description: '', ctaPrimary: '', ctaSecondary: '',
    stats: [{ value: '', label: '' }], socialLinks: [{ icon: '', url: '' }]
  });
  const [resumeContent, setResumeContent] = useState({
    summary: '', experience: [], caseStudy: { role: '', company: '', summary: '', problem: '', solution: '', results: [], skills: [] }, education: [], skills: { technical: [], professional: [] }, certifications: []
  });
  const [contactContent, setContactContent] = useState({
    email: '', phone: '', location: '', mapEmbedUrl: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setError('');
      setSuccess(false);
      if (u) fetchAllContent();
    });
    return unsubscribe;
  }, []);

  const fetchAllContent = async () => {
    setLoading(true);
    try {
      const homeSnap = await getDoc(doc(db, 'site_content', HOME_DOC_ID));
      if (homeSnap.exists()) setHomeContent(homeSnap.data());
      const resumeSnap = await getDoc(doc(db, 'site_content', RESUME_DOC_ID));
      if (resumeSnap.exists()) setResumeContent(resumeSnap.data());
      const contactSnap = await getDoc(doc(db, 'site_content', CONTACT_DOC_ID));
      if (contactSnap.exists()) setContactContent(contactSnap.data());
    } catch (err) {
      setError('Failed to fetch content.');
    }
    setLoading(false);
  };

  const handleTabChange = (e, newValue) => setTab(newValue);

  // Handlers for each section
  const handleHomeChange = (e) => {
    setHomeContent({ ...homeContent, [e.target.name]: e.target.value });
  };
  const handleResumeChange = (e) => {
    setResumeContent({ ...resumeContent, [e.target.name]: e.target.value });
  };
  const handleContactChange = (e) => {
    setContactContent({ ...contactContent, [e.target.name]: e.target.value });
  };

  // Save handlers
  const saveHome = async () => {
    setLoading(true); setError(''); setSuccess(false);
    try { await setDoc(doc(db, 'site_content', HOME_DOC_ID), homeContent); setSuccess(true); } catch (err) { setError('Failed to save Home content.'); }
    setLoading(false);
  };
  const saveResume = async () => {
    setLoading(true); setError(''); setSuccess(false);
    try { await setDoc(doc(db, 'site_content', RESUME_DOC_ID), resumeContent); setSuccess(true); } catch (err) { setError('Failed to save Resume content.'); }
    setLoading(false);
  };
  const saveContact = async () => {
    setLoading(true); setError(''); setSuccess(false);
    try { await setDoc(doc(db, 'site_content', CONTACT_DOC_ID), contactContent); setSuccess(true); } catch (err) { setError('Failed to save Contact content.'); }
    setLoading(false);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Login failed.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };


  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" mb={2}>Admin Login</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Admin Dashboard</Typography>
          <Button onClick={handleLogout} color="secondary">Logout</Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Home" />
          <Tab label="Resume" />
          <Tab label="Contact" />
        </Tabs>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Content saved!</Alert>}
        {/* Home Tab */}
        {tab === 0 && (
          <Box component="form" noValidate autoComplete="off">
            <TextField label="Title" name="title" value={homeContent.title} onChange={handleHomeChange} fullWidth sx={{ mb: 2 }} />
            <TextField label="Subtitle" name="subtitle" value={homeContent.subtitle} onChange={handleHomeChange} fullWidth sx={{ mb: 2 }} />
            <TextField label="Description" name="description" value={homeContent.description} onChange={handleHomeChange} fullWidth multiline minRows={2} sx={{ mb: 2 }} />
            <TextField label="Primary CTA" name="ctaPrimary" value={homeContent.ctaPrimary} onChange={handleHomeChange} fullWidth sx={{ mb: 2 }} />
            <TextField label="Secondary CTA" name="ctaSecondary" value={homeContent.ctaSecondary} onChange={handleHomeChange} fullWidth sx={{ mb: 2 }} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Stats</Typography>
            {homeContent.stats.map((stat, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField label="Value" value={stat.value} onChange={e => {
                  const stats = [...homeContent.stats];
                  stats[idx].value = e.target.value;
                  setHomeContent({ ...homeContent, stats });
                }} sx={{ flex: 1 }} />
                <TextField label="Label" value={stat.label} onChange={e => {
                  const stats = [...homeContent.stats];
                  stats[idx].label = e.target.value;
                  setHomeContent({ ...homeContent, stats });
                }} sx={{ flex: 2 }} />
                <Button onClick={() => {
                  const stats = homeContent.stats.filter((_, i) => i !== idx);
                  setHomeContent({ ...homeContent, stats });
                }} color="error">Remove</Button>
              </Box>
            ))}
            <Button onClick={() => setHomeContent({ ...homeContent, stats: [...homeContent.stats, { value: '', label: '' }] })} sx={{ mb: 2 }}>Add Stat</Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Social Links</Typography>
            {homeContent.socialLinks.map((link, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Select
                  value={link.icon}
                  onChange={e => {
                    const socialLinks = [...homeContent.socialLinks];
                    socialLinks[idx].icon = e.target.value;
                    setHomeContent({ ...homeContent, socialLinks });
                  }}
                  displayEmpty
                  sx={{ flex: 1 }}
                >
                  <MenuItem value=""><em>Select Icon</em></MenuItem>
                  {socialIconOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
                <TextField label="URL" value={link.url} onChange={e => {
                  const socialLinks = [...homeContent.socialLinks];
                  socialLinks[idx].url = e.target.value;
                  setHomeContent({ ...homeContent, socialLinks });
                }} sx={{ flex: 3 }} />
                <Button onClick={() => {
                  const socialLinks = homeContent.socialLinks.filter((_, i) => i !== idx);
                  setHomeContent({ ...homeContent, socialLinks });
                }} color="error">Remove</Button>
              </Box>
            ))}
            <Button onClick={() => setHomeContent({ ...homeContent, socialLinks: [...homeContent.socialLinks, { icon: '', url: '' }] })} sx={{ mb: 2 }}>Add Social Link</Button>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="primary" onClick={saveHome} disabled={loading}>{loading ? 'Saving...' : 'Save Home'}</Button>
          </Box>
        )}
        {/* Resume Tab */}
        {tab === 1 && (
          <Box component="form" noValidate autoComplete="off">
            <TextField label="Summary" name="summary" value={resumeContent.summary} onChange={handleResumeChange} fullWidth multiline minRows={3} helperText="You can use markdown for formatting (e.g. *italics*, **bold**, bullet lists)" sx={{ mb: 2 }} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Experience</Typography>
            {resumeContent.experience.map((exp, idx) => (
              <Box key={idx} sx={{ mb: 2, border: '1px solid #eee', p: 2, borderRadius: 2 }}>
                <TextField label="Job Title" value={exp.role} onChange={e => {
                  const experience = [...resumeContent.experience];
                  experience[idx].role = e.target.value;
                  setResumeContent({ ...resumeContent, experience });
                }} sx={{ mr: 1 }} />
                <TextField label="Company" value={exp.company} onChange={e => {
                  const experience = [...resumeContent.experience];
                  experience[idx].company = e.target.value;
                  setResumeContent({ ...resumeContent, experience });
                }} sx={{ mr: 1 }} />
                <TextField label="Location" value={exp.location} onChange={e => {
                  const experience = [...resumeContent.experience];
                  experience[idx].location = e.target.value;
                  setResumeContent({ ...resumeContent, experience });
                }} sx={{ mr: 1 }} />
                <TextField label="Period (e.g. 2020 - Present)" value={exp.period} onChange={e => {
                  const experience = [...resumeContent.experience];
                  experience[idx].period = e.target.value;
                  setResumeContent({ ...resumeContent, experience });
                }} sx={{ mr: 1 }} />
                <TextField label="Description" value={exp.description} onChange={e => {
                  const experience = [...resumeContent.experience];
                  experience[idx].description = e.target.value;
                  setResumeContent({ ...resumeContent, experience });
                }} fullWidth multiline minRows={3} helperText="You can use markdown for formatting (e.g. *italics*, **bold**, bullet lists)" sx={{ mt: 1, mb: 1 }} />
                {/* Achievements array */}
                <Typography variant="body2">Achievements</Typography>
                {exp.achievements && exp.achievements.map((ach, aIdx) => (
                  <Box key={aIdx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField value={ach} onChange={e => {
                      const experience = [...resumeContent.experience];
                      experience[idx].achievements[aIdx] = e.target.value;
                      setResumeContent({ ...resumeContent, experience });
                    }} sx={{ flex: 1 }} />
                    <Button onClick={() => {
                      const experience = [...resumeContent.experience];
                      experience[idx].achievements.splice(aIdx, 1);
                      setResumeContent({ ...resumeContent, experience });
                    }} color="error">Remove</Button>
                  </Box>
                ))}
                <Button onClick={() => {
                  const experience = [...resumeContent.experience];
                  if (!experience[idx].achievements) experience[idx].achievements = [];
                  experience[idx].achievements.push('');
                  setResumeContent({ ...resumeContent, experience });
                }}>Add Achievement</Button>
                <Button onClick={() => {
                  const experience = resumeContent.experience.filter((_, i) => i !== idx);
                  setResumeContent({ ...resumeContent, experience });
                }} color="error" sx={{ ml: 2 }}>Remove Experience</Button>
              </Box>
            ))}
            <Button onClick={() => setResumeContent({ ...resumeContent, experience: [...resumeContent.experience, { role: '', company: '', period: '', location: '', description: '', achievements: [] }] })} sx={{ mb: 2 }}>Add Experience</Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Education</Typography>
            {resumeContent.education.map((edu, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField label="Degree" value={edu.degree} onChange={e => {
                  const education = [...resumeContent.education];
                  education[idx].degree = e.target.value;
                  setResumeContent({ ...resumeContent, education });
                }} sx={{ flex: 2 }} />
                <TextField label="Institution" value={edu.institution} onChange={e => {
                  const education = [...resumeContent.education];
                  education[idx].institution = e.target.value;
                  setResumeContent({ ...resumeContent, education });
                }} sx={{ flex: 3 }} />
                <TextField label="Year" value={edu.year} onChange={e => {
                  const education = [...resumeContent.education];
                  education[idx].year = e.target.value;
                  setResumeContent({ ...resumeContent, education });
                }} sx={{ flex: 1 }} />
                <Button onClick={() => {
                  const education = resumeContent.education.filter((_, i) => i !== idx);
                  setResumeContent({ ...resumeContent, education });
                }} color="error">Remove</Button>
              </Box>
            ))}
            <Button onClick={() => setResumeContent({ ...resumeContent, education: [...resumeContent.education, { degree: '', institution: '', year: '' }] })} sx={{ mb: 2 }}>Add Education</Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Skills</Typography>
            <Typography variant="body2">Technical Skills</Typography>
            {resumeContent.skills.technical.map((sk, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField label="Name" value={sk.name} onChange={e => {
                  const skills = { ...resumeContent.skills };
                  skills.technical[idx].name = e.target.value;
                  setResumeContent({ ...resumeContent, skills });
                }} sx={{ flex: 2 }} />
                <TextField label="Level (%)" value={sk.level} onChange={e => {
                  const skills = { ...resumeContent.skills };
                  skills.technical[idx].level = e.target.value;
                  setResumeContent({ ...resumeContent, skills });
                }} sx={{ flex: 1 }} />
                <Button onClick={() => {
                  const skills = { ...resumeContent.skills };
                  skills.technical = skills.technical.filter((_, i) => i !== idx);
                  setResumeContent({ ...resumeContent, skills });
                }} color="error">Remove</Button>
              </Box>
            ))}
            <Button onClick={() => setResumeContent({ ...resumeContent, skills: { ...resumeContent.skills, technical: [...(resumeContent.skills.technical || []), { name: '', level: '' }] } })}>Add Technical Skill</Button>
            <Typography variant="body2" sx={{ mt: 2 }}>Professional Skills</Typography>
            {resumeContent.skills.professional.map((sk, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField label="Name" value={sk.name} onChange={e => {
                  const skills = { ...resumeContent.skills };
                  skills.professional[idx].name = e.target.value;
                  setResumeContent({ ...resumeContent, skills });
                }} sx={{ flex: 2 }} />
                <TextField label="Level (%)" value={sk.level} onChange={e => {
                  const skills = { ...resumeContent.skills };
                  skills.professional[idx].level = e.target.value;
                  setResumeContent({ ...resumeContent, skills });
                }} sx={{ flex: 1 }} />
                <Button onClick={() => {
                  const skills = { ...resumeContent.skills };
                  skills.professional = skills.professional.filter((_, i) => i !== idx);
                  setResumeContent({ ...resumeContent, skills });
                }} color="error">Remove</Button>
              </Box>
            ))}
            <Button onClick={() => setResumeContent({ ...resumeContent, skills: { ...resumeContent.skills, professional: [...(resumeContent.skills.professional || []), { name: '', level: '' }] } })}>Add Professional Skill</Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Certifications</Typography>
            {resumeContent.certifications.map((cert, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField label="Certification" value={cert} onChange={e => {
                  const certifications = [...resumeContent.certifications];
                  certifications[idx] = e.target.value;
                  setResumeContent({ ...resumeContent, certifications });
                }} sx={{ flex: 3 }} />
                <Button onClick={() => {
                  const certifications = resumeContent.certifications.filter((_, i) => i !== idx);
                  setResumeContent({ ...resumeContent, certifications });
                }} color="error">Remove</Button>
              </Box>
            ))}
            <Button onClick={() => setResumeContent({ ...resumeContent, certifications: [...resumeContent.certifications, ''] })} sx={{ mb: 2 }}>Add Certification</Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Case Study</Typography>
            <TextField label="Role" value={resumeContent.caseStudy.role} onChange={e => setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, role: e.target.value } })} sx={{ mb: 1 }} />
            <TextField label="Company" value={resumeContent.caseStudy.company} onChange={e => setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, company: e.target.value } })} sx={{ mb: 1 }} />
            <TextField label="Summary" value={resumeContent.caseStudy.summary} onChange={e => setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, summary: e.target.value } })} sx={{ mb: 1 }} />
            <TextField label="Problem" value={resumeContent.caseStudy.problem} onChange={e => setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, problem: e.target.value } })} sx={{ mb: 1 }} />
            <TextField label="Solution" value={resumeContent.caseStudy.solution} onChange={e => setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, solution: e.target.value } })} sx={{ mb: 1 }} />
            <Typography variant="body2">Results</Typography>
            {resumeContent.caseStudy.results.map((res, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField value={res} onChange={e => {
                  const results = [...resumeContent.caseStudy.results];
                  results[idx] = e.target.value;
                  setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, results } });
                }} sx={{ flex: 3 }} />
                <Button onClick={() => {
                  const results = resumeContent.caseStudy.results.filter((_, i) => i !== idx);
                  setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, results } });
                }} color="error">Remove</Button>
              </Box>
            ))}
            <Button onClick={() => setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, results: [...(resumeContent.caseStudy.results || []), ''] } })}>Add Result</Button>
            <Typography variant="body2" sx={{ mt: 2 }}>Skills</Typography>
            {resumeContent.caseStudy.skills.map((sk, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField value={sk} onChange={e => {
                  const skills = [...resumeContent.caseStudy.skills];
                  skills[idx] = e.target.value;
                  setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, skills } });
                }} sx={{ flex: 3 }} />
                <Button onClick={() => {
                  const skills = resumeContent.caseStudy.skills.filter((_, i) => i !== idx);
                  setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, skills } });
                }} color="error">Remove</Button>
              </Box>
            ))}
            <Button onClick={() => setResumeContent({ ...resumeContent, caseStudy: { ...resumeContent.caseStudy, skills: [...(resumeContent.caseStudy.skills || []), ''] } })}>Add Case Study Skill</Button>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="primary" onClick={saveResume} disabled={loading}>{loading ? 'Saving...' : 'Save Resume'}</Button>
          </Box>
        )}
        {/* Contact Tab */}
        {tab === 2 && (
          <Box component="form" noValidate autoComplete="off">
            <TextField label="Email" name="email" value={contactContent.email} onChange={handleContactChange} fullWidth sx={{ mb: 2 }} />
            <TextField label="Phone" name="phone" value={contactContent.phone} onChange={handleContactChange} fullWidth sx={{ mb: 2 }} />
            <TextField label="Location" name="location" value={contactContent.location} onChange={handleContactChange} fullWidth sx={{ mb: 2 }} />
            <TextField label="Google Map Embed URL" name="mapEmbedUrl" value={contactContent.mapEmbedUrl} onChange={handleContactChange} fullWidth sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={saveContact} disabled={loading}>{loading ? 'Saving...' : 'Save Contact'}</Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Admin;
