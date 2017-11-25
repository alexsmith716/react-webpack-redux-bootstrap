import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config.json';
import '../models/User';

const User = mongoose.model('User');

const mongooseOptions = {
  useMongoClient: true,
  autoReconnect: true,
  keepAlive: 1,
  connectTimeoutMS: 300000
};

export function setUpConnection() {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URL, mongooseOptions, error => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!');
      throw error;
    }
  })
}

export function addUser(data) {
  const user = new User({
    login: data.login,
    email: data.email,
    password: bcrypt.hashSync(data.password, 10),
    timezone: data.timezone
  });
  return user.save();
}
