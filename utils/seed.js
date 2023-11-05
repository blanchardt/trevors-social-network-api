const connection = require('../config/connection');
const { User } = require('../models');
const { getUserName, getEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    //Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }


  //Create empty array to hold the new users
  const users = [];

  //Create the first 10 users and add them in the users array
  for (let i = 0; i < 10; i++) {

    const userName = getUserName(i);
    const email = getEmail(i);

    users.push({
      userName,
      email,
    });
  }

  //Add users to the collection and await the results
  await User.collection.insertMany(users);

  //Display the data that should appear in the database.
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
