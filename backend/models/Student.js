const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  id: Number,
  student_id: String,
  firstname: String,
  middlename: String,
  lastname: String,
  department: String,
  course: String,
  gender: String,
  contact: String,
  email: String,
  address: String,
  emergency_name: String,
  emergency_contact: String,
  emergency_address: String,
  emergency_relation: String,
  status: String,
  delete_flag: String,
  date_created: Date,
  date_updated: Date
});

module.exports = mongoose.model("Student", studentSchema);
