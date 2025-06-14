# Kelsey Stephenson - Professional Portfolio

A modern, responsive portfolio website for Kelsey Stephenson, showcasing her professional experience, skills, and contact information. Built with React, Material-UI, and Firebase.

![Portfolio Screenshot](./public/images/portfolio-screenshot.png)

## Features

- **Responsive Design**: Looks great on all devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Contact Form**: Integrated contact form with email notifications
- **Scheduling**: Google Calendar integration for easy appointment booking
- **Resume**: Professional resume with interactive case studies
- **Dark/Light Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: React 18, Material-UI 5, Framer Motion
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **Styling**: CSS-in-JS with Material-UI's styled components
- **Form Handling**: React Hook Form with Yup validation
- **State Management**: React Context API
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for backend services)
- Google Cloud Project with Calendar API enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shaunfitzgarald/kelsey-portfolio.git
   cd kelsey-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Firebase and Google API credentials:
   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_GOOGLE_CALENDAR_API_KEY=your_google_calendar_api_key
   REACT_APP_GOOGLE_CALENDAR_ID=your_google_calendar_id
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Google Calendar Integration

To enable scheduling functionality:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API
4. Create API credentials (OAuth 2.0 Client ID)
5. Add your domain to authorized JavaScript origins
6. Set up the consent screen
7. Add the Google Calendar ID and API key to your `.env` file

## Deployment

To deploy to Firebase Hosting:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase Hosting:
   ```bash
   firebase init
   ```

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please open an issue or contact the repository maintainer.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)