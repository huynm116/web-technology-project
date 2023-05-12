const studentService = require("../services/StudentService");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.json({ data: students, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.json({ data: student, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentByID = async (req, res) => {
  try {
    const student = await studentService.getStudentByID(req.params.id);
    res.json({ data: student, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.json({ data: student, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);
    res.json({ data: student, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



