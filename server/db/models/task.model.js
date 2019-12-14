const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  __v: {
    type: 'number',
    select: false
  },
  title: {
    type: 'string',
    required: true,
    trim: true,
    minlength: 1
  },
  listId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Task', TaskSchema);