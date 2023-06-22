let DormModel = require("../models/Dorm");


exports.getAllDorms = async () => {
  return await DormModel.find();
};

exports.createDorm = async (dorm) => {
  return await DormModel.create(dorm);
};
exports.getDormByID = async (id) => {
  return await DormModel.findOne({dorm_id: id});
};

exports.updateDorm = async (id, dorm) => {
  return await DormModel.findByIdAndUpdate(id, dorm);
};

exports.deleteDorm = async (id) => {
  return await DormModel.findByIdAndDelete(id);
};

exports.addRoomToDorm = async (dorm_id, room_id) => {
  return await DormModel.updateOne({
    dorm_id: dorm_id
  }, {
    $inc: { avail_room: 1, number_of_room: 1 },
    $push: { room_ids: room_id }
  },
  { new: true })
}