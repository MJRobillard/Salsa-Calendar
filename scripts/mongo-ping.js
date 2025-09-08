// Simple connectivity check using MONGODB_URI from environment
// Usage: node scripts/mongo-ping.js

/* eslint-disable no-console */
const { MongoClient, ServerApiVersion } = require('mongodb');

// Try to load .env.local if dotenv is available
try {
  const dotenv = require('dotenv');
  dotenv.config({ path: '.env.local' });
} catch (_) {}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set. Create a .env.local with MONGODB_URI');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (err) {
    console.error('MongoDB ping failed:', err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();


