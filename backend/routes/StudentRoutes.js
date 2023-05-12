const express = require("express");
const {
  createStudent,
  getAllStudents,
  getStudentByID,
  updateStudent,
  deleteStudent
} = require("../controllers/StudentController");

const router = express.Router();

router.route("/").get(getAllStudents).post(createStudent);
router.route("/:id").get(getStudentByID).put(updateStudent).delete(deleteStudent);

module.exports = router;
