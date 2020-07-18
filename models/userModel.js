const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  password: { type: String, requiredPaths: true, minlength: 6 },
});
Mongoose.model("User", userSchema);