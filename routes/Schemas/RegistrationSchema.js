const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12
  },
  email: {
    type: String,
    required: true
  }
});

const Registrations = mongoose.model('Registrations', registrationSchema);

module.exports = Registrations;
