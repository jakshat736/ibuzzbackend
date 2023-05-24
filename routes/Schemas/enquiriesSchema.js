const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enquiriesSchema = new Schema({
  service: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  }
});

const Enquiries = mongoose.model('Enquiries', enquiriesSchema);

module.exports = Enquiries;
