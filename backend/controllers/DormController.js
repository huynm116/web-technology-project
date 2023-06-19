const Dorm = require('../models/Dorm');

exports.createDorm = async (req, res) => {
  try {
    const dorm = new Dorm({
      name: req.body.name,
      dateCreated: req.body.dateCreated,
      status: req.body.status,
      action: req.body.action,
    });

    await dorm.save();

    res.status(201).json({ message: 'Dorm created successfully', dorm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllDorms = async (req, res) => {
  try {
    const dorms = await Dorm.find();
    res.json(dorms);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getDormById = async (req, res) => {
  try {
    const dorm = await Dorm.findById(req.params.id);

    if (!dorm) {
      return res.status(404).json({ message: 'Dorm not found' });
    }

    res.json(dorm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateDormById = async (req, res) => {
  try {
    const dorm = await Dorm.findById(req.params.id);

    if (!dorm) {
      return res.status(404).json({ message: 'Dorm not found' });
    }

    dorm.name = req.body.name;
    dorm.dateCreated = req.body.dateCreated;
    dorm.status = req.body.status;
    dorm.action = req.body.action;

    await dorm.save();

    res.json({ message: 'Dorm updated successfully', dorm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteDormById = async (req, res) => {
  try {
    const dorm = await Dorm.findById(req.params.id);

    if (!dorm) {
      return res.status(404).json({ message: 'Dorm not found' });
    }

    await dorm.remove();

    res.json({ message: 'Dorm deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
