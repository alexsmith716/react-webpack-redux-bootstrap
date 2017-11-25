import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
