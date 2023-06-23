const mongoose = require("mongoose");
const Student = require("./Student");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room_id: String,
    dorm_id: String,
    slot: Number,
    available: Number,
    price: Number,
    status: String,
    student_ids : [{
        type: String,
        ref: 'Student',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'room_list',
}
);

module.exports = mongoose.model("Room", roomSchema);