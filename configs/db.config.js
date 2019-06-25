const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/808-app';

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => console.info(`Connected to the database: ${MONGODB_URI}`))
  .catch(error => console.error(`Error trying to connect to the database ${MONGODB_URI}`, error));