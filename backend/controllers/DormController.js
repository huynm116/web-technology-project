const dormService = require("../services/DormService");

exports.getAllDorms = async (req, res) => {
  try {
    const dorms = await dormService.getAllDorms();
    res.json({data: dorms, status: "success"});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDorm = async (req, res) => {
  try {
    const dorm = await dormService.createDorm(req.body);
    res.json({ data: dorm, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDormByID = async (req, res) => {
  try {
    const dorm = await dormService.getDormByID(req.params.id);
    res.json({ data: dorm, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDorm = async (req, res) => {
  try {
    const dorm = await dormService.updateDorm(req.params.id, req.body);
    res.json({ data: dorm, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDorm = async (req, res) => {
  try {
    const dorm = await dormService.deleteDorm(req.params.id);
    res.json({ data: dorm, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addRoomToDorm = async (req, res) => {
  try {
    const dorm = await dormService.addRoomToDorm(req.params.id, req.query.room_id);
    res.json({data: dorm, status: "success"});
  }catch (err){
    res.status(500).json({error: err.message});
  }
};



