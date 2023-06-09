const express = require("express");
const {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomByDormId,
  addStudentToRoom,
  removeStudentFromRoom
} = require("../controllers/RoomController");

const router = express.Router();

router.route("/").get(getAllRooms).post(createRoom);
router.route("/:id").get(getRoomById).put(updateRoom).delete(deleteRoom);
router.route("/dorm/:id").get(getRoomByDormId);
router.route("/student/remove/:id").put(removeStudentFromRoom);
router.route("/student/add/:id").put(addStudentToRoom);
module.exports = router;
