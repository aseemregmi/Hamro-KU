const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  lattitude: {
    type: String
  },
  longitude: {
    type: String
  }
});

const Department = mongoose.model('Department', DepartmentSchema);

module.exports = {
  Department
};
