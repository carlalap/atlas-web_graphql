// task6.  Creating a TAsk model
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String,
});

module.exports = mongoose.model('Task', TaskSchema);
