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
