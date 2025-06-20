// Script to upload defaultResumeData from Resume.js to Firestore 'site_content/resume'
// Usage: node scripts/uploadResumeToFirestore.js

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Extract defaultResumeData from Resume.js
const resumeJsPath = path.resolve(__dirname, '../src/pages/Resume.js');
const resumeJs = fs.readFileSync(resumeJsPath, 'utf8');

// Extract the defaultResumeData object using a regex
const match = resumeJs.match(/const defaultResumeData = ({[\s\S]*?};)/);
if (!match) {
  console.error('Could not find defaultResumeData in Resume.js');
  process.exit(1);
}

let defaultResumeData;
try {
  // Use eval in a safe context (not recommended for untrusted code)
  // This will only work if the object is valid JS (not JSON)
  // For safety, you can manually copy-paste the object if needed
  // eslint-disable-next-line no-eval
  defaultResumeData = eval('(' + match[1].replace(/;$/, '') + ')');
} catch (e) {
  console.error('Error parsing defaultResumeData:', e);
  process.exit(1);
}

async function upload() {
  try {
    await setDoc(doc(db, 'site_content', 'resume'), defaultResumeData);
    console.log('Resume data uploaded to Firestore!');
  } catch (err) {
    console.error('Error uploading to Firestore:', err);
  }
}

upload();
