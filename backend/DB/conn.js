const mongoose = require("mongoose");

const DB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
      console.log(`DB connected: ${mongoose.connection.host}`.cyan.underline);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = DB;
