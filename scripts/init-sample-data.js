// Sample data initialization script for MongoDB
// Run with: node scripts/init-sample-data.js

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/salsa-calendar';

async function initSampleData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('salsa-calendar');
    
    // Sample user ID (replace with actual Firebase UID)
    const sampleUserId = 'sample_user_123';
    
    // Initialize profile data
    await db.collection('profiles').updateOne(
      { userId: sampleUserId },
      {
        $set: {
          userId: sampleUserId,
          displayName: 'Sample User',
          email: 'sample@berkeley.edu',
          phone: '+1 (555) 123-4567',
          location: 'Berkeley, CA',
          bio: 'Passionate salsa dancer and UC Berkeley student. Love connecting with the dance community!',
          joinDate: 'September 2023',
          lastSignIn: 'Today',
          emailVerified: true,
          eventsAttended: 8,
          danceHours: 480,
          badgesEarned: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    console.log('Profile data initialized');
    
    // Initialize dashboard data
    await db.collection('dashboard').updateOne(
      { userId: sampleUserId },
      {
        $set: {
          userId: sampleUserId,
          progressData: {
            'LA Style': { sessions: 12, minutes: 480 },
            'Bachata': { sessions: 8, minutes: 320 },
            'Salsa': { sessions: 15, minutes: 600 }
          },
          thumbnails: [
            '/dance_classes.png',
            '/image.png',
            '/Team.png'
          ],
          attendanceData: [
            { date: '2024-01-01', attended: true },
            { date: '2024-01-08', attended: true },
            { date: '2024-01-15', attended: false },
            { date: '2024-01-22', attended: true },
            { date: '2024-01-29', attended: true }
          ],
          styleData: [
            { style: 'LA Style', minutes: 480 },
            { style: 'Bachata', minutes: 320 },
            { style: 'Salsa', minutes: 200 }
          ],
          eventHistory: [
            {
              date: '2024-01-29',
              type: 'lesson',
              role: 'both',
              location: 'Hearst Gymnasium',
              duration: 60,
              partner: 'Sarah M.',
              notes: 'Great session, worked on cross-body leads'
            },
            {
              date: '2024-01-27',
              type: 'social',
              role: 'both',
              location: 'Sproul Plaza',
              duration: 120,
              partner: 'Alex K.',
              notes: 'Fun social dancing with the community'
            },
            {
              date: '2024-01-25',
              type: 'performance',
              role: 'lead',
              location: 'Zellerbach Hall',
              duration: 45,
              partner: 'Maria L.',
              notes: 'Performance team practice'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    console.log('Dashboard data initialized');
    
    // Initialize event history
    const eventHistoryEntries = [
      {
        userId: sampleUserId,
        date: '2024-01-22',
        type: 'lesson',
        role: 'lead',
        location: 'Hearst Gym',
        duration: 60,
        partner: 'Jane D.',
        notes: 'Focused on basic steps',
        createdAt: new Date('2024-01-22')
      },
      {
        userId: sampleUserId,
        date: '2024-01-15',
        type: 'social',
        role: 'follow',
        location: 'Greek Theatre',
        duration: 90,
        partner: 'Mike S.',
        notes: 'Great social dancing',
        createdAt: new Date('2024-01-15')
      },
      {
        userId: sampleUserId,
        date: '2024-01-08',
        type: 'lesson',
        role: 'lead',
        location: 'Hearst Gym',
        duration: 60,
        partner: 'Lisa R.',
        notes: 'Worked on turns',
        createdAt: new Date('2024-01-08')
      }
    ];
    
    await db.collection('eventHistory').insertMany(eventHistoryEntries);
    console.log('Event history data initialized');
    
    // Initialize network data
    await db.collection('network').updateOne(
      { userId: sampleUserId },
      {
        $set: {
          userId: sampleUserId,
          connections: [
            {
              userId: 'other_user_1',
              name: 'John Doe',
              status: 'connected',
              connectedAt: new Date('2024-01-15')
            },
            {
              userId: 'other_user_2',
              name: 'Jane Smith',
              status: 'pending',
              connectedAt: new Date('2024-01-20')
            }
          ],
          interests: ['Salsa', 'Bachata', 'Social Dancing', 'Performance'],
          skills: ['Beginner', 'Intermediate'],
          events: ['event_1', 'event_2'],
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    console.log('Network data initialized');
    
    console.log('Sample data initialization completed successfully!');
    
  } catch (error) {
    console.error('Error initializing sample data:', error);
  } finally {
    await client.close();
  }
}

// Run the initialization
initSampleData();
