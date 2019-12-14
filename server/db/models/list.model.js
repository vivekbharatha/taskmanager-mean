const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  __v: {
    type: 'number',
    select: false
  },
  title: {
    type: 'string',
    required: true,
    trim: true,
    minlength: 1
  }
});

module.exports = mongoose.model('List', ListSchema);