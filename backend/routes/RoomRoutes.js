const express = require("express");
const {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomByDormId,
  addStudentToRoom
} = require("../controllers/RoomController");

const router = express.Router();

router.route("/").get(getAllRooms).post(createRoom);
router.route("/:id").get(getRoomById).put(addStudentToRoom).delete(deleteRoom);
router.route("/dorm/:id").get(getRoomByDormId);

module.exports = router;
