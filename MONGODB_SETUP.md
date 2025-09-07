# MongoDB Setup for Salsa Calendar

This document explains how to set up MongoDB for the Salsa Calendar application.

## Prerequisites

1. MongoDB installed locally or MongoDB Atlas account
2. Node.js and npm installed
3. Firebase project with Admin SDK enabled

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/salsa-calendar
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salsa-calendar?retryWrites=true&w=majority

# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

## Database Collections

The application uses the following MongoDB collections:

### 1. `profiles`
Stores user profile information:
```json
{
  "userId": "firebase_uid",
  "displayName": "User Name",
  "email": "user@example.com",
  "phone": "+1234567890",
  "location": "Berkeley, CA",
  "bio": "User bio text",
  "joinDate": "2024-01-01",
  "lastSignIn": "2024-01-15",
  "emailVerified": true,
  "eventsAttended": 5,
  "danceHours": 120,
  "badgesEarned": 2,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

### 2. `dashboard`
Stores dashboard-specific data:
```json
{
  "userId": "firebase_uid",
  "progressData": {
    "LA Style": { "sessions": 12, "minutes": 480 },
    "Bachata": { "sessions": 8, "minutes": 320 },
    "Salsa": { "sessions": 15, "minutes": 600 }
  },
  "thumbnails": ["/image1.jpg", "/image2.jpg"],
  "attendanceData": [
    { "date": "2024-01-01", "attended": true },
    { "date": "2024-01-08", "attended": false }
  ],
  "styleData": [
    { "style": "LA Style", "minutes": 480 },
    { "style": "Bachata", "minutes": 320 }
  ],
  "eventHistory": [
    {
      "date": "2024-01-29",
      "type": "lesson",
      "role": "both",
      "location": "Hearst Gymnasium",
      "duration": 60,
      "partner": "Sarah M.",
      "notes": "Great session"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

### 3. `eventHistory`
Stores individual event history entries:
```json
{
  "userId": "firebase_uid",
  "date": "2024-01-29",
  "type": "lesson",
  "role": "both",
  "location": "Hearst Gymnasium",
  "duration": 60,
  "partner": "Sarah M.",
  "notes": "Great session, worked on cross-body leads",
  "createdAt": "2024-01-29T00:00:00Z"
}
```

### 4. `network`
Stores network-related data:
```json
{
  "userId": "firebase_uid",
  "connections": [
    {
      "userId": "other_user_id",
      "name": "John Doe",
      "status": "connected",
      "connectedAt": "2024-01-15T00:00:00Z"
    }
  ],
  "interests": ["Salsa", "Bachata", "Social Dancing"],
  "skills": ["Beginner", "Intermediate"],
  "events": ["Event ID 1", "Event ID 2"],
  "messages": [],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

## API Endpoints

### Dashboard
- `GET /api/dashboard` - Fetch dashboard data
- `POST /api/dashboard` - Update dashboard data

### Profile
- `GET /api/profile` - Fetch profile data
- `PUT /api/profile` - Update profile data

### Events
- `GET /api/events/history` - Fetch event history
- `POST /api/events/history` - Add event history entry

### Network
- `GET /api/network` - Fetch network data
- `POST /api/network` - Update network data

## Authentication

All API endpoints require Firebase authentication. Include the Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase_id_token>
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see above)

3. Start MongoDB locally or configure MongoDB Atlas

4. Run the development server:
   ```bash
   npm run dev
   ```

## Testing the Integration

1. Sign in to the application
2. Navigate to Dashboard, Profile, Network, or Events pages
3. Check the browser console for API calls
4. Verify data is being fetched from MongoDB (or empty responses if no data exists)

## Notes

- The application gracefully handles empty data responses
- All API calls include proper error handling
- Data is automatically created when users first access features
- Firebase Admin SDK is used for server-side token verification
