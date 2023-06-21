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

// exports.searchTitle = async (keyword) => {
//   return await RoomModel.find({ title: { $regex: keyword, $options: "i" } });
// }