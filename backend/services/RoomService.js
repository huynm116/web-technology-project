const RoomModel = require("../models/Room");

exports.getAllRooms = async () => {
  return await RoomModel.find();
};

exports.createRoom = async (room) => {
  return await RoomModel.create(room);
};
exports.getRoomById = async (id) => {
  return await RoomModel.findOne({room_id: id});
};

exports.updateRoom = async (id, room) => {
  return await RoomModel.findByIdAndUpdate(id, room);
};

exports.deleteRoom = async (id) => {
  return await RoomModel.findByIdAndDelete(id);
};

exports.getRoomByDormId = async(id) => {
  return await RoomModel.find({dorm_id: id});
}

exports.addStudentToRoom = async (room_id, student_id) => {
  return await RoomModel.updateOne({
    room_id: room_id
  }, {
    $inc: { available: -1 },
    $push: { student_ids: student_id }
  },
  { new: true })
}