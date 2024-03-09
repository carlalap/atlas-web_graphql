// task6.  Creating a TAsk model

const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String,
});

module.exports = mongoose.model('Project', ProjectSchema);
