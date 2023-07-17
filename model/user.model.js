const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", user_schema);

module.exports = { User };
