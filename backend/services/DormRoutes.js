const Dorm = require('../models/dorm.model');

exports.createDorm = async (dormData) => {
  try {
    const dorm = new Dorm(dormData);

    await dorm.save();

    return dorm;
  } catch (error) {
    console.error(error);
    throw new Error('Server error');
  }
};

exports.getDormById = async (id) => {
  try {
    const dorm = await Dorm.findById(id).populate('rooms');

    if (!dorm) {
      throw new Error('Dorm not found');
    }

    return dorm;
  } catch (error) {
    console.error(error);
    throw new Error('Server error');
  }
};

exports.updateDormById = async (id, dormData) => {
  try {
    const dorm = await Dorm.findById(id);

    if (!dorm) {
      throw new Error('Dorm not found');
    }

    dorm.name = dormData.name || dorm.name;
    dorm.dateCreated = dormData.dateCreated || dorm.dateCreated;
    dorm.status = dormData.status || dorm.status;
    dorm.action = dormData.action || dorm.action;

    await dorm.save();

    return dorm;
  } catch (error) {
    console.error(error);
    throw new Error('Server error');
  }
};

exports.deleteDormById = async (id) => {
  try {
    const dorm = await Dorm.findById(id);

    if (!dorm) {
      throw new Error('Dorm not found');
    }

    await dorm.remove();

    return true;
  } catch (error) {
    console.error(error);
    throw new Error('Server error');
  }
};
