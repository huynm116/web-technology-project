let StudentModel = require("../models/Student");


exports.getAllStudents = async () => {
  return await StudentModel.find();
};

exports.createStudent = async (student) => {
  return await StudentModel.create(student);
};
exports.getStudentByID = async (id) => {
  return await StudentModel.findOne({student_id: id});
};

exports.updateStudent = async (id, student) => {
  return await StudentModel.findOneAndUpdate({student_id: id}, student);
};

exports.deleteStudent = async (id) => {
  return await StudentModel.findByIdAndDelete(id);
};
