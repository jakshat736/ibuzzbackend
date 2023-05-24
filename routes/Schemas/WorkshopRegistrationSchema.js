const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workshopRegistrationSchema = new Schema({
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

const WorkshopRegistration = mongoose.model('WorkshopRegistrations', workshopRegistrationSchema);

module.exports = WorkshopRegistration;
