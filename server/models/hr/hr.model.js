const mongoose = require('mongoose');

const HrdetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Hrdetails = mongoose.model('Hrdetails', HrdetailsSchema);

module.exports = Hrdetails;
