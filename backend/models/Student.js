const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  id: {type: Number},
  student_id: {type: String},
  name: {type: String},
  department: {type: String},
  course: {type: String},
  gender: {type: String},
  contact: {type: String},
  email: {type: String},
  address: {type: String},
  emergency_name: {type: String},
  emergency_contact: {type: String},
  emergency_address: {type: String},
  emergency_relation: {type: String},
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, {
  collection: "student_list"
});

module.exports = mongoose.model("Student", studentSchema);
