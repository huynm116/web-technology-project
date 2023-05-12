const express = require("express");
const {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/RoomController");

const router = express.Router();

router.route("/").get(getAllRooms).post(createRoom);
router.route("/:id").get(getRoomById).put(updateRoom).delete(deleteRoom);
// router.route("/search/:keyword").get(searchTitle);

module.exports = router;
