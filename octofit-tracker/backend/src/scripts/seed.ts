import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'alex-runner', email: 'alex@example.com', displayName: 'Alex Rivera' },
      { username: 'jordan-lifts', email: 'jordan@example.com', displayName: 'Jordan Lee' },
      { username: 'sam-cycles', email: 'sam@example.com', displayName: 'Sam Patel' },
      { username: 'taylor-yoga', email: 'taylor@example.com', displayName: 'Taylor Morgan' },
    ]);

    await Team.insertMany([
      { name: 'Summit Striders', members: [users[0]._id, users[2]._id] },
      { name: 'Pulse Crew', members: [users[1]._id, users[3]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Running', durationMinutes: 35, points: 350, recordedAt: new Date('2026-08-18T07:30:00Z') },
      { user: users[1]._id, type: 'Strength training', durationMinutes: 45, points: 420, recordedAt: new Date('2026-08-19T17:00:00Z') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 60, points: 560, recordedAt: new Date('2026-08-20T06:45:00Z') },
      { user: users[3]._id, type: 'Yoga', durationMinutes: 30, points: 240, recordedAt: new Date('2026-08-20T18:15:00Z') },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 350 },
      { user: users[1]._id, points: 420 },
      { user: users[2]._id, points: 560 },
      { user: users[3]._id, points: 240 },
    ]);

    await Workout.insertMany([
      { name: 'Morning Momentum', description: 'A brisk interval run to build endurance.', difficulty: 'Beginner', durationMinutes: 25 },
      { name: 'Full Body Foundation', description: 'A balanced strength session for every major muscle group.', difficulty: 'Intermediate', durationMinutes: 40 },
      { name: 'Recovery Flow', description: 'A gentle mobility sequence for active recovery.', difficulty: 'Beginner', durationMinutes: 20 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
