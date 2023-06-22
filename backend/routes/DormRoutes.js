const express = require("express");
const {
  createDorm,
  getAllDorms,
  getDormByID,
  updateDorm,
  deleteDorm
} = require("../controllers/DormController");

const router = express.Router();

router.route("/").get(getAllDorms).post(createDorm);
router.route("/:id").get(getDormByID).put(updateDorm).delete(deleteDorm);

module.exports = router;
