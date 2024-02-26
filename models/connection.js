const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString, { connectTimeOutMs: 2000 })
  .then(() => console.log("database connected"))
  .catch((error) => console.error(error));
