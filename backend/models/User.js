import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcryptjs";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member",
  },
});


// HASH PASSWORD
UserSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    return next();
  }

  const salt = await genSalt(10);

  this.password = await hash(this.password, salt);

  next();
});


// MATCH PASSWORD
UserSchema.methods.matchPassword = async function (enteredPassword) {

  return await compare(
    enteredPassword,
    this.password
  );
};

export default model("User", UserSchema);