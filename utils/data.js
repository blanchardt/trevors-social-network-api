const names = [
  'lernantino',
  'firemonkey',
  'parker',
  'amiko',
  'agron',
  'zed',
  'alpha',
  'grey92',
  'aceFire',
  'lullaby',
];

const emails = [
  'lernantino@gmail.com',
  'firemonkey@gmail.com',
  'parker@gmail.com',
  'amiko@gmail.com',
  'agron@gmail.com',
  'zed@gmail.com',
  'alpha@gmail.com',
  'grey92@gmail.com',
  'acefire@gmail.com',
  'lullaby@gmail.com',
];

//Gets a user name from the list.
const getUserName = (int) =>
  `${names[int]}`;

//Gets an email from the list
const getEmail = (int) =>
`${emails[int]}`;

// Export the functions for use in seed.js
module.exports = { getUserName, getEmail };
