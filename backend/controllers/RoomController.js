const roomService = require("../services/RoomService");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json({ data: rooms, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);
    res.json({ data: room, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.json({ data: room, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await roomService.updateRoom(req.params.id, req.body);
    res.json({ data: room, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await roomService.deleteRoom(req.params.id);
    res.json({ data: room, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRoomByDormId = async (req, res) => {
  try {
    const room = await roomService.getRoomByDormId(req.params.id);
    res.json({ data: room, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



