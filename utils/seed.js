const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { usernames, email } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Thought.deleteMany({}); // Drop existing thoughts
  await User.deleteMany({}); // Drop existing users

  const users = []; // Create empty array to hold the users

  for (let index = 0; index < usernames.length; index++) {
    
    users.push({ // pushes usernames and emails from the data.js into users array
        username: usernames[index],
        email: email[index], 
    })
    
  }

  await User.collection.insertMany(users); // inserts the users array to the User schema

  // console log the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
