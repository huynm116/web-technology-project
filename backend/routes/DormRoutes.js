const express = require("express");
const {
  createDorm,
  getAllDorms,
  getDormByID,
  updateDorm,
  deleteDorm,
  addRoomToDorm
} = require("../controllers/DormController");

const router = express.Router();

router.route("/").get(getAllDorms).post(createDorm);
router.route("/:id").get(getDormByID).delete(deleteDorm).put(addRoomToDorm);

module.exports = router;
