const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
    role: {
        type: String,
        Enumerator: ['SA', 'ADMIN', 'EDITOR' ,'GUEST'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: "Please enter your email",
    },
    password: {
        type: String,
        required: "Please enter your password",
    },
    age: {
        type: Number,
        required: true,
    },
}, {
    collection: 'account_list'
}); 
module.exports = mongoose.model('Account', AccountSchema);
