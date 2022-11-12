
const { start } = require('./server');
// const { db } = require('./modules/index');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
start(PORT);
// db.sync().then(() => {
//   console.log('Database is connected');

// });
// { force: true }

