const cors = require('cors');
require('dotenv').config()

const ORIGINS = [process.env.ALLOW_ORIGINS, process.env.ALLOW_ORIGINS_MOBILE]


module.exports = cors({
  credentials: true,
  origin: function (origin, callback) {
    if (ORIGINS.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})